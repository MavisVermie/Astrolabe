import Starfield from "./Starfield";
import Reveal from "./Reveal";
import Constellation from "./Constellation";
import { Orbit } from "./SpaceDecor";
import CountUp from "./CountUp";

const STATS = [
  { to: 12, suffix: "", label: "Single Origins" },
  { to: 48, suffix: "", label: "Signature Drinks" },
  { to: 400, suffix: "+", label: "Cups a Night" },
];

export default function Story() {
  return (
    <section id="story" className="relative bg-[#173134] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CFBD8D]/25 to-transparent" />
      <Starfield count={95} shooting />
      <Orbit className="left-1/2 top-6 -translate-x-1/2 opacity-60" size={340} reverse />
      <Constellation className="left-[6%] top-1/2 hidden w-64 -translate-y-1/2 opacity-70 lg:block" />
      <Constellation className="right-[5%] top-1/2 hidden w-52 -translate-y-1/2 scale-x-[-1] opacity-50 lg:block" />

      <Reveal className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
        {/* Emblem inside slowly rotating astrolabe rings */}
        <div className="relative mx-auto h-28 w-28">
          <div className="astro-ring absolute inset-0 rounded-full border border-dashed border-[#CFBD8D]/35" />
          <div className="astro-ring-reverse absolute -inset-3 rounded-full border border-dotted border-[#CF9E58]/25" />
          <img
            src="/brand/logo-mark.png"
            alt=""
            aria-hidden="true"
            className="animate-drift absolute inset-0 m-auto h-16 w-16 opacity-90"
          />
        </div>

        <p className="font-display mt-10 text-2xl font-normal italic leading-relaxed text-[#F4EBD6]/90 sm:text-3xl">
          “Before maps, sailors read the stars. Before mornings, we read the
          bean. Astrolabe was born of both — an instrument for finding your way
          to something warm.”
        </p>
        <p className="mt-8 text-xs uppercase tracking-[0.4em] text-[#CF9E58]">
          Our Story
        </p>

        {/* Counting stats */}
        <div className="mt-14 grid grid-cols-3 gap-4 sm:gap-8">
          {STATS.map(({ to, suffix, label }) => (
            <div key={label} className="group">
              <p className="font-display text-shimmer text-4xl font-semibold sm:text-5xl">
                <CountUp to={to} suffix={suffix} />
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-[#CFBD8D]/60 transition-colors duration-300 group-hover:text-[#CFBD8D] sm:text-xs">
                {label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
