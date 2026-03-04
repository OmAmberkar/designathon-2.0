import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { assets } from "@/lib/assets";
import OrangeRect from "./OrangeRect";
import type { OrangeRectHandle } from "@/lib/types";

interface TimelineEvent {
  id: number;
  date: string;
  dateSuffix?: string;
  dateSuffixOrdinal?: string;
  ordinal: string;
  month: string;
  title: string;
  titleLine2?: string;
  galaxyImg: string;
  galaxyDetails: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "15",
    ordinal: "th",
    month: "FEBRUARY",
    title: "REGISTRATION",
    titleLine2: "OPENS",
    galaxyImg: assets.timeline.galaxy1,
    galaxyDetails: assets.timeline.galaxy1Details,
  },
  {
    id: 2,
    date: "12",
    ordinal: "th",
    month: "MARCH",
    title: "REGISTRATION",
    titleLine2: "CLOSES",
    galaxyImg: assets.timeline.galaxy2,
    galaxyDetails: assets.timeline.galaxy2Details,
  },
  {
    id: 3,
    date: "14",
    ordinal: "th",
    month: "MARCH",
    title: "MISSION REVEAL",
    galaxyImg: assets.timeline.galaxy3,
    galaxyDetails: assets.timeline.galaxy3Details,
  },
  {
    id: 4,
    date: "16",
    dateSuffix: "-17",
    dateSuffixOrdinal: "th",
    ordinal: "th",
    month: "MARCH",
    title: "ROUND ONE",
    titleLine2: "[online]",
    galaxyImg: assets.timeline.galaxy4,
    galaxyDetails: assets.timeline.galaxy4Details,
  },
  {
    id: 5,
    date: "20",
    ordinal: "th",
    month: "MARCH",
    title: "FINALISTS",
    titleLine2: "ANNOUNCED",
    galaxyImg: assets.timeline.galaxy5,
    galaxyDetails: assets.timeline.galaxy5Details,
  },
  {
    id: 6,
    date: "23",
    ordinal: "rd",
    month: "MARCH",
    title: "GRAND FINALE",
    titleLine2: "[offline]",
    galaxyImg: assets.timeline.galaxy6,
    galaxyDetails: assets.timeline.galaxy6Details,
  },
];

