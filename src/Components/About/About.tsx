import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { aboutContent } from "@/lib/content";
import Carousel from "./Carousel";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  // intersection observer as fallback for scroll-trigger
  useEffect(() => {
    if (!container.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const chars = container.current?.querySelectorAll(".about-heading-char");
      const paraLines = container.current?.querySelectorAll(".about-para-line");
      const arrow = container.current?.querySelector(".about-arrow");
      const image = container.current?.querySelector(".about-image-animation");
      const allTargets = [
        ...(chars ? Array.from(chars) : []),
        ...(paraLines ? Array.from(paraLines) : []),
        ...(arrow ? [arrow] : []),
        ...(image ? [image] : []),
      ];

      // elements start visible via css, gsap hides them for animation
      gsap.set(allTargets, { opacity: 0 });

      if (chars && chars.length > 0) {
        gsap.set(chars, { y: 40 });
      }
      if (paraLines && paraLines.length > 0) {
        gsap.set(paraLines, { y: 20 });
      }
      if (arrow) gsap.set(arrow, { x: -20 });
      if (image) gsap.set(image, { x: 10 });

      // plays the reveal animation
      const playReveal = () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        if (chars && chars.length > 0) {
          tl.to(chars, {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 0.8,
          });
        }

        if (paraLines && paraLines.length > 0) {
          tl.to(
            paraLines,
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.6,
            },
            "-=0.4",
          );
        }

        if (arrow) {
          tl.to(
            arrow,
            { x: 0, opacity: 1, duration: 0.4, ease: "bounce.out" },
            "-=0.3",
          );
        }

        if (image) {
          tl.to(image, { x: 0, opacity: 1, duration: 0.8 }, "-=0.3");
        }
      };

      // primary trigger via scroll
      ScrollTrigger.create({
        trigger: container.current,
        start: "top 80%",
        once: true,
        onEnter: playReveal,
      });

      // secondary trigger on scroll-back
      ScrollTrigger.create({
        trigger: container.current,
        start: "bottom bottom",
        once: true,
        onEnterBack: playReveal,
      });
    },
    { scope: container },
  );

  // fallback: if intersection observer detected visibility and gsap hasn't fired
  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;

    // give scrolltrigger a moment to catch up
    const fallbackTimer = setTimeout(() => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const el = container.current;
      if (!el) return;

      const targets = el.querySelectorAll(
        ".about-heading-char, .about-para-line, .about-arrow, .about-image-animation, .about-button-animation",
      );

      gsap.to(targets, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "power2.out",
      });
    }, 500);

    return () => clearTimeout(fallbackTimer);
  }, [isVisible]);

  // l-shape clip path used only on desktop
  const shapePath = [
    "M 0.05,0",
    "L 0.95,0",
    "Q 1,0 1,0.05",
    "L 1,0.95",
    "Q 1,1 0.95,1",
    "L 0.35,1",
    "C 0.29,1 0.28,0.97 0.28,0.90",
    "L 0.28,0.78",
    "C 0.28,0.72 0.24,0.70 0.18,0.70",
    "L 0.05,0.70",
    "Q 0,0.70 0,0.65",
    "L 0,0.05",
    "Q 0,0 0.05,0",
    "Z",
  ].join(" ");

  return (
    <div
      ref={container}
      className="bg-[#211E1B] min-h-[90vh] lg:h-dvh lg:max-h-screen flex flex-col overflow-x-hidden text-white"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 flex-1 flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-12 py-8 sm:py-10 lg:py-0">
        <div className="flex-1 flex flex-col justify-center w-full">
          <div className="flex items-center gap-3 mb-3 sm:mb-4"></div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-white mt-1 sm:mt-2 leading-tight tracking-widest overflow-hidden">
            <span className="block overflow-hidden">
              {aboutContent.headingLine1.split("").map((char, i) => (
                <span
                  key={`l1-${i}`}
                  className="about-heading-char inline-block font-bold"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {aboutContent.headingLine2.split("").map((char, i) => (
                <span
                  key={`l2-${i}`}
                  className="about-heading-char inline-block font-bold text-primary"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h2>

          <div className="flex items-center gap-3 mt-2 sm:mt-3 mb-1">
            <span className="about-arrow text-primary text-2xl sm:text-3xl md:text-5xl font-serif font-bold">
              {">>>>>>"}
            </span>
          </div>

          <div className="mt-2 sm:mt-4 lg:mt-7 mb-4 sm:mb-6 lg:mb-10 lg:max-w-2xl">
            <p className="about-para-line text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-white leading-relaxed sm:leading-relaxed lg:leading-11 tracking-wide lg:tracking-wider">
              {aboutContent.paragraph}
            </p>
          </div>
        </div>

        {/* carousel — rectangular full-width on mobile, L-shape clip on desktop */}
        <div className="about-image-animation flex-1 w-full lg:max-w-lg flex flex-col items-start min-h-0">
          {/* mobile: rectangular full-width carousel */}
          <div className="block lg:hidden w-full">
            <div className="w-full aspect-video rounded-xl overflow-hidden">
              <Carousel />
            </div>
          </div>

          {/* desktop: L-shape clipped carousel */}
          <div className="hidden lg:block relative w-full aspect-4/5 mx-auto lg:mx-0">
            <svg width="0" height="0" className="absolute" aria-hidden="true">
              <defs>
                <clipPath id="aboutLShape" clipPathUnits="objectBoundingBox">
                  <path d={shapePath} />
                </clipPath>
              </defs>
            </svg>
            <div
              className="w-full h-full overflow-hidden"
              style={{
                clipPath: "url(#aboutLShape)",
                WebkitClipPath: "url(#aboutLShape)",
              }}
            >
              <Carousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
