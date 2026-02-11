const PARALLAX_ROTATION_CAP = 5;
const PARALLAX_TRANSLATE_CAP = 10;

interface FloatingObjectProps {
  src: string;
  alt: string;
  wrapperClassName?: string;
  innerClassName?: string;
  imgClassName?: string;
  parallaxFactor?: number;
  mouseOffset: { x: number; y: number };
}

const FloatingObject = ({
  src,
  alt,
  wrapperClassName = "",
  innerClassName = "",
  imgClassName = "",
  parallaxFactor = 1,
  mouseOffset,
}: FloatingObjectProps) => {
  const tx = mouseOffset.x * PARALLAX_TRANSLATE_CAP * parallaxFactor;
  const ty = mouseOffset.y * PARALLAX_TRANSLATE_CAP * parallaxFactor;
  const rx = -mouseOffset.y * PARALLAX_ROTATION_CAP * parallaxFactor;
  const ry = mouseOffset.x * PARALLAX_ROTATION_CAP * parallaxFactor;

  return (
    <div
      className={`absolute z-99 pointer-events-none will-change-transform ${wrapperClassName}`}
    >
      <div
        className={`will-change-transform backface-hidden ${innerClassName}`}
        style={{
          transform: `translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`,
        }}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-contain select-none ${imgClassName}`}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default FloatingObject;
