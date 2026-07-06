import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Compass, Star } from "lucide-react";
import Starfield from "./Starfield";
import Reveal from "./Reveal";
import { Moon } from "./SpaceDecor";

type Branch = { name: string; src: string };

const BRANCHES: Branch[] = [
  { name: "Taj Mall", src: "/branches/taj-mall.webp" },
  { name: "HTU", src: "/branches/htu.webp" },
  { name: "Icon 7", src: "/branches/icon-7.webp" },
  { name: "Astrolabe The Roastery", src: "/branches/roastery.webp" },
  { name: "Astrolabe Coffee BMW", src: "/branches/bmw.webp" },
  { name: "Astrolabe Coffee ASU", src: "/branches/asu.webp" },
  { name: "Tabarbour", src: "/branches/tabarbour.webp" },
  { name: "Irbid", src: "/branches/irbid.webp" },
  { name: "Alnakheel", src: "/branches/alnakheel.webp" },
  { name: "Zarqa", src: "/branches/zarqa.webp" },
  { name: "Quattro Village", src: "/branches/quattro-village.webp" },
  { name: "Petra University", src: "/branches/petra-university.webp" },
  { name: "Abdali Mall", src: "/branches/abdali-mall.webp" },
  { name: "Downtown", src: "/branches/downtown.webp" },
  { name: "Khalda", src: "/branches/khalda.webp" },
];

function BranchCard({
  branch,
  onOpen,
  hidden = false,
}: {
  branch: Branch;
  onOpen: () => void;
  hidden?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden || undefined}
      aria-label={`View branch: ${branch.name}`}
      className="group relative mx-3 block w-72 shrink-0 overflow-hidden rounded-3xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#CF9E58] sm:w-80"
    >
      <img
        src={branch.src}
        alt={branch.name}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1F21]/85 via-[#0D1F21]/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
        <span className="flex items-center gap-2 text-sm tracking-wide text-[#F4EBD6]">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#CF9E58]" />
          {branch.name}
        </span>
        <span className="liquid-glass flex h-8 w-8 items-center justify-center rounded-full text-[#CF9E58] opacity-0 transition-all duration-500 group-hover:opacity-100">
          +
        </span>
      </div>
      {/* gold ring on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-colors duration-500 group-hover:border-[#CF9E58]/40" />
    </button>
  );
}

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const step = useCallback((dir: 1 | -1) => {
    setActive((cur) =>
      cur === null ? cur : (cur + dir + BRANCHES.length) % BRANCHES.length
    );
  }, []);

  // Keyboard controls + scroll lock while the lightbox is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, step]);

  return (
    <section id="branches" className="relative overflow-hidden bg-[#0D1F21] py-28 sm:py-36">
      <Starfield count={90} />
      <Moon className="left-[6%] top-24 hidden lg:block" size={84} />
      <div className="aurora pointer-events-none absolute bottom-0 right-[10%] h-72 w-[36rem] rounded-full bg-[#793635]/10 blur-3xl" />

      <div className="relative">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#CF9E58]">
            Our Branches
          </p>
          <h2 className="font-display mt-5 text-4xl font-medium text-[#F4EBD6] sm:text-5xl">
            Moments in <span className="text-shimmer italic">gold</span> &amp; teal
          </h2>
          <p className="mt-5 text-sm font-light text-[#CFBD8D]/70">
            Fifteen constellations across the city — find the one above you.
          </p>
        </Reveal>

        {/* Auto-moving branch slider (pauses on hover) */}
        <Reveal delay={150} className="relative mt-16 sm:mt-20">
          <div className="branches-slider relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0D1F21] to-transparent sm:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0D1F21] to-transparent sm:w-32" />
            <div className="branches-track flex w-max py-2">
              {BRANCHES.map((b, i) => (
                <BranchCard key={b.name} branch={b} onOpen={() => setActive(i)} />
              ))}
              {BRANCHES.map((b, i) => (
                <BranchCard
                  key={`${b.name}-dup`}
                  branch={b}
                  onOpen={() => setActive(i)}
                  hidden
                />
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-[#CFBD8D]/40">
            Hover to pause · click a branch to view
          </p>
        </Reveal>

        {/* Visit band */}
        <Reveal delay={150} className="mx-auto mt-20 max-w-5xl px-6 sm:mt-24 lg:px-10">
          <div
            id="visit"
            className="liquid-glass scroll-mt-32 rounded-3xl px-8 py-12 text-center sm:px-14"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-[#CF9E58]">
              Visit Us
            </p>
            <h3 className="font-display mt-4 text-3xl font-medium text-[#F4EBD6] sm:text-4xl">
              Your table under <span className="text-shimmer italic">the stars</span>
            </h3>
            <p className="mx-auto mt-5 flex max-w-xl items-center justify-center gap-2 text-sm font-light text-[#CFBD8D]/80">
              <MapPin className="h-4 w-4 shrink-0 text-[#CF9E58]" />
              Fifteen branches across Jordan · Open daily 7am — midnight
            </p>
            {/* Flying "Visit Us Now" container */}
            <div className="relative mx-auto mt-10 w-fit">
              <div className="levitate liquid-glass flex items-center gap-3.5 rounded-full px-9 py-4 shadow-[0_18px_50px_-12px_rgba(207,158,88,0.35)]">
                <Compass className="astro-ring h-5 w-5 text-[#CF9E58]" strokeWidth={1.5} />
                <span className="text-shimmer text-sm font-medium uppercase tracking-[0.24em]">
                  Visit Us Now
                </span>
                <Star className="h-3.5 w-3.5 fill-[#CF9E58] text-[#CF9E58]" />
              </div>
              <div className="levitate-shadow mx-auto mt-4 h-2 w-36 rounded-full bg-black/60 blur-md" />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={BRANCHES[active].name}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0D1F21]/90 p-4 backdrop-blur-md sm:p-10"
          onClick={() => setActive(null)}
        >
          <div
            className="animate-fade-up relative max-h-full w-full max-w-4xl"
            style={{ animationDuration: "0.45s" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={BRANCHES[active].src}
              alt={BRANCHES[active].name}
              className="max-h-[74vh] w-full rounded-2xl object-cover shadow-[0_40px_120px_-24px_rgba(0,0,0,0.9)]"
            />
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm font-light tracking-wide text-[#CFBD8D]/90">
              <MapPin className="h-4 w-4 text-[#CF9E58]" />
              {BRANCHES[active].name}
              <span className="text-[#CFBD8D]/40">
                · {active + 1} / {BRANCHES.length}
              </span>
            </p>

            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="liquid-glass absolute -right-3 -top-3 flex h-11 w-11 items-center justify-center rounded-full text-[#CFBD8D] transition-all duration-300 hover:rotate-90 hover:text-[#CF9E58]"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous branch"
              className="liquid-glass absolute -left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-[#CFBD8D] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1/2 hover:text-[#CF9E58] sm:-left-14"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next branch"
              className="liquid-glass absolute -right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-[#CFBD8D] transition-all duration-300 hover:-translate-y-1/2 hover:translate-x-1 hover:text-[#CF9E58] sm:-right-14"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
