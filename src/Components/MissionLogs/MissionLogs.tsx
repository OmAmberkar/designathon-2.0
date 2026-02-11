import { Suspense, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import MouseWaveScene from "../ui/mouse-wave-scene";

const ASSETS = {
  drill: "/images/mission_logs/drill.svg",
  globe: "/images/mission_logs/globe.svg",
  mesh: "/images/mission_logs/mesh.svg",
  milkyway: "/images/mission_logs/milkyway.png",
  rightArrowFilled: "/images/mission_logs/rightArrow_filled.svg",
  rightArrowOutline: "/images/mission_logs/rightArrow_outline.svg",
  sponge: "/images/mission_logs/sponge.svg",
  bottomGlobe: "/images/mission_logs/bottom_right_globe.png",
};

const RotatingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <Sphere args={[1, 16, 16]} ref={meshRef} scale={2}>
      <meshBasicMaterial wireframe color="white" transparent opacity={0.3} />
    </Sphere>
  );
};

const MissionLogs = () => {
  return (
    <main className="h-screen w-full bg-background text-foreground overflow-hidden relative font-sans selection:bg-primary/30 flex flex-col justify-center items-center">
      {/* bg Grid  */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 w-full h-full max-h-[100vh] p-[2vh] lg:p-[4vh] grid grid-cols-12 grid-rows-[auto_1fr_auto] gap-[2vh]">
        <header className="col-span-12 flex justify-center items-start pt-2">
          <h1 className="text-[10vh] leading-none   text-accent uppercase ">
            Mission <span className="font-light text-foreground/80">Logs</span>
          </h1>
        </header>

        {/* --- LEFT COLUMN --- */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-[2vh] h-full justify-between lg:pr-4 min-h-0">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-primary text-background p-[3vh] rounded-[2rem] rounded-br-none relative shadow-[0_0_30px_rgba(242,124,6,0.2)] group hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-center min-h-[25vh]"
          >
            <h2 className="text-[4vh] font-bold leading-none mb-[1vh] uppercase">
              Bla bla bla
              <br />
            </h2>
            <p className="text-[2vh] leading-tight font-medium opacity-90">
              Spacebound symbolizes ambition without limits. Your space crew is
              sent to explore the and push beyond the limits of design
            </p>
          </motion.div>

          {/* Sponge Card - Organic Flapping */}
          <div className="border border-primary/50 rounded-2xl p-[3vh] flex items-center justify-center relative bg-black/20 backdrop-blur-sm overflow-hidden flex-1 min-h-[20vh]">
            <div className="absolute top-2 left-2 w-2 h-2 border border-primary/50" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border border-primary/50" />

            <motion.img
              src={ASSETS.sponge}
              alt="Sponge Structure"
              className="w-full h-auto max-h-[20vh] object-contain drop-shadow-[0_0_20px_rgba(242,124,6,0.3)]"
              animate={{
                scaleY: [1, 0.9, 1.1, 0.95, 1],
                scaleX: [1, 1.1, 0.9, 1.05, 1],
                rotate: [0, -2, 2, -1, 0],
                filter: [
                  "brightness(1)",
                  "brightness(1.1)",
                  "brightness(0.9)",
                  "brightness(1)",
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            />
          </div>

          {/* Title Info Card */}
          <div className="bg-foreground text-background p-[2vh] rounded-2xl relative flex items-stretch gap-3 mt-auto min-h-[15vh]"></div>
        </div>

        {/* --- CENTER COLUMN (HERO) --- */}
        <div className="col-span-12 lg:col-span-6 flex flex-col relative h-full min-h-0 p-5">
          {/* Center Hero Space */}
          <div className="flex-1 flex flex-col items-center justify-center relative">
            {/* Milkyway Galaxy */}
            <div className="absolute top-[15%] w-[50vh] aspect-square opacity-80 mix-blend-screen">
              <img
                style={{ zIndex: 999 }}
                src={ASSETS.milkyway}
                alt="Galaxy"
                className="w-full h-full object-contain pb-4 z-99"
              />
            </div>

            {/* Mesh Grid - Ripple Effect */}
            <motion.div
              className="relative z-0 w-full max-w-[96vh] mt-[10vh] perspective-[800px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Primary Mesh */}
              <motion.div
                className="w-full h-auto drop-shadow-[0_0_40px_rgba(242,124,6,0.3)] origin-bottom pb-2"
                animate={{
                  scaleY: [1, 0.99, 1.01, 1],
                  rotateX: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <MouseWaveScene imageSrc={ASSETS.mesh} />
              </motion.div>

              {/* Ghost Ripple Mesh */}
              <motion.img
                src={ASSETS.mesh}
                className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay blur-sm  pointer-events-none"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
              />

              {/* Identifier */}
              <motion.div
                className="absolute bottom-[20%] left-0 text-primary font-mono text-[2vh] tracking-widest flex items-center gap-2"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                XDMGR-231-1{" "}
                <span className="inline-block w-[1.5vh] h-[1.5vh] border border-primary bg-primary/20" />
              </motion.div>
            </motion.div>
          </div>

          {/*TODO arrows*/}
          {/*<div className="mb-[2vh] w-full max-w-[50vh] self-center border-y border-white/10 py-[1.5vh] bg-black/40 backdrop-blur-md flex items-center justify-between gap-4 px-6 rounded-full">
            <div className="flex gap-2 overflow-hidden flex-1 justify-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              {[...Array(12)].map((_, i) => (
                <motion.img
                  key={i}
                  src={
                    i % 2 === 0
                      ? ASSETS.rightArrowOutline
                      : ASSETS.rightArrowFilled
                  }
                  className="h-[3vh] w-auto opacity-70"
                  animate={{ x: ["-100%", "0%"] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
            <div className="h-[5vh] w-[5vh] border border-primary/50 rounded-full p-1 animate-pulse">
              <img
                src={ASSETS.bottomGlobe}
                className="w-full h-full opacity-80"
                alt="Icon"
              />
            </div>
          </div>*/}
        </div>

        <div className="col-span-12 lg:col-span-3 flex flex-col gap-[2vh] h-full lg:pl-4 min-h-0">
          {/* Drill Card - CSS Mask Animation */}
          <div className="border border-white/20 rounded-2xl p-[3vh] flex-1 min-h-[30vh] flex items-center justify-center relative overflow-hidden bg-black/20 group">
            <div className="absolute top-0 right-0 w-[4vh] h-[4vh] border-t-2 border-r-2 border-primary rounded-tr-xl opacity-80" />
            <div className="absolute bottom-0 left-0 w-[4vh] h-[4vh] border-b-2 border-l-2 border-white/30 rounded-bl-xl opacity-60" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,124,6,0.1),transparent_70%)]" />

            {/* Drill Container */}
            <div className="relative w-full h-[80%] flex items-center justify-center">
              <img
                src={ASSETS.drill}
                className="h-full w-auto object-contain opacity-20 absolute"
              />

              {/* drilling Mask animation */}
              <motion.div
                className="h-full w-full absolute inset-0"
                style={{
                  WebkitMaskImage: `url(${ASSETS.drill})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: `url(${ASSETS.drill})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  background:
                    "linear-gradient(45deg, transparent 40%, rgba(242,124,6,0.8) 50%, transparent 60%)",
                  backgroundSize: "200% 200%",
                }}
                animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          <div className="flex flex-col mt-auto gap-[2vh]">
            <div className="text-primary font-mono text-right text-[1.5vh] flex items-center justify-end gap-2">
              <span className="w-2 h-2 bg-primary animate-pulse" />
              151.46 million kilometer
            </div>

            {/* Stats Panel */}
            <div className="bg-black/40 border-t border-white/10 p-[2vh] font-mono text-[1.2vh] text-white/70 space-y-[1.5vh]">
              {/* CPU Loader */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>CPU usage: 18%</span>
                  <span>Running: 0</span>
                </div>
                <div className="h-1 bg-white/10 w-full relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-primary h-full"
                    animate={{
                      left: ["0%", "80%", "0%"],
                      width: ["10%", "30%", "10%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div>File systems: / 30GB</div>
                <motion.div className="h-1 bg-white/10 w-full relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-white h-full w-1/2"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </div>
              <div className="classname">blabla</div>
              <div className="classname">blabla</div>
              <div className="classname">blabla</div>
            </div>

            <div className="relative w-[18vh] h-[18vh] self-end translate-x-2 translate-y-2">
              {/* register ring */}
              <motion.div
                className="absolute  inset-0 flex items-center justify-center z-10 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full overflow-visible"
                >
                  <defs>
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text
                    fontSize="11"
                    fill="white"
                    letterSpacing="0.2em"
                    fontWeight="bold"
                  >
                    <textPath href="#circlePath" startOffset="0%">
                      REGISTER NOW - REGISTER NOW - REGISTER NOW -
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* 3D Canvas */}
              <div className="absolute inset-[15%] rounded-full overflow-hidden">
                <Canvas
                  camera={{ position: [0, 0, 4] }}
                  gl={{ alpha: true }}
                  style={{ background: "transparent" }}
                >
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Suspense fallback={null}>
                    <RotatingSphere />
                  </Suspense>
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MissionLogs;
