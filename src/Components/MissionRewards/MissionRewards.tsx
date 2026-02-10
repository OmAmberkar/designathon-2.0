import GalaxyModel from "@/Components/MissionRewards/components/GalaxyModel"
import { LeftBar } from "./constants/SvgExporter"
import { RightBar } from "./constants/SvgExporter"
import TiltedCard from "./components/TiledCard"
import FirstPrize from "@/Components/MissionRewards/constants/FirstPrize.svg"
import SecondPrize from "@/Components/MissionRewards/constants/SecondPrize.svg"
import ThirdPrize from "@/Components/MissionRewards/constants/ThirdPrize.svg"
import { useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const MissionRewards = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  const cardsRef = useRef<HTMLDivElement[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Main section scroll animation (expands the container)
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top top",
          scrub: true,
        },
        margin: 0,
        borderRadius: 0,
        duration: 1,
        ease: "power2.out"
      })

      // Cards sequence animation (Pinned)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2500", // Extends the scroll distance
          scrub: 1,
          pin: true,
        }
      })

      // Initial state
      gsap.set(cardsRef.current, { y: 100, autoAlpha: 0 })

      // Sequence: 3rd -> Scroll -> 2nd -> Scroll -> 1st
      tl.to({}, { duration: 0.1 }) // Slight pause after pinning
        .to(cardsRef.current[2], { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }) // 3rd Prize (Index 2)
        .to({}, { duration: 0.5 }) // Scroll space
        .to(cardsRef.current[0], { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }) // 2nd Prize (Index 0)
        .to({}, { duration: 0.5 }) // Scroll space
        .to(cardsRef.current[1], { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }) // 1st Prize (Index 1)
        .to({}, { duration: 0.5 }) // Hold at the end

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const prizes = [
    {
      imageSrc: SecondPrize,
      altText: "Second Prize",
      overlayContent: "15,000",
      bgcolor: "#211E1B",
      assetColors: "#F5F5F5",
      position: "2",
      follower: "nd",
      textColor: "#F27C06"
    },
    {
      imageSrc: FirstPrize,
      altText: "First Prize",
      overlayContent: "25,0000",
      bgcolor: "#F27C06",
      assetColors: "#211E1B",
      position: "1",
      follower: "st",
      textColor: "#F5F5F5"
    },
    {
      imageSrc: ThirdPrize,
      altText: "Third Prize",
      overlayContent: "10,000",
      bgcolor: "#ffff",
      assetColors: "#F27C06",
      position: "3",
      follower: "rd",
      textColor: "#211E1B"
    }
  ]

  return (
    <div ref={sectionRef} className="relative bg-[#000000]  rounded-4xl min-h-screen overflow-hidden">
      <GalaxyModel />
      <div className="relative flex flex-col items-center justify-center pointer-events-none z-10 py-12 min-h-screen">
        <div className="flex flex-wrap text-5xl md:text-8xl gap-4 md:gap-10 justify-center w-full items-center px-4">
          <div className="hidden xl:block"><LeftBar width="300" /></div>
          <h1 className="text-center">MISSION <span className="text-accent">REWARDS</span></h1>
          <div className="hidden xl:block"><RightBar width="300" /></div>
        </div>
        <div className="cards-container pointer-events-none flex w-full justify-center md:justify-evenly items-center flex-wrap gap-10 px-4">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="pointer-events-auto"
              ref={(el) => { if (el) cardsRef.current[index] = el }}
            >
              <TiltedCard
                imageSrc={prize.imageSrc}
                altText={prize.altText}
                containerHeight="500px"
                containerWidth="300px"
                imageHeight="500px"
                imageWidth="300px"
                bgcolor={prize.bgcolor}
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip
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
  )
}

export default MissionRewards