import MouseWaveScene from "../ui/mouse-wave-scene";
import ArrowsBar from "./components/ArrowsBar";
import CpuStats from "./components/CpuStats";
import RegisterRing from "./components/RegisterRing";
import OptimizedImage from "@/Components/OptimizedImage";
import { assets } from "@/lib/assets";

const MissionLogs = () => {
  return (
    <main className="h-dvh max-h-screen w-full bg-[#141414] text-foreground overflow-hidden relative font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <h1 className="absolute top-4 lg:top-8 left-1/2 -translate-x-1/2 z-30 text-4xl sm:text-5xl lg:text-7xl xl:text-8xl leading-none text-accent font-share-tech uppercase tracking-tighter drop-shadow-2xl text-center whitespace-nowrap">
        MISSION <span className="text-white">LOGS</span>
      </h1>

      {/* galaxy underlay */}
      <div className="absolute top-1/2 mt-12 md:mt-0 left-1/2 -translate-x-1/2 -translate-y-[55%] z-[4] opacity-40 mix-blend-screen pointer-events-none">
        <OptimizedImage
          src={assets.missionLogs.milkyway}
          alt="Galaxy"
          eager
          className="w-[40vw] md:w-[30vw] max-w-[400px] object-contain"
        />
      </div>

      <ArrowsBar />

      <div className="relative z-10 w-full h-full flex flex-col justify-between lg:grid lg:grid-cols-[minmax(200px,18vw)_1fr_minmax(200px,18vw)] overflow-hidden pb-12 lg:pb-0">
        {/* left column (desktop) / top section (mobile) */}
        <div className="flex flex-col p-3 lg:p-5 pt-20 lg:pt-8 gap-3 z-20 pointer-events-none lg:pointer-events-auto min-h-0 flex-shrink">
          <div className="flex justify-between items-start pointer-events-auto gap-3">
            <div className="flex flex-col gap-3 w-[65%] lg:w-full">
              {/* about theme card */}
              <div className="w-full filter drop-shadow-[0_10px_20px_rgba(242,124,6,0.15)] z-20">
                <div
                  className="bg-primary px-3 lg:px-6 min-h-20 lg:min-h-36 w-full lg:w-88 flex flex-col py-2 lg:py-5 gap-1 lg:gap-3 h-full"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 65% 0%, 75% 25%, 100% 25%, 100% 100%, 0% 100%)",
                    borderRadius: "0 0 1rem 1rem",
                  }}
                >
                  <h2 className="text-lg lg:text-3xl font-bold leading-none uppercase font-share-tech text-[#141414]">
                    About theme
                  </h2>
                  <p className="text-[10px] lg:text-sm font-inter leading-tight font-medium text-orange-200">
                    Spacebound symbolizes ambition without limits. Your space
                    crew is sent to explore and push beyond the limits of
                    design.
                  </p>
                </div>
              </div>

              {/* description box (mobile) */}
              <div className="z-20 lg:hidden mt-1 pointer-events-auto">
                <div className="bg-foreground text-orange-950 p-2.5 pt-2.5 pb-3 rounded-lg rounded-tr-none border border-white/10 shadow-2xl relative w-full flex flex-col justify-center">
                  <p className="text-[9px] sm:text-[11px] md:text-sm font-medium leading-relaxed font-inter">
                    <strong className="text-accent block mb-0.5">
                      Designathon 2.0: Spacebound
                    </strong>
                    is a creative sprint where imagination meets innovation.
                    Over an intense period, participants collaborate to design,
                    prototype, and present solutions that push boundaries.
                  </p>
                </div>

                <div className="text-accent font-mono text-[9px] flex items-center gap-1 whitespace-nowrap mt-0.5">
                  <span className="w-1.5 h-1.5 bg-accent inline-block rounded-sm" />{" "}
                  151.46M km
                </div>
              </div>
            </div>

            {/* drill video (mobile) */}
            <div className="w-[30%] max-w-[120px] aspect-[1/2] lg:hidden border border-primary/30 rounded-lg overflow-hidden backdrop-blur-sm z-20 flex-shrink-0 relative pointer-events-auto bg-black">
              <video
                src={assets.missionLogs.drill}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-90"
                onError={(e) => {
                  const vid = e.currentTarget;
                  setTimeout(() => vid.load(), 2000);
                }}
              />
            </div>
          </div>

          <div className="flex justify-between items-start pointer-events-auto mt-0 relative">
            <div className="flex flex-col gap-2">
              <div className="text-accent font-mono text-[10px] lg:text-xs tracking-[0.2em] flex items-center gap-2 z-20">
                XDMGR-231-1 <span className="w-2 h-2 border border-accent" />
              </div>
            </div>
          </div>

          {/* sponge card (desktop) */}
          <div className="hidden lg:flex items-start gap-4">
            <div className="w-48 lg:w-56 xl:w-64 aspect-square border border-primary/30 rounded-lg overflow-hidden relative bg-black/20 backdrop-blur-sm">
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-primary/60 z-10" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-primary/60 z-10" />
              <video
                src={assets.missionLogs.sponge}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 hidden lg:block" />

          {/* description box (desktop) */}
          <div className="hidden lg:block w-full lg:w-[calc(100%+22rem)] relative mt-4 lg:mt-0 pointer-events-auto">
            <div className="bg-foreground text-orange-950 p-4 lg:p-5 rounded-lg rounded-tr-none border border-white/10 shadow-2xl relative">
              <p className="text-xs lg:text-sm font-medium leading-relaxed font-inter">
                <strong className="text-accent">
                  Designathon 2.0: Spacebound
                </strong>{" "}
                is a creative sprint where imagination meets innovation. Over an
                intense period, participants collaborate to design, prototype,
                and present solutions that push boundaries, whether in
                technology, storytelling, or visual design. It's not just about
                building, it's about exploring new frontiers of creativity.
              </p>
            </div>
          </div>
        </div>

        {/* center mesh */}
        <div className="absolute inset-0 lg:static flex flex-col items-center justify-center w-full z-[5] pointer-events-none overflow-hidden">
          <div className="w-[90vw] mt-10 md:mt-0 sm:w-[75vw] lg:w-[40vw] max-w-[650px] perspective-[1000px] absolute top-[50%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto animate-pulse lg:animate-none">
            <div className="w-full h-full transform-style-3d rotate-x-[15deg]">
              <MouseWaveScene imageSrc={assets.missionLogs.mesh} />
            </div>
          </div>
        </div>

        {/* right column (desktop) / bottom section (mobile) */}
        <div className="flex flex-col p-3 px-5 lg:p-5 lg:pt-8 gap-3 lg:gap-3 z-20 pointer-events-none lg:pointer-events-auto mb-[60px] lg:mb-0 relative min-h-[140px] flex-shrink">
          <div className="flex justify-between items-end gap-2 pointer-events-auto lg:hidden h-full pb-3">
            {/* sponge card (mobile) */}
            <div className="w-[45%] z-20 h-full flex items-end relative top-12">
              <div className="w-full aspect-square max-h-[30vh] border border-primary/30 rounded-lg overflow-hidden relative bg-black/20 backdrop-blur-sm">
                <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-primary/60 z-10" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-primary/60 z-10" />
                <video
                  src={assets.missionLogs.sponge}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* cpu stats (mobile) */}
            <div className="flex flex-col items-end gap-2 w-[45%] z-20 h-full justify-between">
              <div className="scale-[0.5] sm:scale-[0.6] origin-top-right w-[280px]">
                <CpuStats />
              </div>
            </div>
          </div>

          {/* drill video (desktop) */}
          <div className="hidden w-full h-48 lg:block lg:relative lg:w-full lg:h-64 xl:h-72 border border-primary/30 rounded-lg overflow-hidden backdrop-blur-sm pointer-events-auto z-20 bg-black">
            <video
              src={assets.missionLogs.drill}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-90"
              onError={(e) => {
                const vid = e.currentTarget;
                setTimeout(() => vid.load(), 2000);
              }}
            />
          </div>

          <div className="hidden lg:flex text-accent font-mono text-[10px] lg:text-xs items-center gap-2 lg:mt-3">
            <span className="w-1.5 h-1.5 bg-accent inline-block" /> 151.46
            million kilometer
          </div>

          {/* cpu stats (desktop) */}
          <div className="hidden lg:block relative lg:absolute lg:bottom-28 lg:right-72 lg:mt-0 w-full max-w-xs pointer-events-auto">
            <CpuStats />
          </div>

          <div className="flex-1 hidden lg:block" />

          {/* register globe (desktop) */}
          <div className="hidden lg:block lg:relative lg:mt-0 z-50 pointer-events-auto">
            <RegisterRing />
          </div>
        </div>
      </div>

      {/* register ring (mobile) */}
      <div className="absolute bottom-[30px] right-3 z-[60] w-[140px] h-[140px] lg:hidden pointer-events-auto">
        <RegisterRing />
      </div>
    </main>
  );
};

export default MissionLogs;
