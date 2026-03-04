import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FlippingCardProps {
  className?: string;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
  variant?: "white" | "primary";
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
  variant = "white",
}: FlippingCardProps) {
  const isWhite = variant === "white";
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full h-full rounded-[32px] p-2 lg:p-3 cursor-pointer",
        isWhite ? "bg-white" : "bg-primary",
        className,
      )}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="group/flipping-card w-full h-full [perspective:1000px]">
        <div
          className={cn(
            "relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] rounded-[20px] lg:rounded-[24px]",
            isFlipped
              ? "[transform:rotateY(180deg)]"
              : "md:group-hover/flipping-card:[transform:rotateY(180deg)]",
          )}
        >
          {/* Front Face */}
          <div
            className={cn(
              "absolute  inset-0 h-full w-full [transform:rotateY(0deg)] rounded-[inherit] [backface-visibility:hidden] [transform-style:preserve-3d] p-4 flex items-center justify-center shadow-sm",
              isWhite
                ? "bg-white text-black border border-black/5"
                : "bg-primary text-white border border-white/20",
            )}
          >
            <div className="h-full w-full [transform:translateZ(40px)] flex flex-col justify-center">
              {frontContent}
            </div>
          </div>

          {/* Back Face */}
          <div
            className={cn(
              "absolute inset-0 h-full w-full [transform:rotateY(180deg)] rounded-[inherit] [backface-visibility:hidden] [transform-style:preserve-3d] p-4 flex items-center justify-center shadow-lg",
              isWhite
                ? "bg-white text-black border border-black/5"
                : "bg-primary text-white border border-white/20",
            )}
          >
            <div className="h-full w-full  [transform:translateZ(40px)] flex flex-col justify-center text-center overflow-hidden">
              {backContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
