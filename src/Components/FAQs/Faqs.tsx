import { useState } from "react";
import { motion } from "framer-motion";
import OptimizedImage from "@/Components/OptimizedImage";
import { assets } from "@/lib/assets";
import { links } from "@/lib/links";
import { faqContent } from "@/lib/content";
import { FlippingCard } from "../ui/flipping-card";
import { InvertedCorner } from "./InvertedCorner";

const CardFront = ({ text }: { text: string }) => (
  <div className="flex flex-col h-full items-center text-center w-full justify-center relative">
    <h3 className="text-[1.4rem] leading-[1.3] sm:text-[1.5rem] lg:text-[1.4rem] font-semibold font-sans tracking-tight opacity-90 w-[95%]">
      {text}
    </h3>
    <div className="absolute right-0 bottom-0 w-5 h-5 opacity-40">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(-20 12 12)" />
      </svg>
    </div>
  </div>
);

const CardBack = ({ text }: { text: string }) => (
  <div className="flex flex-col h-full w-full items-center justify-center relative text-center">
    <p className="text-[1rem] sm:text-[1.25rem] lg:text-[1.15rem] font-medium font-sans opacity-80 leading-snug">
      {text}
    </p>
  </div>
);

const FaqTitle = ({ className = "" }: { className?: string }) => (
  <h1 className={className}>
    <span className="text-accent">FAQ</span>
    <span className="text-white lowercase">s</span>
  </h1>
);