const MobileTimelineCard = ({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineSegmentRef = useRef<HTMLDivElement>(null);
  const orangeRef1 = useRef<OrangeRectHandle>(null);
  const orangeRef2 = useRef<OrangeRectHandle>(null);

  useGSAP(() => {
    if (!cardRef.current || !contentRef.current) return;

    const dateEls = contentRef.current.querySelectorAll(".mob-tl-date");
    const titleEl = contentRef.current.querySelector(".mob-tl-title");
    const galaxyEl = contentRef.current.querySelector(".mob-tl-galaxy");
    const statsEls = contentRef.current.querySelectorAll(".mob-tl-stats");
    const detailsEl = contentRef.current.querySelector(".mob-tl-details");

    // animated line segment
    if (lineSegmentRef.current) {
      gsap.set(lineSegmentRef.current, { scaleY: 0, transformOrigin: "top" });
      gsap.to(lineSegmentRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "bottom 50%",
          scrub: 0.5,
        },
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 78%",
        end: "top 35%",
        scrub: 1,
      },
    });

    // date reveals
    if (dateEls.length > 0) {
      gsap.set(dateEls, { opacity: 0, y: 30 });
      tl.to(
        dateEls,
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
        0,
      );
    }

    // galaxy image
    if (galaxyEl) {
      gsap.set(galaxyEl, { opacity: 0, scale: 0.8, rotate: -5 });
      tl.to(
        galaxyEl,
        { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: "power2.out" },
        0.15,
      );
    }

    // stats
    if (statsEls.length > 0) {
      gsap.set(statsEls, { opacity: 0 });
      tl.to(
        statsEls,
        { opacity: 0.6, duration: 0.5, stagger: 0.08, ease: "power1.out" },
        0.4,
      );
    }

    // details overlay image
    if (detailsEl) {
      gsap.set(detailsEl, { opacity: 0 });
      tl.to(
        detailsEl,
        { opacity: 0.5, duration: 0.6, ease: "power1.out" },
        0.3,
      );
    }

    // title reveal with clip
    if (titleEl) {
      gsap.set(titleEl, {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      });
      tl.to(
        titleEl,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1,
          ease: "power2.inOut",
        },
        0.3,
      );
    }

    // orange rects
    if (orangeRef1.current) {
      tl.add(orangeRef1.current.animate(), 0.2);
    }
    if (orangeRef2.current) {
      tl.add(orangeRef2.current.animate(), 0.35);
    }
  });

  return (
    <div ref={cardRef} className="relative flex w-full min-h-[420px]">
      {/* left rail*/}
    
      <div className="relative flex flex-col items-center w-12 sm:w-16 shrink-0">
        <div
          ref={lineSegmentRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full"
          style={{
            background:
              "linear-gradient(to bottom, rgba(242,124,6,0.1), rgba(242,124,6,0.6) 20%, rgba(242,124,6,0.6) 80%, rgba(242,124,6,0.1))",
          }}
        />

        {/* glowing dot*/}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full z-10"
          style={{
            background: "#F27C06",
            boxShadow: "0 0 8px 2px rgba(242,124,6,0.5)",
          }}
        />
      </div>

      {/* right content area */}
      <div ref={contentRef} className="flex-1 pl-4 sm:pl-6 pb-8 pt-2 relative">
        {/* date block */}
        <div className="mb-4">
          <div className="flex items-start gap-0.5">
            <h2 className="mob-tl-date text-[3.2rem] sm:text-[4rem] leading-none tracking-tighter font-bold text-white">
              {event.date}
            </h2>
            <span className="mob-tl-date text-base sm:text-lg mt-2 font-semibold text-white/80">
              {event.ordinal}
            </span>
            {event.dateSuffix && (
              <>
                <h2 className="mob-tl-date text-[3.2rem] sm:text-[4rem] leading-none tracking-tighter font-bold text-white ml-1">
                  {event.dateSuffix}
                </h2>
                <span className="mob-tl-date text-base sm:text-lg mt-2 font-semibold text-white/80">
                  {event.dateSuffixOrdinal}
                </span>
              </>
            )}
          </div>
          <p className="mob-tl-date text-xs sm:text-sm tracking-[0.3em] text-white/70 font-medium mt-1">
            {event.month}
          </p>
        </div>
        
      
        {/* galaxy image*/}
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square my-3">
          <img
            src={event.galaxyImg}
            alt={event.title}
            loading="lazy"
            decoding="async"
            className="mob-tl-galaxy absolute inset-0 w-full h-full object-contain pointer-events-none opacity-80 rounded-full"
          />

          {/* stats overlays */}
          <div className="absolute top-2 right-2 flex flex-col gap-0.5 items-end">
            <p className="mob-tl-stats text-[7px] sm:text-[8px] text-white font-mono">
              Redshift: z = 0.103
            </p>
            <p className="mob-tl-stats text-[7px] sm:text-[8px] text-white font-mono">
              Magnitude: u:18.65 g:17.86 r:17.51
            </p>
          </div>
          <div className="absolute bottom-2 left-2">
            <p className="mob-tl-stats text-[7px] sm:text-[8px] text-white font-mono">
              Luminosity: 2.6 × 10¹⁰ L☉
            </p>
          </div>

          {/* details overlay */}
          <img
            src={event.galaxyDetails}
            alt=""
            loading="lazy"
            decoding="async"
            className="mob-tl-details absolute top-1 left-1 w-14 sm:w-16"
          />
        </div>
  {/* event title */}
        <h3
          className="mob-tl-title absolute -top-2 right-6 text-[1.6rem] sm:text-[2rem] leading-tight tracking-wide text-white font-bold mt-4"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          {event.title}
          {event.titleLine2 && (
            <>
              <br />
              <span
                className={
                  event.titleLine2.startsWith("[")
                    ? "text-base sm:text-lg text-white/70"
                    : ""
                }
              >
                {event.titleLine2}
              </span>
            </>
          )}
        </h3>

      </div>
    </div>
  );
};

