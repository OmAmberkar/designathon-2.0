import { useEffect, useRef, memo, createContext, useContext, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

const LenisProvider = memo(function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("lenis");

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      document.documentElement.classList.remove("lenis");
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <main className="bg-background relative z-10 min-h-screen">
        {children}
      </main>
    </LenisContext.Provider>
  );
});

export default LenisProvider;