const Faqs = () => {
  const [isJupiterHovered, setIsJupiterHovered] = useState(false);

  return (
    <section
      className="relative h-dvh max-h-screen min-h-dvh w-full flex flex-col lg:flex-row bg-black bg-cover bg-center bg-no-repeat overflow-hidden z-0"
      style={{ backgroundImage: `url('${assets.faqs.background}')` }}
    >
      {/* mobile title */}
      <div className="z-30 lg:hidden pt-4 pb-0 flex w-full mx-auto items-center justify-center pointer-events-none shrink-0">
        <FaqTitle className="absolute top-4 lg:top-8 left-1/2 -translate-x-1/2 z-30 text-4xl sm:text-5xl leading-none font-share-tech uppercase tracking-tighter drop-shadow-2xl text-center whitespace-nowrap" />
      </div>
      <div className="md:hidden absolute inset-0 top-0 w-full h-full opacity-90 pointer-events-none">
        <OptimizedImage
          src={assets.faqs.gif}
          alt="FAQ Animate"
          className="w-full h-full -right-40 object-contain absolute -top-60 m-auto pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      {/* card layout area */}
      <div className="relative w-full flex-1 lg:h-full lg:w-[60%] flex items-center justify-center lg:justify-start lg:pl-10 xl:pl-20 pointer-events-none pb-0 lg:pb-0 overflow-hidden">
        <div className="relative w-[700px] h-[1060px] shrink-0 scale-[0.44] sm:scale-[0.50] md:scale-[0.85] lg:scale-[0.7] xl:scale-[0.85] 2xl:scale-[0.95] origin-center lg:origin-left -mt-[20vh] sm:-mt-[22vh] lg:mt-0 lg:ml-0 translate-x-[-5%] sm:-translate-x-[5%] lg:translate-x-0 pointer-events-auto">
          {/* origin block */}
          <div className="absolute top-[0px] left-28 w-40 h-44 bg-primary rounded-tl-4xl rounded-tr-4xl    rounded-bl-4xl z-10" />

          {/* card 1 — WHO CAN PARTICIPATE */}
          <div className="absolute top-44 left-72 w-52 h-52 sm:w-52 sm:h-52 z-20">
            <InvertedCorner
              orientation="top-right"
              colorClassName="text-primary"
              className="top-0 -left-[40px]"
            />
            <InvertedCorner
              orientation="bottom-left"
              colorClassName="text-primary"
              className="-top-9 -left-4"
            />

            <FlippingCard
              variant="primary"
              className="!rounded-tl-none shadow-none"
              frontContent={<CardFront text={faqContent[0].question} />}
              backContent={<CardBack text={faqContent[0].answer} />}
            />
          </div>

          {/* card 2 — WHAT TOOLS CAN WE USE */}
          <div className="absolute top-[212px] md:top-48 left-2 w-[260px] h-[340px] sm:w-[260px] sm:h-[360px] z-20">
            <FlippingCard
              variant="white"
              className="!rounded-bl-none shadow-none"
              frontContent={<CardFront text={faqContent[1].question} />}
              backContent={<CardBack text={faqContent[1].answer} />}
            />
          </div>

          <div className="absolute md:hidden   top-[816px]  left-2 w-[224px] h-[340px] z-20">
            <FlippingCard
              variant="white"
              className="!rounded-tl-none rounded-b-4xl shadow-none"
              frontContent={<CardFront text={faqContent[4].question} />}
              backContent={<CardBack text={faqContent[4].answer} />}
            />
          </div>

          {/* connector block */}
          <div className="absolute rounded-b-4xl top-138 -left-63 md:-left-64 w-64 h-72  bg-white z-10" />

          <InvertedCorner
            orientation="bottom-right"
            colorClassName="text-white"
            className="top-[514px] -left-[30px] z-20"
          />
          <InvertedCorner
            orientation="top-left"
            colorClassName="text-white"
            className="top-[550px] left-[3px] md:-left-[5px] z-20"
          />

          <InvertedCorner
            orientation="bottom-left"
            colorClassName="text-white"
            className="md:hidden top-[780px] -left-[-4px] z-20"
          />
          <InvertedCorner
            orientation="top-right"
            colorClassName="text-white"
            className="md:hidden top-[832px] -left-8 md:-left-[5px] z-20"
          />
          <InvertedCorner
            orientation="top-right"
            colorClassName="text-white"
            className="md:hidden top-[816px] -left-8 md:-left-[5px] z-20"
          />

          {/* card 3 — HOW WILL JUDGING BE DONE (desktop + mobile) */}
          <div className="absolute top-[432px] md:top-[416px] left-[480px] w-52 h-52 sm:w-56 sm:h-56 z-20">
            <FlippingCard
              variant="white"
              className="!rounded-bl-none shadow-none"
              frontContent={<CardFront text={faqContent[2].question} />}
              backContent={<CardBack text={faqContent[2].answer} />}
            />
          </div>

          {/* card 4 — HOW MANY MEMBERS (desktop + mobile) */}
          <div className="absolute top-[640px] left-[272px] md:left-[256px] w-52 h-52 sm:w-56 sm:h-56 z-20">
            <FlippingCard
              variant="white"
              className="!rounded-tr-none   shadow-none"
              frontContent={<CardFront text={faqContent[3].question} />}
              backContent={<CardBack text={faqContent[3].answer} />}
            />
          </div>

          <InvertedCorner
            orientation="bottom-right"
            colorClassName="text-white"
            className="top-[602px] left-[442px] z-20"
          />

          <InvertedCorner
            orientation="top-left"
            colorClassName="text-white"
            className="top-[638px] left-[478px] z-20"
          />

          {/* extra mobile-only cards pushed further down for spacing */}
          <div className="md:hidden">
            <div className="absolute bottom-0 left-[460px] w-48 h-48 sm:w-52 sm:h-52 z-20">
              <FlippingCard
                variant="white"
                className="!rounded-bl-none shadow-none"
                frontContent={<CardFront text={faqContent[5].question} />}
                backContent={<CardBack text={faqContent[5].answer} />}
              />
            </div>

            <div className="absolute -bottom-[198px] left-[260px] w-48 h-48 sm:w-52 sm:h-52 z-20">
              <FlippingCard
                variant="white"
                className="!rounded-tr-none shadow-none"
                frontContent={<CardFront text={faqContent[6].question} />}
                backContent={<CardBack text={faqContent[6].answer} />}
              />
            </div>
            <InvertedCorner
              orientation="bottom-right"
              colorClassName="text-white"
              // className="top-[830px] left-[422px] z-20"
              className="top-[1028px] left-[422px] z-20"
            />
            <InvertedCorner
              orientation="top-left"
              colorClassName="text-white"
              // className="top-[862px] left-[450px] z-20"
              className="top-[1060px] left-[450px] z-20"
            />
          </div>

          {/* jupiter discord link — desktop only, fits between card 3 and card 4 */}
          <div
            className="absolute hidden md:block md:top-[660px] md:left-12 w-[140px] h-[140px] z-20 cursor-pointer group"
            onMouseEnter={() => setIsJupiterHovered(true)}
            onMouseLeave={() => setIsJupiterHovered(false)}
            onClick={() => window.open(links.discord, "_blank")}
          >
            <motion.div
              className="absolute inset-[-30px] pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{
                duration: isJupiterHovered ? 4 : 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full overflow-visible opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              >
                <path
                  id="jupiterRingPathDesktop"
                  d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                  fill="none"
                />
                <text
                  fontSize="7.5"
                  fill="#ffffff"
                  fontWeight="bold"
                  letterSpacing="0.1em"
                  dominantBaseline="central"
                  className="uppercase font-sans"
                >
                  <textPath href="#jupiterRingPathDesktop">
                    ASK QUERIES · JOIN DISCORD · ASK QUERIES · JOIN DISCORD ·
                    ASK QUERIES · JOIN DISCORD · ASK QUERIES · JOIN DISCORD ·
                  </textPath>
                </text>
              </svg>
            </motion.div>

            <div className="absolute inset-0 z-30 flex items-center justify-center">
              <img
                src={assets.faqs.jupiter}
                alt="Jupiter"
                className="w-44 h-44 max-w-none object-contain transition-transform duration-500 group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 flex items-center justify-center -translate-y-[2px]">
                <span className="text-white font-bold text-[14px] text-center leading-[1.1] tracking-widest uppercase filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105">
                  Got More
                  <br />
                  Queries?
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile "got more queries" — fixed bottom-right */}
      <div
        className="absolute bottom-8 right-8 z-30 w-[100px] h-[100px] md:hidden cursor-pointer group"
        onMouseEnter={() => setIsJupiterHovered(true)}
        onMouseLeave={() => setIsJupiterHovered(false)}
        onClick={() => window.open(links.discord, "_blank")}
      >
        <motion.div
          className="absolute inset-[-24px] pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{
            duration: isJupiterHovered ? 4 : 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full overflow-visible opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          >
            <path
              id="jupiterRingPathMobile"
              d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
              fill="none"
            />
            <text
              fontSize="7.5"
              fill="#ffffff"
              fontWeight="bold"
              letterSpacing="0.1em"
              dominantBaseline="central"
              className="uppercase font-sans"
            >
              <textPath href="#jupiterRingPathMobile">
                ASK QUERIES · JOIN DISCORD · ASK QUERIES · JOIN DISCORD · ASK
                QUERIES · JOIN DISCORD · ASK QUERIES · JOIN DISCORD ·
              </textPath>
            </text>
          </svg>
        </motion.div>

        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <img
            src={assets.faqs.jupiter}
            alt="Jupiter"
            className="w-32 h-32 max-w-none object-contain transition-transform duration-500 group-hover:scale-[1.05]"
          />

          <div className="absolute inset-0 flex items-center justify-center -translate-y-[2px]">
            <span className="text-white font-bold text-[11px] text-center leading-[1.1] tracking-widest uppercase filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105">
              Got More
              <br />
              Queries?
            </span>
          </div>
        </div>
      </div>

      {/* desktop right panel */}
      <div className="hidden lg:flex relative text-center w-[40%] h-full flex-col items-center justify-center px-6 lg:p-4 z-20 pointer-events-none">
        <FaqTitle className="text-[7rem] font-sans font-bold whitespace-nowrap tracking-tight leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-20"  />
        <div className="pointer-events-none select-noneopacity-90 w-140 overflow-hidden">
          <OptimizedImage
            src={assets.faqs.gif}
            alt="FAQ Animate"
            className=" w-180 scale-140"
          />
        </div>
      </div>
    </section>
  );
};

export default Faqs;
