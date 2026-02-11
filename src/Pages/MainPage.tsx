import { useEffect } from "react";
import About from "@/Components/About/About";
import Faqs from "@/Components/FAQs/Faqs";
import HeroSection from "@/Components/HeroSection/HeroSection";
import MissionGuidelines from "@/Components/MissionGuidelines/MissionGuidelines";
import MissionLogs from "@/Components/MissionLogs/MissionLogs";
import MissionRewards from "@/Components/MissionRewards/MissionRewards";
import Sponsors from "@/Components/Sponsors/Sponsors";
import TimeLine from "@/Components/TimeLine/TimeLine";
import { useLenis } from "@/lib/Lenis";

const MainPage = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    let isScrolling = false;

    const handleScroll = ({ scroll, velocity }: { scroll: number; velocity: number }) => {
      // Prevent multiple triggers
      if (isScrolling) return;

      const heroHeight = window.innerHeight;
      const threshold = 50; // Sensitivity threshold in pixels

      // Debugging: Log scroll position
      // console.log("Scroll:", scroll, "Velocity:", velocity);

      // Hero -> Mission Logs (Scroll Down)
      // Trigger if user is at the top (Hero) and starts scrolling down
      if (scroll < heroHeight - threshold && velocity > 1.5) { 
        // velocity > 1.5 ensures a deliberate scroll, not just a tiny nudge
        isScrolling = true;
        lenis.scrollTo("#mission-logs", {
           duration: 1.5,
           lock: true, // Lock user input during scroll for smoothness
           onComplete: () => {
             isScrolling = false;
           }
        });
      }
      
      // Mission Logs -> Hero (Scroll Up)
      // Trigger if user is near the start of Mission Logs and scrolls up
      // mission-logs starts at heroHeight approximately
      else if (scroll >= heroHeight - threshold && scroll <= heroHeight + threshold && velocity < -1.5) {
         isScrolling = true;
         lenis.scrollTo("#home", {
            duration: 1.5,
            lock: true,
            onComplete: () => {
              isScrolling = false;
            }
         });
      }
    };

    // Lenis emits 'scroll' event
    // @ts-ignore - lenis types might be slightly off depending on version
    lenis.on('scroll', handleScroll);

    return () => {
      // @ts-ignore
      lenis.off('scroll', handleScroll);
    };
  }, [lenis]);
  return (
    <>
      <div id="home">
        <HeroSection />
      </div>
      <div id="mission-logs">
        <MissionLogs />
      </div>
      <div id="rewards">
        <MissionRewards />
      </div>
      <div id="timeline">
        <TimeLine />
      </div>
      <div id="guidelines">
        <MissionGuidelines />
      </div>
      <div id="sponsors">
        <Sponsors />
      </div>
      <div id="faqs">
        <Faqs />
      </div>
      <div id="about">
        <About />
      </div>
    </>
  );
};

export default MainPage;
