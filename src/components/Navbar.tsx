import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { SunburstMark } from "@/components/brand/SunburstMark";
import { Wordmark } from "@/components/brand/Wordmark";
import { Asterisk } from "@/components/brand/Asterisk";
import { NAV } from "@/config/site";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About", hasDropdown: true },
  { to: "/admissions", label: "Admissions", hasDropdown: true },
  { to: "/gallery", label: "Gallery" },
  { to: "/organizations", label: "Organizations", hasDropdown: true },
  { to: "/calendar", label: "Calendar" },
];

export function Navbar({ progress }: { progress?: number }) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when overlay menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-foreground/10 bg-background/95 backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_24px_0_rgba(61,40,23,0.06)]">
        <div className="mx-auto flex h-20 max-w-[95vw] items-center justify-between px-3 sm:px-6">
          {/* Left Corner: Brand Logo & Wordmark */}
          <Link
            to="/"
            data-nav-logo
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
          >
            <div data-nav-logo-mark className="h-10 w-10 shrink-0 flex items-center justify-center sm:h-12 sm:w-12 md:h-14 md:w-14 transition-transform group-hover:scale-105">
              <SunburstMark className="h-full w-full object-contain" />
            </div>
            <Wordmark className="text-[14px] sm:text-[17px] md:text-[20px] lg:text-[22px]" />
          </Link>

          {/* Right Corner: Mobile Hamburger Menu OR Desktop Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeProps={{ className: "bg-primary/10 text-primary font-bold shadow-xs border border-primary/20" }}
                  inactiveProps={{ className: "text-foreground/80 hover:text-primary hover:bg-foreground/5 font-semibold" }}
                  className="relative rounded-full px-3.5 py-1.5 text-xs lg:text-sm tracking-wide transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>



            {/* Mobile Hamburger Menu Toggle Button (Right corner on mobile < md) */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-bold text-[#3D2817] transition-all hover:bg-foreground/10 active:scale-95 group"
              aria-label="Open menu"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span className="h-[2px] w-full bg-[#3D2817] transition-all group-hover:bg-[#B5342E]" />
                <span className="h-[2px] w-3/4 bg-[#3D2817] transition-all group-hover:w-full group-hover:bg-[#B5342E]" />
              </div>
              <span className="text-xs font-bold tracking-wide">{NAV.menuLabel || "Menu"}</span>
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        {progress !== undefined && (
          <div
            className="h-[2px] origin-left bg-secondary transition-none"
            style={{ transform: `scaleX(${Math.min(Math.max(progress, 0), 1)})` }}
          />
        )}
      </header>

      {/* Fullscreen Mobile Overlay Menu */}
      <div
        style={{
          clipPath: isOpen ? "circle(150% at 5% 5%)" : "circle(0% at 5% 5%)",
          transition: "clip-path 650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease",
        }}
        className={`fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[#FBF6EE] text-[#3D2817] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Animated Wavy Line SVG */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M -100 180 C 250 20, 480 30, 750 320 C 1020 580, 1280 120, 1600 -30"
            stroke="#9E6E45"
            strokeWidth="1.75"
            strokeDasharray="2400"
            style={{
              strokeDashoffset: isOpen ? "0" : "2400",
              transition: "stroke-dashoffset 1300ms cubic-bezier(0.22, 1, 0.36, 1) 200ms",
            }}
          />
        </svg>

        {/* Top Header inside Overlay with Logo on Left & Close Button on Right */}
        <div className="relative z-20 flex h-20 w-full items-center justify-between px-6 pt-4 sm:px-12 sm:pt-6">
          {/* School Logo Emblem inside Overlay (Left) */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            style={{
              transform: isOpen ? "scale(1)" : "scale(0.9)",
              opacity: isOpen ? 1 : 0,
              transition: "transform 400ms ease 200ms, opacity 400ms ease 200ms",
            }}
            className="flex items-center gap-2.5 sm:gap-3 group"
          >
            <div className="h-12 w-12 shrink-0 flex items-center justify-center sm:h-14 sm:w-14 transition-transform group-hover:scale-105">
              <SunburstMark className="h-full w-full object-contain" />
            </div>
            <Wordmark className="text-[18px] sm:text-[22px]" />
          </Link>

          {/* Close Button (Right) */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              transform: isOpen ? "translateX(0)" : "translateX(20px)",
              opacity: isOpen ? 1 : 0,
              transition: "transform 400ms ease 150ms, opacity 400ms ease 150ms",
            }}
            className="inline-flex items-center gap-2 text-[#3D2817] hover:text-[#B5342E] transition-colors group"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 stroke-[1.5] transition-transform group-hover:rotate-90 group-hover:scale-110 duration-300" />
            <span className="text-sm font-semibold tracking-wide">Close</span>
          </button>
        </div>

        {/* Main Overlay Content Area */}
        <div className="relative z-20 mx-auto my-auto w-full max-w-4xl px-8 py-6 sm:px-16">
          {/* Title Header with Animated Red Asterisk */}
          <div
            style={{
              transform: isOpen ? "translateY(0)" : "translateY(30px)",
              opacity: isOpen ? 1 : 0,
              transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 200ms, opacity 500ms ease 200ms",
            }}
            className="flex items-center gap-3 mb-8 sm:mb-12"
          >
            <div
              style={{
                transform: isOpen ? "rotate(0deg) scale(1)" : "rotate(-180deg) scale(0)",
                transition: "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 250ms",
              }}
            >
              <Asterisk className="h-8 w-8 text-[#B5342E] shrink-0" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#3D2817]">
              Contents
            </h2>
          </div>

          {/* Navigation Links List */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {navItems.map((item, idx) => {
              const delayMs = 280 + idx * 60;
              return (
                <div
                  key={item.to}
                  style={{
                    transform: isOpen ? "translateY(0)" : "translateY(24px)",
                    opacity: isOpen ? 1 : 0,
                    transition: `transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, opacity 400ms ease ${delayMs}ms`,
                  }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 group text-left py-1"
                  >
                    <span className="font-display text-2xl sm:text-3xl font-bold text-[#3D2817] group-hover:text-[#B5342E] transition-colors relative">
                      {item.label}
                      <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#B5342E] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>


        </div>

        {/* Bottom Book Graphic */}
        <div
          style={{
            transform: isOpen ? "scale(1) translateY(0)" : "scale(0.8) translateY(20px)",
            opacity: isOpen ? 1 : 0,
            transition: "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 400ms, opacity 500ms ease 400ms",
          }}
          className="pointer-events-none absolute right-4 bottom-4 sm:right-10 sm:bottom-6 z-20 opacity-40 sm:opacity-100"
        >
          <svg
            width="180"
            height="140"
            viewBox="0 0 220 180"
            fill="none"
            className="w-32 h-28 sm:w-44 sm:h-36 object-contain"
          >
            <path
              d="M 28 32 L 31 42 L 41 45 L 31 48 L 28 58 L 25 48 L 15 45 L 25 42 Z"
              fill="#E07A28"
            />
            <path
              d="M 198 52 L 200 60 L 208 62 L 200 64 L 198 72 L 196 64 L 188 62 L 196 60 Z"
              fill="#E07A28"
            />
            <g stroke="#3D2817" strokeWidth="2.5" strokeLinecap="round">
              <line x1="110" y1="125" x2="30" y2="125" />
              <line x1="110" y1="125" x2="42" y2="98" />
              <line x1="110" y1="125" x2="60" y2="76" />
              <line x1="110" y1="125" x2="82" y2="60" />
              <line x1="110" y1="125" x2="110" y2="52" />
              <line x1="110" y1="125" x2="138" y2="60" />
              <line x1="110" y1="125" x2="160" y2="76" />
              <line x1="110" y1="125" x2="178" y2="98" />
              <line x1="110" y1="125" x2="190" y2="125" />
            </g>
            <path
              d="M 25 138 C 70 148, 110 135, 110 135 C 110 135, 150 148, 195 138 L 190 162 C 145 174, 110 156, 110 156 C 110 156, 75 174, 30 162 Z"
              fill="#E58529"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
