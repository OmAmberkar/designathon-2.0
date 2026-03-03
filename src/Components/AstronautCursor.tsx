import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AstronautCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const outerRingRef = useRef<HTMLDivElement>(null);
    const innerRingRef = useRef<HTMLDivElement>(null);

    const lastMouseX = useRef(0);

    useEffect(() => {
        const cursor = cursorRef.current;
        const container = containerRef.current;
        const glow = glowRef.current;
        const outerRing = outerRingRef.current;
        const innerRing = innerRingRef.current;

        gsap.set(cursor, { xPercent: -10, yPercent: -10, opacity: 0 });
        gsap.set(glow, { opacity: 0, scale: 1 });

        // Continuous Orbit Animations
        gsap.to(outerRing, { rotation: 360, duration: 10, repeat: -1, ease: "none" });
        gsap.to(innerRing, { rotation: -360, duration: 6, repeat: -1, ease: "none" });

        const pulseAnim = gsap.to(glow, {
            scale: 1.5,
            opacity: 0.6,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            paused: true
        });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3.out" });

        // 🛠️ EDIT: Increased duration slightly so the tilt feels more floaty and natural as it returns to center.
        const rotateTo = gsap.quickTo(cursor, "rotation", { duration: 0.6, ease: "power2.out" });

        let isVisible = false;
        let isHovering = false; // Track this so we know what size to return to after a click

        const moveCursor = (e: MouseEvent) => {
            const deltaX = e.clientX - lastMouseX.current;
            lastMouseX.current = e.clientX;

            // 🛠️ EDIT (TILT LOGIC): 
            // Multiplier (2.5): Increases how drastically it tilts based on speed.
            // Clamps (-35, 35): The maximum degrees it can tilt left or right. 
            const tilt = Math.min(Math.max(deltaX * 2.5, -35), 35);

            xTo(e.clientX);
            yTo(e.clientY);
            rotateTo(tilt); // Applies the left/right tilt

            if (!isVisible) {
                isVisible = true;
                gsap.to(cursor, { opacity: 1, duration: 0.3 });
            }
        };

        const handleMouseEnter = () => {
            isVisible = true;
            gsap.to(cursor, { opacity: 1, duration: 0.3 });
        };

        const handleMouseLeave = () => {
            isVisible = false;
            gsap.to(cursor, { opacity: 0, duration: 0.3 });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer';

            if (isInteractive) {
                isHovering = true;
                gsap.to(container, { scale: 1.4, duration: 0.3, ease: "back.out(1.7)" });
                gsap.to(outerRing, { scale: 1.1, duration: 0.3 });
                gsap.set(glow, { opacity: 0.3 });
                pulseAnim.play();
            } else {
                isHovering = false;
                gsap.to(container, { scale: 1, duration: 0.3, ease: "power2.out" });
                gsap.to(outerRing, { scale: 1, duration: 0.3 });
                pulseAnim.pause();
                gsap.to(glow, { opacity: 0, scale: 1, duration: 0.3 });
            }
        };

        // --- NEW CLICK LOGIC ---
        const handleMouseDown = () => {
            // 🛠️ EDIT: If hovering over a link, scale up to 1.7. Otherwise, scale up to 1.3.
            // A short duration (0.1) makes it feel punchy and responsive.
            gsap.to(container, {
                scale: isHovering ? 1.7 : 1.3,
                duration: 0.1,
                ease: "power2.out"
            });
        };

        const handleMouseUp = () => {
            // 🛠️ EDIT: Return to the correct scale depending on whether we are over a link (1.4) or normal ground (1).
            gsap.to(container, {
                scale: isHovering ? 1.4 : 1,
                duration: 0.4,
                ease: "back.out(2)"
            });
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mouseover", handleMouseOver);
            pulseAnim.kill();
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[1000] hidden md:block"
        >
            <div ref={containerRef} className="relative group origin-center">
                <img
                    src="/cursour/Astronaut1.png"
                    alt="Astronaut Cursor"
                    className="w-34 h-34 object-contain filter drop-shadow-[0_0_15px_rgba(242,124,6,1)]"
                />

                <div ref={glowRef} className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
                <div ref={outerRingRef} className="absolute -inset-4 border border-primary/30 rounded-full" />
                <div ref={innerRingRef} className="absolute -inset-2 border border-primary/10 rounded-full border-dashed" />
            </div>
        </div>
    );
};

export default AstronautCursor;