const MobileVenue = () => {
  const venueRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!venueRef.current) return;

    // animate line
    if (lineRef.current) {
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top" });
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: venueRef.current,
          start: "top 85%",
          end: "center 50%",
          scrub: 0.5,
        },
      });
    }

    const titleEl = venueRef.current.querySelector(".mob-venue-title");
    const imgEl = venueRef.current.querySelector(".mob-venue-img");
    const textEls = venueRef.current.querySelectorAll(".mob-venue-text");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: venueRef.current,
        start: "top 78%",
        end: "top 30%",
        scrub: 1,
      },
    });

    if (titleEl) {
      gsap.set(titleEl, { opacity: 0, y: 20 });
      tl.to(
        titleEl,
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0,
      );
    }

    if (imgEl) {
      gsap.set(imgEl, { opacity: 0, scale: 0.95 });
      tl.to(
        imgEl,
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        0.15,
      );
    }

    if (textEls.length > 0) {
      gsap.set(textEls, { opacity: 0, y: 15 });
      tl.to(
        textEls,
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
        0.3,
      );
    }
  });

  return (
    <div ref={venueRef} className="relative flex w-full min-h-[300px]">
      {/* left rail */}
      <div className="relative flex flex-col items-center w-12 sm:w-16 shrink-0">
        <div
          ref={lineRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full"
          style={{
            background:
              "linear-gradient(to bottom, rgba(242,124,6,0.1), rgba(242,124,6,0.6) 30%, rgba(242,124,6,0.3) 90%, transparent)",
          }}
        />
        <div
          className="relative z-10 mt-6 w-3 h-3 rounded-full"
          style={{
            background: "#F27C06",
            boxShadow: "0 0 10px 3px rgba(242,124,6,0.5)",
          }}
        />
      </div>

      {/* venue content */}
      <div className="flex-1 pl-4 sm:pl-6 pb-10 pt-2">
        <h2 className="mob-venue-title text-[2rem] sm:text-[2.5rem] tracking-wide font-bold mb-5 text-white">
          VENUE
        </h2>

        <div className="mob-venue-img relative w-full max-w-sm rounded-lg overflow-hidden ">
          <img
            src={assets.timeline.venueFinal}
            alt="Atharva College of Engineering"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="flex items-start gap-3 mt-5 max-w-sm">
          <img
            src={assets.timeline.locationPin}
            alt="location"
            loading="lazy"
            decoding="async"
            className="w-7 sm:w-8 mt-0.5 shrink-0"
          />
          <div>
            <h3 className="mob-venue-text text-sm sm:text-base font-bold tracking-wide leading-tight text-white">
              ATHARVA COLLEGE OF ENGINEERING
            </h3>
            <p className="mob-venue-text text-[11px] sm:text-xs text-white/60 mt-1.5 leading-relaxed">
              Malad - Marve Rd, Malad, Charkop Naka, near Asmita Jyoti Housing
              Society, Malad West, Mumbai, Maharashtra 400095
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineProgressLine = ({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
      onUpdate: (self) => {
        if (lineRef.current) {
          lineRef.current.style.height = `${self.progress * 100}%`;
        }
      },
    });

    return () => trigger.kill();
  }, [containerRef]);

  return (
    <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[2px] pointer-events-none">
      {/* background track line */}
      <div className="absolute inset-0 w-full bg-white/[0.06] rounded-full" />
      {/* animated progress fill */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 w-full rounded-full"
        style={{
          height: "0%",
          background:
            "linear-gradient(to bottom, rgba(242,124,6,0.8), rgba(242,124,6,0.4) 60%, rgba(242,124,6,0.15))",
          boxShadow: "0 0 6px 1px rgba(242,124,6,0.2)",
        }}
      />
    </div>
  );
};

const MobileTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-background text-white py-12 sm:py-16"
    >
      {/* global progress line spanning the whole timeline */}
      <TimelineProgressLine containerRef={containerRef} />

      <div className="relative">
        {timelineEvents.map((event, index) => (
          <MobileTimelineCard key={event.id} event={event} index={index} />
        ))}
        <MobileVenue />
      </div>
    </div>
  );
};

export default MobileTimeline;
