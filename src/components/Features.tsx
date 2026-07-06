import { Coffee, Croissant, Armchair } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Starfield from "./Starfield";
import Reveal from "./Reveal";
import Constellation from "./Constellation";
import { NorthStar } from "./SpaceDecor";
import TiltCard from "./TiltCard";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: Coffee,
    title: "Specialty Coffee",
    description:
      "Single-origin beans, roasted in-house and poured with the precision of a navigator charting the night sky.",
  },
  {
    icon: Croissant,
    title: "Fresh Pastries",
    description:
      "Laminated doughs and delicate viennoiserie, baked each dawn and gone by dusk — golden, warm, unhurried.",
  },
  {
    icon: Armchair,
    title: "Cozy Atmosphere",
    description:
      "Low brass light, deep velvet seats, and quiet corners made for long conversations and slow evenings.",
  },
];

export default function Features() {
  return (
    <section id="menu" className="relative bg-[#0D1F21] py-28 sm:py-36">
      {/* soft gold ambience */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CF9E58]/40 to-transparent" />
      <div className="aurora pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-[#CF9E58]/5 blur-3xl" />
      <Starfield count={90} />
      <Constellation className="right-[4%] top-16 hidden w-52 opacity-45 xl:block" />
      <NorthStar className="left-[3%] bottom-16 hidden opacity-70 lg:block" size={130} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#CF9E58]">
            The Astrolabe Ritual
          </p>
          <h2 className="font-display mt-5 text-4xl font-medium text-[#F4EBD6] sm:text-5xl">
            Crafted to be <span className="text-shimmer italic">savoured</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:mt-20 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 140}>
              <TiltCard className="h-full">
                <article className="liquid-glass group relative h-full rounded-3xl p-8 transition-shadow duration-500 hover:shadow-[0_24px_60px_-20px_rgba(207,158,88,0.35)] sm:p-10">
                  {/* cursor-following glow */}
                  <div className="tilt-glow absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#173134] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#793635]/60">
                      <Icon className="h-6 w-6 text-[#CF9E58]" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display mt-7 text-2xl font-semibold text-[#F4EBD6]">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-[#CFBD8D]/75">
                      {description}
                    </p>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
