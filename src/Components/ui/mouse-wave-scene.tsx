import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import MouseWave from "@/Components/ui/mouse-wave";

interface MouseWaveSceneProps {
  imageSrc: string;
  alt?: string;
  marginFactor?: number;
}

export default function MouseWaveScene({
  imageSrc,
  alt,
  marginFactor = 1.05,
}: MouseWaveSceneProps) {
  const [isMobile, setIsMobile] = useState(false);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 800, // ← Default values instead of 0
    height: 600,
  });
  const [isReady, setIsReady] = useState(false);

  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;

    const parentWidth = containerRef.current.clientWidth;
    const isMobileDevice = window.innerWidth < 640;
    setIsMobile(isMobileDevice);

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const aspect = img.width / img.height;
      const newHeight = parentWidth / aspect;

      setDimensions({
        width: parentWidth,
        height: newHeight,
      });
      setIsReady(true);

      if (!isMobileDevice && cameraRef.current) {
        const newDistance =
          (newHeight / 2 / Math.tan((45 * Math.PI) / 360)) * marginFactor;
        cameraRef.current.position.set(0, 0, newDistance);
        cameraRef.current.updateProjectionMatrix();
      }
    };
  }, [imageSrc, marginFactor]);

  useEffect(() => {
    updateDimensions();

    const handleResize = () => {
      requestAnimationFrame(updateDimensions);
    };

    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [updateDimensions]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: dimensions.height > 0 ? dimensions.height : "auto",
        minHeight: "200px", // ← Ensure minimum height
      }}
    >
      {isMobile ? (
        <img
          src={imageSrc}
          alt={alt || "Shader preview"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        isReady &&
        dimensions.height > 0 && (
          <Canvas
            camera={{
              fov: 45,
              aspect: dimensions.width / dimensions.height,
              near: 0.1,
              far: 1000,
              position: [
                0,
                0,
                dimensions.height / 2 / Math.tan((45 * Math.PI) / 360),
              ],
            }}
            onCreated={({ camera }) => {
              cameraRef.current = camera as THREE.PerspectiveCamera;
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <MouseWave
              imageSrc={imageSrc}
              canvasWidth={dimensions.width}
              canvasHeight={dimensions.height}
            />
          </Canvas>
        )
      )}
    </div>
  );
}
