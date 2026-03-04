import { assets } from "@/lib/assets";
import LeftColumn from "./LeftColumn";
import CenterVisual from "./CenterVisual";
import RightColumn from "./RightColumn";
import MobileCard from "./MobileCard";

const RULEBOOK_URL =
  "https://d8it4huxumps7.cloudfront.net/uploads/attachements/files/8ec105a8-9497-416f-8269-cf185e43f298.pdf";

const guidelineContent = [
  {
    title: "Originality",
    lines: [
      "No Pre-built UI Kits.",
      "You cannot open a previously saved Figma file.",
      "All frames and layouts must be created after the event starts.",
    ],
  },
  {
    title: "Assets",
    lines: [
      "You MAY use open-source icon packs (Phosphor, Material, etc.),",
      "stock photos (Unsplash),",
      "and 3D illustrations.",
    ],
  },
  {
    title: "Team Size",
    lines: [
      "EACH TEAM MUST CONSIST OF:",
      "MINIMUM — 2 members",
      "MAXIMUM — 4 members",
    ],
  },
  {
    title: "AI Policy",
    lines: [
      "[ALLOWED] Generating images (Midjourney) or text (ChatGPT).",
      "[BANNED] UI Layouts / Wireframes (Uizard, Galileo AI, etc.).",
      '"We want to see your design skills, not the bot\'s."',
    ],
  },
];

const MainGridContainer = () => {
  return (
    <div className="relative mx-auto h-full max-w-7xl px-4 py-4 md:px-6 lg:py-6 flex flex-col">
      <h1 className="mb-3 sm:mb-4 lg:mb-6 shrink-0 z-30 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none text-accent font-share-tech uppercase tracking-tighter drop-shadow-2xl text-center whitespace-nowrap">
        MISSION <span className="text-white">GUIDELINES</span>
      </h1>

      {/* mobile layout */}
      <div className="mx-auto space-y-0 lg:hidden px-2 sm:px-4 max-w-lg flex-1 flex flex-col justify-center">
        <MobileCard
          image
          imagePosition="20% 15%"
          guideline={guidelineContent[0]}
          transform="rotate(45deg) scale(1.5)"
        />

        <MobileCard
          image
          imagePosition="50% 12%"
          guideline={guidelineContent[1]}
          reverse
          transform="rotate(40deg) scale(1.5)"
        />

        <MobileCard
          image
          imagePosition="45% 65%"
          guideline={guidelineContent[2]}
          transform="rotate(40deg) scale(1.5)"
        />

        <div className="grid grid-cols-2 gap-0">
          <div className="h-36 sm:h-44 border border-white/20 bg-background px-3 py-4 md:h-48 md:py-6">
            <div className="mb-2 sm:mb-5 flex items-center gap-2 sm:gap-3">
              <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 bg-orange-500 shrink-0" />
              <h3 className="text-sm sm:text-md font-bold uppercase tracking-[0.08em] text-white md:text-4xl">
                {guidelineContent[3].title}
              </h3>
            </div>

            <div className="space-y-1 text-[9px] sm:text-sm leading-[1.3] text-white/85 md:text-2xl">
              {guidelineContent[3].lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          <div className="relative h-36 sm:h-44 border border-white/20 md:h-48 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url('${assets.guidelines.galaxyImage}')`,
                backgroundSize: "450% 300%",
                backgroundPosition: "75% 70%",
                transform: "rotate(40deg) scale(1.5)",
              }}
            />
            <div className="absolute inset-0 bg-orange-700/20 mix-blend-overlay" />
            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-3 left-2 right-2 flex justify-center">
              <a
                href={RULEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-full max-w-[calc(100%-8px)] rounded-md border border-white bg-[#F27C06] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-orange-600 px-2 flex items-center justify-center"
              >
                Download Rulebook
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* desktop layout */}
      <div className="hidden lg:flex gap-2 flex-1 min-h-0">
        <LeftColumn />
        <CenterVisual />
        <RightColumn />
      </div>
    </div>
  );
};

export default MainGridContainer;
