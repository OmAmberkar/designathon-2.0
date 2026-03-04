import MainGridContainer from "./Components/MainGridContainer";
import OrangeBox from "./Components/OrangeBox";

const MissionGuidelines = () => {
  return (
    <section className="w-full bg-background lg:bg-background border-t border-white/10 relative overflow-hidden h-dvh max-h-screen flex flex-col">
      <div className="hidden md:block">
        <OrangeBox />
      </div>
      <div className="flex-1 min-h-0">
        <MainGridContainer />
      </div>
    </section>
  );
};

export default MissionGuidelines;
