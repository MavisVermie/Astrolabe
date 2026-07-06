import { useEffect, useRef, type MouseEvent } from "react";
import { ArrowRight, Star } from "lucide-react";
import Starfield from "./Starfield";
import { NorthStar, Orbit } from "./SpaceDecor";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  // Scroll parallax: content drifts up slower than the page, video zooms subtly.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > window.innerHeight * 1.2) return;
        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${y * 0.22}px)`;
          contentRef.current.style.opacity = `${Math.max(0, 1 - y / (window.innerHeight * 0.9))}`;
        }
        if (videoWrapRef.current) {
          videoWrapRef.current.style.transform = `scale(${1 + y * 0.00012})`;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Mouse parallax: the night sky leans gently toward the cursor.
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const sky = skyRef.current;
    if (!sky) return;
    const px = e.clientX / window.innerWidth - 0.5;
    const py = e.clientY / window.innerHeight - 0.5;
    sky.style.transform = `translate(${px * -18}px, ${py * -12}px)`;
  };

  return (
    <section
      id="top"
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen items-end overflow-hidden"
    >
      {/* Background video */}
      <div ref={videoWrapRef} className="absolute inset-0 will-change-transform">
        <video
          className="h-full w-full object-cover"
          src="/hero/coffee-splash.mp4"
          poster="/hero/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      </div>

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1F21]/70 via-[#173134]/30 to-[#0D1F21]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(13,31,33,0.65)_100%)]" />

      {/* Night sky (mouse-reactive) */}
      <div ref={skyRef} className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform">
        <Starfield count={140} shooting />
        <Orbit className="right-[6%] top-[12%] hidden opacity-70 lg:block" size={300} />
        <NorthStar className="right-[22%] top-[50%] hidden opacity-80 xl:block" size={120} />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 will-change-transform sm:pb-28 lg:px-10"
      >
        <div className="max-w-3xl">
          <div className="animate-fade-up delay-100 mb-7 inline-flex items-center gap-2.5 rounded-full liquid-glass px-4 py-2">
            <Star className="h-3.5 w-3.5 fill-[#CF9E58] text-[#CF9E58]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#CFBD8D]/90">
              Est. under the night sky
            </span>
          </div>

          <h1 className="animate-fade-up delay-300 font-display text-5xl font-medium leading-[1.05] text-[#F4EBD6] sm:text-6xl lg:text-7xl">
            Where Coffee
            <br />
            Meets <span className="text-shimmer italic">the Stars</span>
          </h1>

          <p className="animate-fade-up delay-500 mt-7 max-w-xl text-lg font-light leading-relaxed text-[#CFBD8D]/85 sm:text-xl">
            A cinematic café experience crafted with warmth, elegance, and a
            little wonder.
          </p>

          <div className="animate-fade-up delay-700 mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#/shop"
              className="btn-shine group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#CF9E58] px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-[#173134] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#CFBD8D] hover:shadow-[0_12px_40px_rgba(207,158,88,0.45)]"
            >
              Order Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="animate-fade-in delay-900 absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 sm:block">
        <div className="animate-drift flex h-12 w-7 items-start justify-center rounded-full border border-[#CFBD8D]/30 p-2">
          <div className="h-2.5 w-1 rounded-full bg-[#CF9E58]" />
        </div>
      </div>
    </section>
  );
}
