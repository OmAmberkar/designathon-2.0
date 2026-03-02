import { useCountdown } from "./hooks/useCountdown.js";
import { useParallax } from "./hooks/useParallax.js";
import SocialIcons from "./SocialIcons.js";
import { RetroGrid } from "../retro-grid";
import GdgIcon from "./components/GdgIcon.js";
import CountUp from "../CountUp.jsx";
import ShinyText from "../ShinyText.jsx";
import DecryptedText from "../DecryptedText.jsx";
import FloatingObject from "./Floating.js";
import { assets } from "@/lib/assets.js";
import Timer from "./components/Timer.js";
import NavigationMenu from "../navigationMenu.js";
import { InvertedCorner } from "./SocialIcons.js";
import { links } from "@/lib/links.js";

const HeroSection = () => {
  const timeLeft = useCountdown();
  const { mouseOffset, sectionRef, handleMouseMove, handleMouseLeave } =
    useParallax();
  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-dvh min-h-dvh max-h-screen w-full bg-white p-1 sm:p-2 md:p-3 overflow-hidden flex flex-col"
    >
      {/* LET THIS STAY HERE DO NOT TOUCH THIS PLEASE PLEASE PLEASE */}
      <FloatingObject
        src={assets.hero.bolt}
        alt="Bolt"
        wrapperClassName="-bottom-4 left-[46%] sm:-bottom-8 sm:left-[48%] animate-float-3 [animation-delay:1s] sm:z-100 z-0"
        innerClassName="w-24 h-24 sm:w-40 sm:h-40 md:h-48 md:w-48 rotate-[40deg]"
        parallaxFactor={0.5}
        mouseOffset={mouseOffset}
      />
      {/* WHOEVER TOUCHES THE ABOVE COMPONENT WILL BE TOUCHED.*/}

      <div className="relative flex-1 w-full bg-neutral-900 rounded-3xl overflow-hidden flex flex-col items-center justify-center text-foreground font-sans">
        <RetroGrid
          className="absolute inset-0 z-0 h-full w-full opacity-60 pointer-events-none"
          angle={65}
          cellSize={60}
          lightLineColor="#f1f5f9"
          darkLineColor="#f1f5f9"
        />

        {/* gdgc logo */}
        <GdgIcon />

        <div className="absolute md:-top-2.5 -top-1 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <img
            src={assets.hero.gdgLogo}
            alt="GDG Logo"
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
            decoding="async"
            draggable={false}
          />
        </div>

        <NavigationMenu />

        {/* gdg text below logo */}
        <div className="absolute text-center top-16 sm:top-18 left-1/2 -translate-x-1/2 z-15 flex flex-col items-center space-y-0.5">
          <h2 className="text-sm font-inter sm:text-base md:text-xl lg:text-2xl font-semibold tracking-wide text-white leading-tight">
            Google Developer Groups
          </h2>
          <p className="font-inter text-[10px] md:text-xs lg:text-sm text-neutral-300 leading-tight">
            <span className="text-accent font-medium hidden sm:inline">
              On Campus
            </span>
            <span className="sm:mx-1 text-neutral-500">|</span>
            <span>Atharva College of Engineering</span>
          </p>
          <p className="text-md sm:text-xl text-neutral-300 tracking-widest uppercase pt-2">
            Presents
          </p>
        </div>

        {/* countdown panel */}
        <Timer timeLeft={timeLeft} />

        {/* background 2.0 text */}
        <div className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none select-none overflow-hidden">
          <span
            className="font-bold text-[#5b3c24] opacity-100 leading-none tracking-wider"
            style={{ fontSize: "clamp(14rem, 32vw, 38rem)" }}
          >
            2.0
          </span>
        </div>

        {/* floating objects */}
        <FloatingObject
          src={assets.hero.topleftCamera}
          alt="Camera tool"
          wrapperClassName="z-8 top-0 left-0 sm:top-6 sm:left-0 md:top-0 md:left-[2%] animate-float-1"
          innerClassName="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-96 lg:h-96"
          parallaxFactor={0.6}
          mouseOffset={mouseOffset}
        />
        <FloatingObject
          src={assets.hero.bolt}
          alt="Bolt"
          wrapperClassName="z-8 top-56 left-[10%] md:left-[24%] animate-float-1"
          innerClassName="w-16 h-16 sm:w-32 sm:h-32 rotate-[0deg]"
          parallaxFactor={0.9}
          mouseOffset={mouseOffset}
        />
        <FloatingObject
          src={assets.hero.toprightCamera}
          alt="Tools"
          wrapperClassName="z-5 top-16 right-[-60px] sm:top-0 sm:right-0 animate-float-2"
          innerClassName="w-48 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-108 lg:h-76"
          parallaxFactor={0.5}
          mouseOffset={mouseOffset}
        />
        <FloatingObject
          src={assets.hero.laptop}
          alt="Laptop"
          wrapperClassName="z-5 bottom-0 -left-[5%] md:bottom-[2%] sm:left-[2%] lg:left-[0%] animate-float-3"
          innerClassName="w-40 h-40 sm:w-48 sm:h-48 md:w-66 md:h-66 lg:w-78 lg:h-78 rotate-[-8deg] md:rotate-[0deg]"
          parallaxFactor={0.7}
          mouseOffset={mouseOffset}
        />
        <FloatingObject
          src={assets.hero.bolt}
          alt="Bolt"
          wrapperClassName="z-5 top-[20%] left-[32%] md:top-[16%] md:left-[28%] animate-float-4"
          innerClassName="w-10 h-10 md:w-12 md:h-12 rotate-[280deg]"
          parallaxFactor={0.9}
          mouseOffset={mouseOffset}
        />
        <FloatingObject
          src={assets.hero.bolt}
          alt="Bolt"
          wrapperClassName="z-5 top-[32%] right-[20%] sm:right-[10%] md:top-[28%] md:right-[18%] animate-float-5"
          innerClassName="w-12 h-12 sm:w-24 sm:h-24 rotate-[140deg]"
          parallaxFactor={1.0}
          mouseOffset={mouseOffset}
        />

        <FloatingObject
          src={assets.hero.bolt}
          alt="Bolt"
          wrapperClassName="z-5 bottom-[45%] right-[18%] md:bottom-[40%] md:right-[12%] animate-float-5 [animation-delay:1.6s]"
          innerClassName="w-12 h-12 md:w-24 md:h-24 rotate-270"
          parallaxFactor={0.7}
          mouseOffset={mouseOffset}
        />
        <FloatingObject
          src={assets.hero.bottomrightCamera}
          alt="Tool"
          wrapperClassName="z-5 bottom-[18%] right-[8%] md:bottom-[12%] md:right-[16%] animate-float-4 [animation-delay:1.4s]"
          innerClassName="w-18 h-24 sm:w-28 sm:h-36 lg:w-56 lg:h-64 rotate-160 md:rotate-0"
          parallaxFactor={0.7}
          mouseOffset={mouseOffset}
        />

        {/* astronaut with amplified parallax */}
        <div className="absolute z-7 pointer-events-none left-1/2 -translate-x-1/2 top-[32%] sm:top-[28%] md:top-[20%] w-78 h-78  sm:w-100 sm:h-100 lg:w-128 lg:h-128">
          <div className="animate-float-3">
            <div
              className="will-change-transform backface-hidden"
              style={{
                transform: `translate3d(${mouseOffset.x * 18}px, ${mouseOffset.y * 18}px, 0) rotateX(${-mouseOffset.y * 6}deg) rotateY(${mouseOffset.x * 6}deg)`,
                transition: "transform 0.05s linear",
              }}
            >
              <img
                src={assets.hero.astronaut}
                alt="Astronaut floating in space"
                className="w-78 h-78 sm:w-100 sm:h-100 lg:w-128 lg:h-128 object-contain select-none"
                decoding="async"
                style={{
                  filter: "drop-shadow(0 0 50px rgba(0,0,0,0.5))",
                }}
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* main text content */}
        <div
          className="absolute z-12 text-center flex flex-col items-center w-full px-4"
          style={{ top: "52%", transform: "translateY(-15%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 bg-[radial-gradient(closest-side,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_100%)] blur-2xl pointer-events-none" />

          <div className="rounded-xl p-2 px-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <ShinyText
              text="D E S I G N A T H O N"
              speed={2}
              className="text-sm md:text-lg lg:text-4xl tracking-tighter font-bold uppercase"
              color="#ffffff"
              shineColor="#f5f5f5"
              spread={120}
            />
          </div>

          <div className="w-full flex justify-center">
            <h1 className="text-4xl spacebound-title md:text-2xl lg:text-7xl font-bold tracking-tighter text-white leading-tight">
              SPACEBOUND
            </h1>
          </div>

          <div className="relative pt-4 w-full max-w-xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-30 blur-sm" />
            <div className="text-xs md:text-sm lg:text-xl font-medium tracking-[0.2em] text-white mt-2 lowercase text-center">
              <DecryptedText
                text="Design beyond the known universe"
                speed={70}
                maxIterations={20}
                sequential={true}
                revealDirection="center"
                className="text-neutral-100 uppercase font-black"
                encryptedClassName="text-neutral-300 uppercase font-black"
                animateOn="view"
              />
            </div>
          </div>
        </div>

        <SocialIcons />

        {/* prize pool + join now */}
        <div className="absolute right-0 z-10 bottom-0">
          <div className="relative bg-white rounded-tl-3xl sm:px-2 flex flex-row items-center">
            <InvertedCorner className="absolute z-10 -left-[31px] -bottom-px rotate-270  w-8 h-8 text-white" />
            <InvertedCorner className="absolute z-10 -right-px -top-[31px] rotate-270  w-8 h-8 text-white" />
            <div className="text-center py-3 sm:py-4 flex flex-col items-center min-w-28 sm:min-w-32">
              <div className="flex items-baseline leading-none">
                <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-black tracking-tighter">
                  <CountUp to={60} from={0} duration={1.5} separator="" />
                </span>
                <span className="text-2xl sm:text-3xl ml-1 font-bold text-black">
                  k
                </span>
              </div>
              <span className="text-[10px] sm:text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-bold">
                prize pool
              </span>
            </div>

            <a
              href={links.registration}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white font-bold py-2 mr-4 sm:mr-0 px-3 sm:py-4 md:py-5 sm:px-5 md:px-8 md:rounded-2xl rounded-lg uppercase tracking-widest text-sm md:text-lg border-2 border-black/5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 focus-visible:animate-pulse transition-all duration-150 ease-out inline-flex items-center justify-center"
            >
              Join Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
