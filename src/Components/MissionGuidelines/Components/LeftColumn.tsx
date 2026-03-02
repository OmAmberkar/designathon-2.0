import { assets } from "@/lib/assets";

const LeftColumn = () => {
  return (
    <div className="flex flex-col gap-2 w-full lg:w-1/4">
      <div className="flex-1 backdrop-blur-md p-5 border border-white/20 flex flex-col justify-start pt-6 overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-orange-500" />
            <h3 className="text-white text-sm lg:text-xl xl:text-2xl font-bold tracking-wider">
              Originality
            </h3>
          </div>
          <div className="space-y-1.5 text-white/70 text-xs lg:text-sm tracking-wide leading-relaxed">
            <p className="text-primary font-semibold text-xs lg:text-sm">
              No Pre-built UI Kits
            </p>
            <p>
              You cannot open a previously saved Figma file. All frames and
              layouts must be created after the event has started.
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex-1 backdrop-blur-md p-5 border border-white/20 flex flex-col justify-start pt-6 overflow-hidden relative"
        style={{
          backgroundImage: `url('${assets.guidelines.galaxyImage}')`,
          backgroundSize: "450% 300%",
          backgroundPosition: "0% 78%",
        }}
      >
        <div className="absolute inset-0 bg-orange-700/30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-orange-500" />
            <h3 className="text-white text-sm lg:text-xl xl:text-2xl font-bold tracking-wider">
              Assets
            </h3>
          </div>
          <div className="space-y-1.5 text-white/70 text-xs lg:text-sm tracking-wide leading-relaxed">
            <p className="text-primary font-semibold text-xs lg:text-sm">
              Allowed Resources
            </p>
            <p>
              You MAY use open-source icon packs (Phosphor, Material, etc.),
              stock photos (Unsplash), and 3D illustrations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftColumn;
