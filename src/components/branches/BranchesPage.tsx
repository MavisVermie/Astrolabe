import { useMemo, useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Cigarette,
  CigaretteOff,
  Car,
  Croissant,
  Users,
  Sparkles,
  Compass,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Starfield from "../Starfield";
import Reveal from "../Reveal";
import TiltCard from "../TiltCard";
import Constellation from "../Constellation";
import { Orbit, NorthStar } from "../SpaceDecor";
import { BRANCHES, CITIES, type Branch } from "./branches-data";

const AMENITY_ICONS: Record<string, LucideIcon> = {
  "Smoking Area": Cigarette,
  "Non-smoking Area": CigaretteOff,
  "Free Parking": Car,
  Breakfast: Croissant,
  "Meeting Room": Users,
};

function BranchCard({ branch }: { branch: Branch }) {
  return (
    <TiltCard className="h-full">
      <article className="liquid-glass group relative flex h-full flex-col overflow-hidden rounded-3xl transition-shadow duration-500 hover:shadow-[0_24px_60px_-20px_rgba(207,158,88,0.35)]">
        <div className="tilt-glow pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={branch.image}
            alt={branch.name}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1F21]/70 via-transparent to-transparent" />
          <span className="liquid-glass absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#CFBD8D]">
            <MapPin className="h-3 w-3 text-[#CF9E58]" />
            {branch.city}
          </span>
        </div>

        {/* Info */}
        <div className="relative flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="font-display text-2xl font-semibold leading-snug text-[#F4EBD6]">
            {branch.name}
          </h3>
          <p className="mt-2 text-xs font-light leading-relaxed text-[#CFBD8D]/65">
            {branch.description}
          </p>

          <p className="mt-4 flex items-start gap-2 text-xs font-light text-[#CFBD8D]/80">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#CF9E58]" />
            {branch.location}
          </p>

          {/* Hours */}
          <div className="mt-4 rounded-2xl bg-[#0D1F21]/60 p-4">
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#CFBD8D]/55">
              <Clock className="h-3 w-3 text-[#CF9E58]" />
              Opening Hours
            </p>
            <ul className="mt-2.5 space-y-1">
              {branch.hours.map(({ label, time }) => (
                <li
                  key={label}
                  className="flex items-baseline gap-3 text-xs"
                >
                  <span className="w-16 shrink-0 text-[#CFBD8D]/60">
                    {label}
                  </span>
                  <span className="flex-1 border-b border-dotted border-[#CFBD8D]/15" />
                  <span
                    className={
                      time
                        ? "lining-nums text-[#F4EBD6]/85"
                        : "uppercase tracking-wider text-[#793635]"
                    }
                  >
                    {time ?? "Closed"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Amenities */}
          {branch.amenities.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {branch.amenities.map((a) => {
                const Icon = AMENITY_ICONS[a] ?? Sparkles;
                return (
                  <span
                    key={a}
                    className="flex items-center gap-1.5 rounded-full border border-[#CFBD8D]/15 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#CFBD8D]/70"
                  >
                    <Icon className="h-3 w-3 text-[#CF9E58]" strokeWidth={1.5} />
                    {a}
                  </span>
                );
              })}
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-1 items-end gap-3">
            <a
              href={branch.googleMap}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine group/btn flex flex-1 items-center justify-center gap-2 rounded-full bg-[#CF9E58] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[#173134] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#CFBD8D] hover:shadow-[0_8px_28px_rgba(207,158,88,0.45)]"
            >
              <Navigation className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:rotate-12" />
              Directions
            </a>
            <a
              href={`tel:${branch.phone}`}
              aria-label={`Call ${branch.name}: ${branch.phone}`}
              className="liquid-glass flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-[#CFBD8D] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#CF9E58]"
            >
              <Phone className="h-3.5 w-3.5" />
              Call
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-colors duration-500 group-hover:border-[#CF9E58]/30" />
      </article>
    </TiltCard>
  );
}

export default function BranchesPage() {
  const [city, setCity] = useState<(typeof CITIES)[number] | "All">("All");

  const visible = useMemo(
    () => (city === "All" ? BRANCHES : BRANCHES.filter((b) => b.city === city)),
    [city]
  );

  return (
    <main className="relative overflow-hidden bg-[#0D1F21] pb-28 pt-36 sm:pt-40">
      <Starfield count={110} shooting />
      <Orbit className="right-[5%] top-[11rem] hidden opacity-60 xl:block" size={280} reverse />
      <NorthStar className="left-[4%] top-[40rem] hidden opacity-70 xl:block" size={110} />
      <Constellation className="left-[4%] top-[24rem] hidden w-56 opacity-60 xl:block" />
      <Constellation className="right-[3%] top-[52rem] hidden w-48 scale-x-[-1] opacity-45 xl:block" />
      <div className="aurora pointer-events-none absolute -top-10 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-[#CF9E58]/5 blur-3xl" />
      <div className="aurora pointer-events-none absolute bottom-0 left-[8%] h-72 w-[34rem] rounded-full bg-[#793635]/10 blur-3xl" />

      {/* Header */}
      <Reveal className="relative mx-auto max-w-2xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full liquid-glass px-4 py-2">
          <Compass className="astro-ring h-3.5 w-3.5 text-[#CF9E58]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#CFBD8D]/90">
            Our Branches
          </span>
        </div>
        <h1 className="font-display text-4xl font-medium leading-[1.08] text-[#F4EBD6] sm:text-6xl">
          Find the star <span className="text-shimmer italic">above you</span>
        </h1>
        <p className="mt-6 text-sm font-light leading-relaxed text-[#CFBD8D]/75 sm:text-base">
          Fifteen constellations across Jordan — each one poured with the same
          warmth, wherever you wander.
        </p>
      </Reveal>

      {/* City filters */}
      <Reveal
        delay={120}
        className="relative mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3 px-6"
      >
        {(["All", ...CITIES] as const).map((c) => {
          const count =
            c === "All"
              ? BRANCHES.length
              : BRANCHES.filter((b) => b.city === c).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCity(c)}
              aria-pressed={city === c}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                city === c
                  ? "bg-[#CF9E58] font-medium text-[#173134] shadow-[0_8px_28px_rgba(207,158,88,0.4)]"
                  : "liquid-glass text-[#CFBD8D]/80 hover:-translate-y-0.5 hover:text-[#CF9E58]"
              }`}
            >
              {c}
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] lining-nums ${
                  city === c
                    ? "bg-[#173134]/15 text-[#173134]"
                    : "bg-white/5 text-[#CFBD8D]/60"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </Reveal>

      {/* Branch grid */}
      <div className="relative mx-auto mt-14 max-w-7xl px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((b, i) => (
            <Reveal key={`${city}-${b.id}`} delay={(i % 3) * 110}>
              <BranchCard branch={b} />
            </Reveal>
          ))}
        </div>
        <p className="mt-12 flex items-center justify-center gap-2 text-center text-[10px] uppercase tracking-[0.3em] text-[#CFBD8D]/40">
          <Star className="h-2.5 w-2.5 fill-[#CF9E58]/50 text-[#CF9E58]/50" />
          {visible.length} {visible.length === 1 ? "branch" : "branches"} ·
          open under the same sky
          <Star className="h-2.5 w-2.5 fill-[#CF9E58]/50 text-[#CF9E58]/50" />
        </p>
      </div>
    </main>
  );
}
