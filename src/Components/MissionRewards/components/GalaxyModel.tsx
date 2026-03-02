import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import { useRef, useEffect, useState, useCallback } from "react";
import { Group } from "three";

const scrollState = { velocity: 0 };

function Model() {
  const { scene } = useGLTF("/models/milky_way_galaxy.glb");
  const modelRef = useRef<Group | null>(null);

  useEffect(() => {
    let lastScroll = window.scrollY;
    let lastTime = performance.now();
    let rafId: number;

    const trackVelocity = () => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      const currentScroll = window.scrollY;
      if (dt > 0) {
        scrollState.velocity = Math.abs((currentScroll - lastScroll) / dt);
      }
      lastScroll = currentScroll;
      lastTime = now;
      rafId = requestAnimationFrame(trackVelocity);
    };
    rafId = requestAnimationFrame(trackVelocity);

    return () => cancelAnimationFrame(rafId);
  }, []);

  useFrame((_state, delta) => {
    if (modelRef.current) {
      const baseSpin = delta * 0.15;
      const velocityBoost = delta * Math.min(scrollState.velocity / 300, 3);
      modelRef.current.rotation.y += baseSpin + velocityBoost;
    }
  });

  return (
    <Center ref={modelRef}>
      <primitive object={scene} scale={1.5} />
    </Center>
  );
}

const GalaxyModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // reconnects the observer so rootMargin recalculates after layout shifts
  const connectObserver = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "300px" },
    );
    observerRef.current.observe(el);
  }, []);

  useEffect(() => {
    connectObserver();

    let refreshTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => {
        connectObserver();
      }, 500);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [connectObserver]);

  return (
    <div
      ref={containerRef}
      className="h-full absolute inset-0 pointer-events-none"
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 1, 3] }}
          dpr={[1, 1.5]}
          frameloop="always"
          style={{ pointerEvents: "none" }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} />
          <Model />
        </Canvas>
      )}
    </div>
  );
};

export default GalaxyModel;
