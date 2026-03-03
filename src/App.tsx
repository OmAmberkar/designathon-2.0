import {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import HeroSection from "@/Components/HeroSection/HeroSection";
import MissionLogs from "@/Components/MissionLogs/MissionLogs";
import { useLenis } from "@/lib/Lenis";
import Footer from "@/Components/Footer";
import { InfiniteRibbon } from "@/Components/ui/infinite-ribbon";
import Preloader from "@/Components/Preloader";
import { criticalAssets, deferredAssets } from "@/lib/assets";
import { ScrollEngine } from "@/lib/scroll-engine";
import ScrollEngineContext from "@/lib/scroll-engine-context";
import { ribbonContent } from "@/lib/content";
import NavigationMenu from "@/Components/navigationMenu";
import AstronautCursor from "@/Components/AstronautCursor";

const MissionRewards = lazy(
  () => import("@/Components/MissionRewards/MissionRewards"),
);
const TimeLine = lazy(() => import("@/Components/TimeLine/TimeLine"));
const MissionGuidelines = lazy(
  () => import("@/Components/MissionGuidelines/MissionGuidelines"),
);
const Faqs = lazy(() => import("@/Components/FAQs/Faqs"));
const About = lazy(() => import("@/Components/About/About"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const [engine, setEngine] = useState<ScrollEngine | null>(null);
  const lenis = useLenis();
  const engineRef = useRef<ScrollEngine | null>(null);

  useLayoutEffect(() => {
    if (isLoading) return;
    gsap.registerPlugin(ScrollTrigger);

    const missionLogs = document.querySelector(".mission-logs-sticky");
    const rewards = document.getElementById("rewards");
    if (!missionLogs || !rewards) return;

    const ctx = gsap.context(() => {
      gsap.to(missionLogs, {
        scale: 0.92,
        opacity: 0.4,
        filter: "blur(1px)",
        force3D: true,
        scrollTrigger: {
          trigger: rewards,
          start: "top 90%",
          end: "top 25%",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [isLoading]);

  useEffect(() => {
    if (!lenis || isLoading) return;

    const inst = new ScrollEngine(lenis, {
      onFooterVisibilityChange: setFooterVisible,
    });
    inst.attach();
    engineRef.current = inst;
    setEngine(inst);

    return () => {
      inst.detach();
      engineRef.current = null;
      setEngine(null);
    };
  }, [lenis, isLoading]);

  return (
    <ScrollEngineContext.Provider value={engine}>
      <Preloader
        critical={criticalAssets}
        deferred={deferredAssets}
        onComplete={() => setIsLoading(false)}
      />

      <NavigationMenu />
      <AstronautCursor />

      <div className="overflow-x-hidden relative z-10">
        <div id="home" className="bg-background">
          <HeroSection />
        </div>

        <div className="relative" id="mission-logs-wrapper">
          <div
            id="mission-logs"
            className="sticky top-0 z-10 mission-logs-sticky"
            style={{ willChange: "transform, opacity, filter" }}
          >
            <MissionLogs />
          </div>
          <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <div id="rewards" className="relative z-20">
              <MissionRewards />
            </div>
          </Suspense>
        </div>

        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <div id="timeline" className="relative z-20">
            <TimeLine />
          </div>
        </Suspense>

        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <div id="guidelines" className="relative z-20">
            <MissionGuidelines />
          </div>
          <div id="faqs" className="relative z-20">
            <Faqs />
          </div>
          <div id="about" className="relative z-20 bg-background">
            <About />
          </div>
        </Suspense>

        <div
          id="ribbon-section"
          className="relative z-20 overflow-hidden py-6 sm:py-10 bg-background"
        >
          <InfiniteRibbon
            rotation={3}
            duration={15}
            className="absolute bg-primary/90 py-2 text-xl font-bold font-share-tech tracking-widest text-[#141414] uppercase"
          >
            {ribbonContent.line1}
          </InfiniteRibbon>
          <InfiniteRibbon
            reverse
            rotation={-3}
            duration={18}
            className="bg-background border border-primary/30 py-2 text-xl font-bold font-share-tech tracking-widest text-primary uppercase"
          >
            {ribbonContent.line2}
          </InfiniteRibbon>
        </div>
      </div>

      <div
        className="sticky bottom-0 z-0 transition-opacity duration-300"
        style={{
          opacity: footerVisible ? 1 : 0,
          pointerEvents: footerVisible ? "auto" : "none",
        }}
      >
        <Footer />
      </div>
    </ScrollEngineContext.Provider>
  );
}

export default App;
