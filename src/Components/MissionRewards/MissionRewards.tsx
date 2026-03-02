import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import GalaxyModel from "./components/GalaxyModel";
import { LeftBar, RightBar } from "./constants/SvgExporter";
import TiltedCard from "./components/TiltedCard";
import FirstPrize from "./constants/FirstPrize.svg";
import SecondPrize from "./constants/SecondPrize.svg";
import ThirdPrize from "./constants/ThirdPrize.svg";

const MissionRewards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
        };

        if (isDesktop) {
          gsap.fromTo(
            contentRef.current,
            {
              scale: 0.94,
              borderRadius: "2rem",
            },
            {
              scale: 1,
              borderRadius: 0,
              duration: 1,
              ease: "power2.out",
              force3D: true,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        gsap.fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
              end: "top top",
              scrub: true,
              invalidateOnRefresh: true,
            },
            force3D: true,
          },
        );

        const cards = cardsRef.current.filter(Boolean);

        if (isDesktop) {
          const revealOrder = [2, 0, 1];

          cards.forEach((card, i) => {
            const direction = i === 1 ? 0 : i === 0 ? -1 : 1;
            gsap.set(card, {
              y: 40,
              rotateX: 15,
              rotateY: direction * 8,
              scale: 0.92,
              transformPerspective: 800,
              xPercent: 0,
              yPercent: 0,
              opacity: 1,
              force3D: true,
              position: "static",
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=2200",
              scrub: 1,
              pin: true,
              pinSpacing: true,
              invalidateOnRefresh: true,
            },
          });

          tl.to({}, { duration: 0.15 });

          revealOrder.forEach((cardIndex, i) => {
            if (!cards[cardIndex]) return;
            tl.to(
              cards[cardIndex],
              {
                y: 0,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                force3D: true,
              },
              i === 0 ? ">" : ">-0.25",
            );
          });

          tl.to({}, { duration: 0.4 });
        } else if (isMobile) {
          cards.forEach((card) => {
            gsap.set(card, {
              yPercent: 150,
              rotateX: -45,
              scale: 0.8,
              opacity: 0,
              transformOrigin: "center center",
              transformPerspective: 1200,
              force3D: true,
              position: "absolute",
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=3500",
              scrub: 1,
              pin: true,
              pinSpacing: true,
              invalidateOnRefresh: true,
            },
          });

          tl.to({}, { duration: 0.1 });

          const animationDuration = 1;
          const rotateAmount = 45;

          const mobileRevealOrder = [1, 0, 2];

          mobileRevealOrder.forEach((cardIndex, i) => {
            const card = cards[cardIndex];

            tl.to(
              card,
              {
                yPercent: 0,
                rotateX: 0,
                scale: 1,
                opacity: 1,
                duration: animationDuration,
                ease: "power2.inOut",
              },
              i === 0 ? ">" : "<",
            );
            tl.to({}, { duration: 0.6 });

            if (i < mobileRevealOrder.length - 1) {
              tl.to(card, {
                yPercent: -200,
                rotateX: rotateAmount,
                scale: 0.8,
                duration: animationDuration,
                ease: "power2.inOut",
              });
            }
          });

          tl.to({}, { duration: 0.5 });
        }
      },
    );

    return () => mm.revert();
  }, []);

  const prizes = [
    {
      imageSrc: SecondPrize,
      altText: "Second Prize",
      overlayContent: "15,000",
      bgcolor: "#211E1B",
      assetColors: "#F5F5F5",
      position: "2",
      follower: "nd",
      textColor: "#F27C06",
      className: "order-2 md:order-none",
    },
    {
      imageSrc: FirstPrize,
      altText: "First Prize",
      overlayContent: "25,000",
      bgcolor: "#F27C06",
      assetColors: "#211E1B",
      position: "1",
      follower: "st",
      textColor: "#F5F5F5",
      className: "order-1 md:order-none",
    },
    {
      imageSrc: ThirdPrize,
      altText: "Third Prize",
      overlayContent: "10,000",
      bgcolor: "#ffff",
      assetColors: "#F27C06",
      position: "3",
      follower: "rd",
      textColor: "#211E1B",
      className: "order-3 md:order-none",
    },
  ];

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen select-none">
      <div
        ref={contentRef}
        className="relative w-full min-h-screen bg-[#000000] overflow-hidden"
        style={{ transformOrigin: "center top", willChange: "transform" }}
      >
        <GalaxyModel />
        <div className="relative flex flex-col items-center justify-start pointer-events-none z-10 py-6 sm:py-8 md:pt-16 lg:pt-20 min-h-screen gap-4 sm:gap-4 md:gap-8">
          <div
            ref={titleRef}
            className="flex flex-wrap text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none text-accent font-share-tech uppercase tracking-tighter drop-shadow-2xl text-center whitespace-nowrap gap-2 sm:gap-4 md:gap-8 justify-center w-full items-center px-4"
          >
            <div className="hidden xl:block">
              <LeftBar width="300" />
            </div>
            <h1 className="text-center mt-2 md:mt-0">
              MISSION <span className="text-white">REWARDS</span>
            </h1>
            <div className="hidden xl:block">
              <RightBar width="300" />
            </div>
          </div>

          <div className="cards-container pointer-events-none flex w-full relative md:static justify-center md:justify-evenly items-center flex-wrap gap-4 sm:gap-6 md:gap-6 lg:gap-8 px-2 sm:px-4 mt-0 sm:mt-0 flex-1 md:flex-initial h-[60vh] md:h-auto -translate-y-4 md:translate-y-0">
            {prizes.map((prize, index) => (
              <div
                key={index}
                className={`pointer-events-auto absolute md:static md:w-auto w-[75%] max-w-[280px] transform-gpu ${prize.position === "2" || prize.position === "3" ? "md:mt-[60px]" : ""} ${prize.className}`}
                style={{ willChange: "transform, opacity" }}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
              >
                <TiltedCard
                  imageSrc={prize.imageSrc}
                  altText={prize.altText}
                  containerHeight="auto"
                  containerWidth="100%"
                  imageHeight="clamp(320px, 55vh, 460px)"
                  imageWidth="100%"
                  bgcolor={prize.bgcolor}
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  displayOverlayContent
                  overlayContent={prize.overlayContent}
                  assetColors={prize.assetColors}
                  position={prize.position}
                  follower={prize.follower}
                  textColor={prize.textColor}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionRewards;
