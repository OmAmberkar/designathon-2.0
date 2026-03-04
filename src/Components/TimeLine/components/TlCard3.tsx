import { useRef, forwardRef, useImperativeHandle } from "react";
import { assets } from "@/lib/assets";
import type { TlCardHandle, OrangeRectHandle } from "@/lib/types";
import { buildCardTimeline } from "./useCardAnimation";
import OrangeRect from "./OrangeRect";

const TlCard3 = forwardRef<TlCardHandle>((_props, ref) => {
  const tlCardRef = useRef<HTMLDivElement>(null);
  const statsImgRef = useRef<HTMLImageElement>(null);
  const orangeRectRef1 = useRef<OrangeRectHandle>(null);
  const orangeRectRef2 = useRef<OrangeRectHandle>(null);

  useImperativeHandle(ref, () => ({
    animate: () =>
      buildCardTimeline({
        cardRef: tlCardRef,
        statsImgRef,
        orangeRectRef1,
        orangeRectRef2,
        infoClassName: ".tl-card3-info",
      }),
    element: tlCardRef.current,
  }));

  return (
    <div
      ref={tlCardRef}
      className="relative max-w-[60vw] mx-auto max-h-full pt-[22vh]"
    >
      <div className="h-[80vh] w-full flex flex-col items-center">
        <div className="z-10 text-center flex flex-col items-center">
          <div className="flex justify-center items-start gap-2">
            <h1 className="tl-card-text text-[6.2em] tracking-tighter leading-20">
              16
            </h1>
            <p className="tl-card-text text-3xl mt-3">th</p>
          </div>
          <h2 className="tl-card-text text-[1.6em] tracking-[0.3em]">MARCH</h2>
        </div>

        <div className="z-10 grid grid-cols-4 flex-1 items-center text-center relative">
          <img
            src={assets.timeline.galaxy3}
            alt="galaxy"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 m-auto h-160 w-180 pointer-events-none"
          />
          <img
            src={assets.timeline.galaxy3Details}
            ref={statsImgRef}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-50 col-span-1"
          />
          <div className="col-span-1" />
          <div className="flex flex-col mt-10 items-center gap-56 col-span-1">
            <div className="flex items-center gap-2">
              <OrangeRect
                fill="#F27C06"
                ref={orangeRectRef1}
                className="h-4 w-4"
              />
              <p className="stats text-xs">Luminosity: 2.6 × 10¹⁰ L☉</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <OrangeRect
                fill="#F27C06"
                ref={orangeRectRef2}
                className="h-7 w-7"
              />
              <p className="stats text-xs">
                Magnitude: u:18.65 g:17.86 r:17.51 <br />
                Redshift: z = 0.103
              </p>
            </div>
          </div>
          <div className="flex justify-end h-full pt-14 items-center col-span-1">
            <p className="stats text-[10px]">Rotation Curve: ??? km/s peak</p>
          </div>
        </div>

        <div className="z-10 text-center flex-1 mt-8">
          <h2
            style={{ clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)" }}
            className="tl-card3-info text-[4em] tracking-tight leading-16"
          >
            MISSION REVEAL
          </h2>
        </div>
      </div>
    </div>
  );
});

export default TlCard3;
