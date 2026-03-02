import { assets } from "@/lib/assets";

const RightColumn = () => {
  return (
    <div className="flex flex-col gap-2 w-full lg:w-1/4">
      <div
        className="flex-1 backdrop-blur-md p-5 border border-white/20 flex flex-col justify-start pt-6 overflow-hidden relative"
        style={{
          backgroundImage: `url('${assets.guidelines.galaxyImage}')`,
          backgroundSize: "450% 300%",
          backgroundPosition: "100% 0%",
        }}
      >
        <div className="absolute inset-0 bg-orange-700/30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-orange-500" />
            <h3 className="text-white text-sm lg:text-xl xl:text-2xl font-bold tracking-wider">
              Team Size
            </h3>
          </div>
          <div className="space-y-1.5 text-white/70 text-xs lg:text-sm tracking-wide leading-relaxed">
            <p className="text-primary font-semibold text-xs lg:text-sm">
              Collaboration
            </p>
            <p>EACH TEAM MUST CONSIST OF:</p>
            <p>MINIMUM — 2 members</p>
            <p>MAXIMUM — 3 members</p>
          </div>
        </div>
      </div>

      <div className="flex-1 backdrop-blur-md p-5 border border-white/20 flex flex-col justify-start pt-6 overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-orange-500" />
            <h3 className="text-white text-sm lg:text-xl xl:text-2xl font-bold tracking-wider">
              AI Policy
            </h3>
          </div>
          <div className="space-y-1.5 text-white/70 text-xs lg:text-sm tracking-wide leading-relaxed">
            <p>
              <span className="text-green-400 font-semibold">[ ALLOWED ]</span>{" "}
              Generating images (Midjourney) or text (ChatGPT).
            </p>
            <p>
              <span className="text-red-400 font-semibold">[ BANNED ]</span> UI
              Layouts / Wireframes (Uizard, Galileo AI, etc.).
            </p>
            <p className="text-white/50 italic text-xs mt-1">
              "We want to see your design skills, not the bot's."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightColumn;
