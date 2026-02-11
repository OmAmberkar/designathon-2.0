import { useEffect, useState, useRef, useCallback } from "react";
import { Globe, Linkedin, Twitter, Instagram } from "lucide-react";
import { RetroGrid } from "../retro-grid";
import Header from "./Header";
import CountUp from "../CountUp.jsx";
import ShinyText from "../ShinyText.jsx";
import DecryptedText from "../DecryptedText.jsx";
import FloatingObject from "./Floating.js";

import { AnimatedTooltip } from "../ui/animated-tooltip";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
  });

  const socialItems = [
    {
      id: 1,
      name: "Twitter",
      designation: "Follow Updates",
      image:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1767816590/Background_o5aaeh.png",
      icon: (
        <Twitter
          size={24}
          className="text-neutral-400 group-hover:text-accent transition-colors duration-300"
        />
      ),
      href: "#",
    },
    {
      id: 2,
      name: "Website",
      designation: "Visit GDG",
      image: "/images/gdg-logo.png",
      icon: (
        <Globe
          size={24}
          className="text-neutral-400 group-hover:text-accent transition-colors duration-300"
        />
      ),
      href: "#",
    },
    {
      id: 3,
      name: "LinkedIn",
      designation: "Connect with us",
      image:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1767816590/Background_o5aaeh.png",
      icon: (
        <Linkedin
          size={24}
          className="text-neutral-400 group-hover:text-accent group-hover:fill-accent transition-colors duration-300"
        />
      ),
      href: "#",
    },
    {
      id: 4,
      name: "Instagram",
      designation: "See our gallery",
      image:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1767816590/Background_o5aaeh.png",
      icon: (
        <Instagram
          size={24}
          className="text-neutral-400 group-hover:text-accent transition-colors duration-300"
        />
      ),
      href: "#",
    },
  ];

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });

  // countdown timer
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days: String(days).padStart(2, "0"),
          hours: String(hours).padStart(2, "0"),
          mins: String(minutes).padStart(2, "0"),
          secs: String(seconds).padStart(2, "0"),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // smooth parallax with raf lerp
  useEffect(() => {
    const animate = () => {
      const lerp = 0.06;
      currentOffset.current.x +=
        (targetOffset.current.x - currentOffset.current.x) * lerp;
      currentOffset.current.y +=
        (targetOffset.current.y - currentOffset.current.y) * lerp;

      setMouseOffset({
        x: currentOffset.current.x,
        y: currentOffset.current.y,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    targetOffset.current = {
      x: Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2))),
      y: Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2))),
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetOffset.current = { x: 0, y: 0 };
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full bg-white overflow-hidden flex flex-col pt-3 pb-3 px-3"
    >
      <div className="relative w-full h-full bg-neutral-900 rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center text-foreground font-sans">
        <RetroGrid
          className="absolute inset-0 z-0 h-full w-full opacity-60 pointer-events-none"
          angle={65}
          cellSize={60}
          lightLineColor="#f1f5f9"
          darkLineColor="#f1f5f9"
        />

        <div className="absolute z-12 -top-16 w-28 h-28 rounded-full left-1/2 -translate-x-1/2 bg-white" />

        {/* === GDGC LOGO TOP === */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
          <img
            src="/images/gdg-logo.png"
            alt="GDG Logo"
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
            draggable={false}
          />
        </div>

        {/* hamburger */}
        <Header />

        {/* gdg text below logo */}
        <div className="absolute top-16 md:top-18 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center space-y-0.5">
          <h2 className="text-sm font-inter md:text-base lg:text-2xl font-semibold tracking-wide text-white leading-tight">
            Google Developer Groups
          </h2>
          <p className=" font-inter text-[10px] md:text-xs lg:text-sm text-neutral-300  leading-tight">
            <span className="text-accent font-medium">On Campus</span>
            <span className="mx-1 text-neutral-500">·</span>
            <span>Atharva College of Engineering</span>
          </p>
          <p className="text-[10px] md:text-[14px] text-neutral-300 tracking-widest uppercase pt-1">
            Presents
          </p>
        </div>

        {/* === COUNTDOWN TOP-LEFT === */}
        <div
          style={{ zIndex: 999 }}
          className="absolute  top-24 left-0 drop-shadow-xl"
        >
          <div className="relative bg-white rounded-r-3xl py-3 md:py-4 pl-3 md:pl-4 pr-1.5 flex flex-row items-center">
            {/* rounded white corners */}
            <div
              className="absolute -bottom-6 left-0 w-6 h-6 bg-white"
              style={{
                maskImage:
                  "radial-gradient(circle at 100% 100%, transparent 1.5rem, black 1.5rem)",
                WebkitMaskImage:
                  "radial-gradient(circle at 100% 100%, transparent 1.5rem, black 1.5rem)",
              }}
            />
            {/* rounded white corners */}
            <div
              className="absolute -top-6 left-0 w-6 h-6 bg-white"
              style={{
                maskImage:
                  "radial-gradient(circle at 100% 0%, transparent 1.5rem, black 1.5rem)",
                WebkitMaskImage:
                  "radial-gradient(circle at 100% 0%, transparent 1.5rem, black 1.5rem)",
              }}
            />

            <div className="flex flex-col items-center gap-1.5 md:gap-2 pr-4 py-4 ">
              <div className="flex flex-col items-center leading-none ">
                <span className="text-base md:text-2xl font-bold text-accent font-inter">
                  {timeLeft.days}
                </span>
                <span className="text-[7px] md:text-[12px] uppercase tracking-wider text-black/80 mt-0.5 font-bold">
                  days
                </span>
              </div>
              <div className="flex flex-col items-center leading-none">
                <span className="text-base md:text-2xl font-bold text-accent font-inter">
                  {timeLeft.hours}
                </span>
                <span className="text-[7px] md:text-[12px] uppercase tracking-wider  text-black/80 mt-0.5 font-bold">
                  hours
                </span>
              </div>
              <div className="flex flex-col items-center leading-none">
                <span className="text-base md:text-2xl font-bold text-neutral-700 font-inter">
                  {timeLeft.mins}
                </span>
                <span className="text-[7px] md:text-[12px] uppercase tracking-wider text-black/80 mt-0.5 font-bold">
                  mins
                </span>
              </div>
              <div className="flex flex-col items-center leading-none">
                <span className="text-base md:text-2xl font-bold text-neutral-700 font-inter">
                  {timeLeft.secs}
                </span>
                <span className="text-[7px] md:text-[12px] uppercase tracking-wider text-black/80 mt-0.5 font-bold">
                  secs
                </span>
              </div>
            </div>

            {/* vertical "Countdown" label */}
            <div
              className="text-[7px] md:text-[12px] uppercase tracking-[0.15em] text-black/90  font-medium ml-1 select-none"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
            ></div>
          </div>
        </div>

        {/* === BACKGROUND 2.0 TEXT === */}
        <div className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none select-none overflow-hidden">
          <span
            className="font-bold text-[#3a2a1d] opacity-80 leading-none tracking-tighter"
            style={{ fontSize: "clamp(18rem, 32vw, 38rem)" }}
          >
            2.0
          </span>
        </div>

        {/* === FLOATING 3D OBJECTS === */}

        {/* topleft camera - large, partially behind countdown */}
        <FloatingObject
          src="/images/hero/topleft-camera.png"
          alt="Camera tool"
          wrapperClassName="z-30 top-0 left-[-2%] md:left-[2%] animate-float-1"
          innerClassName="w-44 h-44 md:w-56 md:h-56 lg:w-108 lg:h-108"
          parallaxFactor={0.6}
          mouseOffset={mouseOffset}
        />

        <FloatingObject
          src="/images/hero/bolt.png"
          alt="Bolt"
          wrapperClassName="z-30 top-48 left-[-2%] md:left-[24%] animate-float-1"
          innerClassName="w-5 h-5 md:w-32 md:h-32 rotate-[0deg]"
          parallaxFactor={0.9}
          mouseOffset={mouseOffset}
        />

        {/* topright camera / tools - bigger */}
        <FloatingObject
          src="/images/hero/topright-camera.png"
          alt="Tools"
          wrapperClassName="z-15 top-[8%] right-[0%] md:right-[3%] lg:right-[0%] animate-float-2"
          innerClassName="w-28 h-24 md:w-40 md:h-32 lg:w-108 lg:h-76 "
          parallaxFactor={0.5}
          mouseOffset={mouseOffset}
        />

        {/* laptop left side - bigger */}
        <FloatingObject
          src="/images/hero/laptop.png"
          alt="Laptop"
          wrapperClassName="z-15 bottom-[6%] left-[0%] md:left-[2%] lg:left-[5%] animate-float-3"
          innerClassName="w-36 h-28 md:w-48 md:h-36 lg:w-96 lg:h-87 rotate-[-8deg]"
          parallaxFactor={0.7}
          mouseOffset={mouseOffset}
        />

        {/* bolt 1 - left of astronaut, upper area */}
        <FloatingObject
          src="/images/hero/bolt.png"
          alt="Bolt"
          wrapperClassName="z-15 top-[16%] left-[28%] md:left-[28%] animate-float-4"
          innerClassName="w-5 h-5 md:w-12 md:h-12 rotate-[280deg]"
          parallaxFactor={0.9}
          mouseOffset={mouseOffset}
        />

        {/* bolt 2 - right side mid */}
        <FloatingObject
          src="/images/hero/bolt.png"
          alt="Bolt"
          wrapperClassName="z-15 top-[28%] right-[14%] md:right-[18%] animate-float-5"
          innerClassName="w-4 h-4 md:w-24 md:h-12 rotate-[140deg]"
          parallaxFactor={1.0}
          mouseOffset={mouseOffset}
        />

        {/* bolt 5 - bottom center on grid/white intersection */}
        <FloatingObject
          src="/images/hero/bolt.png"
          alt="Bolt"
          wrapperClassName=" -bottom-8 left-[46%] md:left-[48%] animate-float-3 [animation-delay:1s]"
          innerClassName="w-6 h-6 md:w-32 md:h-32 rotate-[40deg]"
          parallaxFactor={0.5}
          mouseOffset={mouseOffset}
        />

        {/* bolt 6 - right side lower */}
        <FloatingObject
          src="/images/hero/bolt.png"
          alt="Bolt"
          wrapperClassName="z-15 bottom-[40%] right-[12%] animate-float-5 [animation-delay:1.6s]"
          innerClassName="w-4 h-4 md:w-24 md:h-24 rotate-270"
          parallaxFactor={0.7}
          mouseOffset={mouseOffset}
        />

        {/* bottomright camera / hammer tool - bigger */}
        <FloatingObject
          src="/images/hero/bottomright-camera.png"
          alt="Tool"
          wrapperClassName="z-15 bottom-[12%] right-[16%] md:right-[16%] animate-float-4 [animation-delay:1.4s]"
          innerClassName="w-20 h-28 md:w-28 md:h-36 lg:w-56 lg:h-64 rotate-[12deg]"
          parallaxFactor={0.7}
          mouseOffset={mouseOffset}
        />

        {/* === ASTRONAUT (highest z among scene objects, centered) === */}
        <div className="absolute z-25 pointer-events-none left-1/2 -translate-x-1/2 top-[8%] md:top-[20%]">
          <div className="animate-float-3">
            <div
              className="will-change-transform backface-hidden"
              style={{
                transform: `translate3d(${mouseOffset.x * 5}px, ${mouseOffset.y * 5}px, 0) rotateX(${-mouseOffset.y * 2}deg) rotateY(${mouseOffset.x * 2}deg)`,
              }}
            >
              <img
                src="/images/hero/astronaut.png"
                alt="Astronaut floating in space"
                className="w-72 h-72 md:w-100 md:h-100 lg:w-128 lg:h-128 object-contain select-none"
                style={{
                  filter: "drop-shadow(0 0 50px rgba(0,0,0,0.5))",
                }}
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* === MAIN TEXT CONTENT === */}
        <div
          className="absolute z-35 text-center flex flex-col items-center w-full px-4"
          style={{ top: "52%", transform: "translateY(-15%)" }}
        >
          {/* subtle radial gradient behind text for visibility */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 bg-[radial-gradient(closest-side,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_100%)] blur-2xl pointer-events-none" />

          {/* designathon with shiny animation */}
          <div className=" rounded-xl p-2 px-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <ShinyText
              text="D E S I G N A T H O N"
              speed={2}
              className="text-sm md:text-lg lg:text-4xl tracking-tighter font-bold uppercase"
              color="#ffffff"
              shineColor="#b5b5b5"
              spread={120}
            />
          </div>

          <div className="w-full flex justify-center ">
            {/*<SplitText
              text=""
              className="spacebound-title"
              delay={80}
              duration={1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 60, rotateX: -40 }}
              to={{ opacity: 1, y: 0, rotateX: 0 }}
              threshold={0.1}
              rootMargin="-50px"
              textAlign="center"
              tag="h1"
            />*/}
            <h1 className="text-4xl spacebound-title md:text-2xl lg:text-7xl font-bold tracking-tighter text-white leading-tight ">
              SPACEBOUND
            </h1>
          </div>

          {/* tagline */}
          <div className="relative pt-4 w-full max-w-xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-30 blur-sm" />
            <div className="text-xs md:text-sm lg:text-xl font-medium tracking-[0.2em] text-white mt-2 lowercase text-center ">
              <DecryptedText
                text="Design beyond the known universe"
                speed={40}
                maxIterations={15}
                sequential={true}
                revealDirection="center"
                className="text-neutral-100 uppercase font-black "
                encryptedClassName="text-neutral-300"
                animateOn="view"
              />
            </div>
          </div>
        </div>

        {/* === SOCIAL ICONS BOTTOM-LEFT === */}
        <div className="absolute bottom-0 left-0 z-50 drop-shadow-2xl shadow-none outline-none border-0">
          <div className="relative bg-white border-none rounded-tr-3xl p-4 md:p-5 pr-8 md:pr-10 pl-6 md:pl-8 flex items-center space-x-0 shadow-none outline-none border-0">
            {/* inverted corner right */}

            <div
              className="absolute bottom-0 -right-13 w-8 h-8 bg-white -translate-x-px shadow-none outline-none border-0"
              style={{
                maskImage:
                  "radial-gradient(circle at 100% 0, transparent 2rem, black 2rem)",
                WebkitMaskImage:
                  "radial-gradient(circle at 100% 0, transparent 2rem, black 2rem)",
              }}
            />
            {/* inverted corner top */}
            <div
              className="absolute -top-8 left-0 w-8 h-8 bg-white translate-y-px shadow-none outline-none border-0 "
              style={{
                maskImage:
                  "radial-gradient(circle at 100% 0, transparent 2rem, black 2rem)",
                WebkitMaskImage:
                  "radial-gradient(circle at 100% 0, transparent 2rem, black 2rem)",
              }}
            />

            <AnimatedTooltip items={socialItems} />
          </div>
        </div>

        {/* === PRIZE POOL + JOIN NOW BOTTOM-RIGHT === */}
        <div className="absolute bottom-0 right-0 z-50 drop-shadow-2xl">
          <div className="relative bg-white rounded-tl-4xl p-2 flex flex-row items-center">
            {/* inverted corner top */}
            <div
              className="absolute -top-8 right-0 w-8 h-8 bg-white translate-y-px"
              style={{
                maskImage:
                  "radial-gradient(circle at 0 0, transparent 2rem, black 2rem)",
                WebkitMaskImage:
                  "radial-gradient(circle at 0 0, transparent 2rem, black 2rem)",
              }}
            />
            {/* inverted corner left */}
            <div
              className="absolute bottom-0 -left-8 w-8 h-8 bg-white translate-x-px"
              style={{
                maskImage:
                  "radial-gradient(circle at 0 0, transparent 2rem, black 2rem)",
                WebkitMaskImage:
                  "radial-gradient(circle at 0 0, transparent 2rem, black 2rem)",
              }}
            />

            <div className="pl-6 md:pl-8 pr-4 md:pr-6 py-3 md:py-4 flex flex-col items-center min-w-28 md:min-w-36">
              <div className="flex items-baseline leading-none">
                <span className="text-5xl md:text-6xl font-bold text-black tracking-tighter">
                  <CountUp to={100} from={0} duration={2.5} separator="" />
                </span>
                <span className="text-2xl md:text-3xl ml-1 font-bold text-black">
                  k
                </span>
              </div>
              <span className="text-[8px] md:text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-bold ">
                prize pool
              </span>
            </div>

            <button className="bg-accent text-white font-bold py-4 px-6 md:py-5 md:px-8 rounded-2xl uppercase tracking-widest text-xs md:text-lg border-2 border-black/5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 focus-visible:animate-pulse transition-all duration-150 ease-out">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
