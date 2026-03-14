import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useLenis } from "@/lib/Lenis";
import { useScrollEngine } from "@/lib/scroll-engine-context";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import SocialIcons from "./HeroSection/SocialIcons";

// register gsap plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

const SCROLL_DIR_THRESHOLD = 5;
const NAV_HIDE_OFFSET = 100;

export default function NavigationMenu() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollEngine = useScrollEngine();
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const lenis = useLenis();
  const lastScrollY = useRef(0);
  const navHidden = useRef(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // scroll-direction-aware nav visibility
  const updateNavVisibility = useCallback(() => {
    if (isMenuOpen) return;

    const currentY = window.scrollY || document.documentElement.scrollTop;
    const delta = currentY - lastScrollY.current;

    // always show at top of page
    if (currentY < NAV_HIDE_OFFSET) {
      if (navHidden.current) {
        navHidden.current = false;
        gsap.to(headerRef.current, {
          yPercent: 0,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });
      }
      lastScrollY.current = currentY;
      return;
    }

    // scrolling down — hide nav
    if (delta > SCROLL_DIR_THRESHOLD && !navHidden.current) {
      navHidden.current = true;
      gsap.to(headerRef.current, {
        yPercent: -110,
        duration: 0.35,
        ease: "power2.in",
        overwrite: true,
      });
    }

    // scrolling up — show nav
    if (delta < -SCROLL_DIR_THRESHOLD && navHidden.current) {
      navHidden.current = false;
      gsap.to(headerRef.current, {
        yPercent: 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    }

    lastScrollY.current = currentY;
  }, [isMenuOpen]);

  useEffect(() => {
    window.addEventListener("scroll", updateNavVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateNavVisibility);
  }, [updateNavVisibility]);

  // force-show nav when menu is open
  useEffect(() => {
    if (isMenuOpen && navHidden.current) {
      navHidden.current = false;
      gsap.to(headerRef.current, {
        yPercent: 0,
        duration: 0.25,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, [isMenuOpen]);

  // initial setup and hover effects
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch {
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      const menuItems = containerRef.current!.querySelectorAll(
        ".menu-list-item[data-shape]",
      );
      const shapesContainer = containerRef.current!.querySelector(
        ".ambient-background-shapes",
      );

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer?.querySelector(`.bg-shape-${shapeIndex}`);
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          shapesContainer
            ?.querySelectorAll(".bg-shape")
            .forEach((s) => s.classList.remove("active"));
          shape.classList.add("active");
          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.7)",
              overwrite: "auto",
            },
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto",
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        (item as any)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(
          ".menu-list-item[data-shape]",
        );
        items.forEach((item: any) => item._cleanup?.());
      }
    };
  }, []);

  // set initial hidden states via gsap
  useEffect(() => {
    if (!containerRef.current) return;
    const overlay = containerRef.current.querySelector(".overlay");
    const menu = containerRef.current.querySelector(".menu-content");
    const bgPanels = containerRef.current.querySelectorAll(".backdrop-layer");
    const menuLinks = containerRef.current.querySelectorAll(".nav-link");
    const fadeTargets =
      containerRef.current.querySelectorAll("[data-menu-fade]");

    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(menu, { xPercent: 120 });
    gsap.set(bgPanels, { xPercent: 101 });
    gsap.set(menuLinks, { yPercent: 140, rotate: 10 });
    gsap.set(fadeTargets, { autoAlpha: 0, yPercent: 50 });
  }, []);

  // menu open/close animation
  useEffect(() => {
    if (!containerRef.current) return;

    // kill any running timeline
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    if (isMenuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }

    const navWrap = containerRef.current.querySelector(".nav-overlay-wrapper");
    const menu = containerRef.current.querySelector(".menu-content");
    const overlay = containerRef.current.querySelector(".overlay");
    const bgPanels = containerRef.current.querySelectorAll(".backdrop-layer");
    const menuLinks = containerRef.current.querySelectorAll(".nav-link");
    const fadeTargets =
      containerRef.current.querySelectorAll("[data-menu-fade]");
    const menuButtonIcon =
      containerRef.current.querySelector(".menu-button-icon");

    const tl = gsap.timeline();
    tlRef.current = tl;

    if (isMenuOpen) {
      // open animation
      if (navWrap) navWrap.setAttribute("data-nav", "open");

      tl
        // show wrapper, keep menu off-screen initially
        .set(navWrap, { display: "block" })
        // animate button icon
        .to(menuButtonIcon, { rotate: 315, duration: 0.4 })
        // fade in the blur overlay
        .to(overlay, { autoAlpha: 1, duration: 0.4 }, "<")
        // slide backdrop panels in from right (staggered)
        .fromTo(
          bgPanels,
          { xPercent: 101 },
          { xPercent: 0, stagger: 0.1, duration: 0.5 },
          "<",
        )
        // slide menu panel in simultaneously with last backdrop
        .to(menu, { xPercent: 0, duration: 0.5, ease: "power3.out" }, "<+=0.15")
        // reveal links with staggered slide-up
        .fromTo(
          menuLinks,
          { yPercent: 140, rotate: 10 },
          {
            yPercent: 0,
            rotate: 0,
            stagger: 0.04,
            duration: 0.5,
            ease: "power3.out",
          },
          "<+=0.2",
        )
        // fade in extra elements
        .fromTo(
          fadeTargets,
          { autoAlpha: 0, yPercent: 50 },
          {
            autoAlpha: 1,
            yPercent: 0,
            stagger: 0.03,
            duration: 0.4,
            clearProps: "all",
          },
          "<+=0.1",
        );
    } else {
      // close animation
      if (navWrap) navWrap.setAttribute("data-nav", "closed");

      tl
        // hide links first
        .to(menuLinks, {
          yPercent: -60,
          autoAlpha: 0,
          stagger: 0.02,
          duration: 0.25,
          ease: "power2.in",
        })
        // hide fade targets
        .to(
          fadeTargets,
          { autoAlpha: 0, yPercent: -30, duration: 0.2, ease: "power2.in" },
          "<",
        )
        // slide menu panel and backdrops out
        .to(menu, { xPercent: 120, duration: 0.4, ease: "power3.in" }, "<+=0.1")
        .to(
          bgPanels,
          { xPercent: 101, stagger: 0.05, duration: 0.35, ease: "power2.in" },
          "<",
        )
        // fade out overlay
        .to(overlay, { autoAlpha: 0, duration: 0.3 }, "<+=0.1")
        // rotate icon back
        .to(menuButtonIcon, { rotate: 0, duration: 0.3 }, "<")
        // hide wrapper at end
        .set(navWrap, { display: "none" })
        // reset link transforms for next open
        .set(menuLinks, { yPercent: 140, rotate: 10, autoAlpha: 1 })
        .set(fadeTargets, { autoAlpha: 0, yPercent: 50 });
    }

    return () => {
      lenis?.start();
    };
  }, [isMenuOpen, lenis]);

  // escape key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // smooth scroll to section via engine (bypasses scroll guards)
  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Handle auth route
    if (id === '/auth') {
      setTimeout(() => {
        navigate({ to: '/auth' });
      }, 600);
      return;
    }

    // Handle logout
    if (id === 'logout') {
      logout();
      return;
    }

    // strip leading # to get section id
    const sectionId = id.startsWith("#") ? id.slice(1) : window.location.pathname + id;

    // delay scroll until close animation finishes
    setTimeout(() => {
      if (scrollEngine) {
        scrollEngine.navigateToSection(sectionId, 1.5);
      } else if (lenis) {
        lenis.scrollTo(id, { duration: 1.5, lock: true });
      } else {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }, 600);
  };

  const navItems = [
    { id: "hero", label: "Home", shape: "3" },
    { id: "#mission-logs", label: "Mission Logs", shape: "2" },
    { id: "#rewards", label: "Rewards", shape: "3" },
    { id: "#timeline", label: "Timeline", shape: "4" },
    { id: "#guidelines", label: "Guidelines", shape: "5" },
    { id: "#faqs", label: "FAQs", shape: "2" },
    { id: "#about", label: "About", shape: "1" },
    ...(isAuthenticated ? [
      { id: "logout", label: `Logout (${user?.name})`, shape: "1" }
    ] : [
      { id: "/auth", label: "Login", shape: "1" }
    ])
  ];

  return (
    <div ref={containerRef} className="kinetic-nav-root z-999">
      <div ref={headerRef} className="site-header-wrapper">
        <header className="header">
          <div className="container is--full">
            <nav className="nav-row">
              <a
                href="#home"
                aria-label="home"
                className="nav-logo-row w-inline-block"
                onClick={(e) => handleNavClick("#home", e)}
              ></a>
              <div className="nav-row__right">
                {/* toggle button only, no "Menu" text */}
                <button
                  role="button"
                  className="nav-close-btn"
                  onClick={toggleMenu}
                >
                  <div className="icon-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="menu-button-icon"
                    >
                      <path
                        d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                        fill="currentColor"
                      />
                      <path
                        d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <section className="fullscreen-menu-container z-999">
        <div data-nav="closed" className="nav-overlay-wrapper">
          <div className="overlay" onClick={closeMenu}></div>
          <nav className="menu-content">
            <div className="menu-bg">
              <div className="backdrop-layer first"></div>
              <div className="backdrop-layer second"></div>
              <div className="backdrop-layer"></div>

              <div className="ambient-background-shapes">
                <svg
                  className="bg-shape bg-shape-1"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <circle
                    className="shape-element"
                    cx="80"
                    cy="120"
                    r="40"
                    fill="rgba(242,124,6,0.15)"
                  />
                  <circle
                    className="shape-element"
                    cx="300"
                    cy="80"
                    r="60"
                    fill="rgba(242,124,6,0.12)"
                  />
                  <circle
                    className="shape-element"
                    cx="200"
                    cy="300"
                    r="80"
                    fill="rgba(242,124,6,0.1)"
                  />
                  <circle
                    className="shape-element"
                    cx="350"
                    cy="280"
                    r="30"
                    fill="rgba(242,124,6,0.15)"
                  />
                </svg>

                <svg
                  className="bg-shape bg-shape-2"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <path
                    className="shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke="rgba(242,124,6,0.2)"
                    strokeWidth="60"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke="rgba(242,124,6,0.15)"
                    strokeWidth="40"
                    fill="none"
                  />
                </svg>

                <svg
                  className="bg-shape bg-shape-3"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <circle
                    className="shape-element"
                    cx="50"
                    cy="50"
                    r="8"
                    fill="rgba(242,124,6,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="150"
                    cy="50"
                    r="8"
                    fill="rgba(242,124,6,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="250"
                    cy="50"
                    r="8"
                    fill="rgba(242,124,6,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="350"
                    cy="50"
                    r="8"
                    fill="rgba(242,124,6,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="100"
                    cy="150"
                    r="12"
                    fill="rgba(242,124,6,0.25)"
                  />
                  <circle
                    className="shape-element"
                    cx="200"
                    cy="150"
                    r="12"
                    fill="rgba(242,124,6,0.25)"
                  />
                  <circle
                    className="shape-element"
                    cx="300"
                    cy="150"
                    r="12"
                    fill="rgba(242,124,6,0.25)"
                  />
                  <circle
                    className="shape-element"
                    cx="50"
                    cy="250"
                    r="10"
                    fill="rgba(242,124,6,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="150"
                    cy="250"
                    r="10"
                    fill="rgba(242,124,6,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="250"
                    cy="250"
                    r="10"
                    fill="rgba(242,124,6,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="350"
                    cy="250"
                    r="10"
                    fill="rgba(242,124,6,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="100"
                    cy="350"
                    r="6"
                    fill="rgba(242,124,6,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="200"
                    cy="350"
                    r="6"
                    fill="rgba(242,124,6,0.3)"
                  />
                  <circle
                    className="shape-element"
                    cx="300"
                    cy="350"
                    r="6"
                    fill="rgba(242,124,6,0.3)"
                  />
                </svg>

                <svg
                  className="bg-shape bg-shape-4"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <path
                    className="shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(242,124,6,0.12)"
                  />
                  <path
                    className="shape-element"
                    d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                    fill="rgba(242,124,6,0.1)"
                  />
                </svg>

                <svg
                  className="bg-shape bg-shape-5"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <line
                    className="shape-element"
                    x1="0"
                    y1="100"
                    x2="300"
                    y2="400"
                    stroke="rgba(242,124,6,0.15)"
                    strokeWidth="30"
                  />
                  <line
                    className="shape-element"
                    x1="100"
                    y1="0"
                    x2="400"
                    y2="300"
                    stroke="rgba(242,124,6,0.12)"
                    strokeWidth="25"
                  />
                  <line
                    className="shape-element"
                    x1="200"
                    y1="0"
                    x2="400"
                    y2="200"
                    stroke="rgba(242,124,6,0.1)"
                    strokeWidth="20"
                  />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <ul className="menu-list">
                {navItems.map((item, i) => (
                  <li
                    key={i}
                    className="menu-list-item"
                    data-shape={item.shape}
                  >
                    <a
                      href={item.id}
                      className="nav-link w-inline-block"
                      onClick={(e) => handleNavClick(item.id, e)}
                    >
                      <p className="nav-link-text" data-menu-fade>
                        {item.label}
                      </p>
                      <div className="nav-link-hover-bg"></div>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="lg:hidden mt-20 mr-8 " data-menu-fade>
                <SocialIcons isMobileNav={true} />
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
