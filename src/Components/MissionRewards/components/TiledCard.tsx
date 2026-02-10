import type { SpringOptions } from 'motion/react';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { SideImage, TopImage } from '../constants/SvgExporter';

interface TiltedCardProps {
  imageSrc: React.ComponentProps<'img'>['src'];
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  imageHeight?: React.CSSProperties['height'];
  imageWidth?: React.CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  bgcolor?: string;
  assetColors?: string;
  position?: string;
  follower: string;
  textColor?: string;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  imageSrc,
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  // showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  bgcolor = "#F27C06",
  assetColors = "",
  position = "",
  follower = "",
  textColor = "#000"
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }


  return (
    <figure
      ref={ref}
      className="w-full h-full perspective-midrange flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth,
        marginTop: position == "2" || position == "3" ? "60px" : undefined
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative rounded-xl border border-amber-50 p-5 perspective-midrange flex flex-col"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
          backgroundColor: bgcolor
        }}
      >
        <TopImage fill={assetColors} />

        <motion.div
          className='flex my-2 w-full justify-between items-center'
        >
          <SideImage fill={assetColors} />
          <div className="relative w-60 h-full flex items-center justify-center">
            <motion.img src={imageSrc} className='w-full h-full' />
            <div className={`absolute text-9xl font-bold drop-shadow-[5px_5px_0_rgba(0,0,0,0.25)]`} style={{ color: textColor }}>{position}<span className='text-3xl'>{follower}</span></div>
          </div>
        </motion.div>

        <motion.div className='flex-1'>
          {displayOverlayContent && overlayContent && (
            <motion.div
              style={{ backgroundColor: assetColors, color: textColor }}
              className="z-10 border font-extrabold border-amber-50 flex-col shadow-2xl p-2 h-full flex items-center justify-center rounded-xl"
            >
              <motion.div className='text-7xl drop-shadow-[5px_5px_0_rgba(0,0,0,0.25)]'>
                {overlayContent}
              </motion.div>

              <motion.div className='text-2xl font-bold flex gap-2'>
                <span className="drop-shadow-[3px_3px_0_rgba(0,0,0,0.25)]">solar credits</span>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </figure>
  );
}
