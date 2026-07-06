import { useRef, type MouseEvent, type ReactNode } from "react";
import { Star, ArrowRight, MapPin } from "lucide-react";
import Starfield from "../Starfield";
import Reveal from "../Reveal";
import Constellation from "../Constellation";
import { NorthStar, Moon } from "../SpaceDecor";
import { MENU, priceLabel, type MenuItem, type MenuSection } from "./menu-data";
import { asset } from "../../lib/asset";

/** Glass panel whose inner gold glow follows the cursor (no tilt). */
function GlowPanel({
  children,
  className = "",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--glow-y", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className={`liquid-glass group relative rounded-3xl ${className}`}
      {...rest}
    >
      <div className="tilt-glow absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </section>
  );
}

function Row({ item }: { item: MenuItem }) {
  return (
    <li className="group/row -mx-3 flex items-baseline gap-3 rounded-xl px-3 py-[7px] transition-all duration-300 hover:bg-white/[0.04]">
      <span
        className={`flex items-baseline gap-2 text-sm tracking-wide transition-colors duration-300 group-hover/row:text-[#CF9E58] ${
          item.signature ? "text-shimmer font-medium" : "text-[#F4EBD6]/90"
        }`}
      >
        {item.name}
        {item.signature && (
          <Star
            className="h-3 w-3 shrink-0 translate-y-px fill-[#CF9E58] text-[#CF9E58]"
            aria-label="Signature drink"
          />
        )}
      </span>
      <span className="mb-1 flex-1 self-end border-b border-dotted border-[#CFBD8D]/20 transition-colors duration-300 group-hover/row:border-[#CF9E58]/50" />
      <span className="w-12 text-right text-sm font-semibold lining-nums text-[#CF9E58]">
        {priceLabel(item.small)}
      </span>
      <span className="w-12 text-right text-sm font-light lining-nums text-[#CFBD8D]/70">
        {priceLabel(item.regular)}
      </span>
    </li>
  );
}

function ColumnHeader() {
  return (
    <div className="flex items-baseline gap-3 border-b border-[#CFBD8D]/15 pb-2.5">
      <span className="flex-1 text-[10px] uppercase tracking-[0.3em] text-[#CFBD8D]/45">
        Drink
      </span>
      <span className="w-12 text-right text-[10px] uppercase tracking-[0.14em] text-[#CFBD8D]/60">
        Small
      </span>
      <span className="w-12 text-right text-[10px] uppercase tracking-[0.14em] text-[#CFBD8D]/60">
        Reg.
      </span>
    </div>
  );
}

function SectionPanel({ section }: { section: MenuSection }) {
  const { title, id, tagline, icon: Icon, image, columns } = section;
  const count = columns.reduce((n, c) => n + c.length, 0);
  const signature = columns.flat().find((i) => i.signature);

  return (
    <GlowPanel
      id={id}
      aria-label={`${title} drinks`}
      className="scroll-mt-32 p-6 sm:p-10"
    >
      <div
        className={
          image
            ? "gap-10 lg:grid lg:grid-cols-[280px,1fr]"
            : undefined
        }
      >
        {/* Portrait side image */}
        {image && (
          <div className="relative mb-8 hidden lg:mb-0 lg:block">
            <div className="sticky top-32 overflow-hidden rounded-2xl">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="aspect-[2/3] w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-[#CFBD8D]/20" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D1F21]/85 to-transparent p-4 pt-12">
                {signature && (
                  <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#CFBD8D]/90">
                    <Star className="h-3 w-3 fill-[#CF9E58] text-[#CF9E58]" />
                    Try the {signature.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div>
          {/* Section header */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="relative flex h-12 w-12 items-center justify-center">
              <span className="astro-ring absolute inset-0 rounded-full border border-dashed border-[#CFBD8D]/30" />
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#173134] text-[#CF9E58] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
            </span>
            <div>
              <h2 className="font-display text-3xl font-semibold leading-none text-[#F4EBD6]">
                {title}
              </h2>
              <p className="mt-1.5 text-[11px] font-light uppercase tracking-[0.24em] text-[#CFBD8D]/55">
                {tagline}
              </p>
            </div>
            <span className="ml-auto rounded-full border border-[#CFBD8D]/20 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#CFBD8D]/60">
              {count} {title === "Add" ? "extras" : "drinks"}
            </span>
          </div>

          {/* Gold divider */}
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-[#CF9E58]/40 to-transparent" />
            <Star className="h-2.5 w-2.5 fill-[#CF9E58]/60 text-[#CF9E58]/60" />
            <span className="h-px flex-1 bg-gradient-to-l from-[#CF9E58]/40 to-transparent" />
          </div>

          {/* Columns (mirrors the in-store board) */}
          <div
            className={`mt-6 grid gap-x-14 gap-y-6 ${
              columns.length > 1 ? "md:grid-cols-2" : "md:max-w-md"
            }`}
          >
            {columns.map((col, ci) => (
              <Reveal key={ci} delay={ci * 140}>
                <ColumnHeader />
                <ul className="mt-2">
                  {col.map((item) => (
                    <Row key={item.name} item={item} />
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </GlowPanel>
  );
}

export default function MenuPage() {
  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative overflow-hidden bg-[#0D1F21] pb-28 pt-36 sm:pt-40">
      <Starfield count={110} shooting />
      <NorthStar className="right-[6%] top-[13rem] hidden opacity-70 xl:block" size={120} />
      <Moon className="left-[7%] top-[64rem] hidden lg:block" size={72} />
      <Constellation className="left-[4%] top-[22rem] hidden w-56 opacity-60 xl:block" />
      <Constellation className="right-[3%] top-[46rem] hidden w-48 scale-x-[-1] opacity-45 xl:block" />
      <div className="aurora pointer-events-none absolute -top-10 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-[#CF9E58]/5 blur-3xl" />
      <div className="aurora pointer-events-none absolute bottom-0 right-[8%] h-72 w-[34rem] rounded-full bg-[#793635]/10 blur-3xl" />

      {/* Header */}
      <Reveal className="relative mx-auto max-w-2xl px-6 text-center">
        {/* Rotating emblem */}
        <div className="relative mx-auto h-24 w-24">
          <div className="astro-ring absolute inset-0 rounded-full border border-dashed border-[#CFBD8D]/35" />
          <div className="astro-ring-reverse absolute -inset-2.5 rounded-full border border-dotted border-[#CF9E58]/25" />
          <img
            src={asset("brand/logo-mark.png")}
            alt=""
            aria-hidden="true"
            className="animate-drift absolute inset-0 m-auto h-14 w-14 opacity-90"
          />
        </div>

        <h1 className="font-display mt-8 text-4xl font-medium leading-[1.08] text-[#F4EBD6] sm:text-6xl">
          Charted cup <span className="text-shimmer italic">by cup</span>
        </h1>
        <p className="mt-6 text-sm font-light leading-relaxed text-[#CFBD8D]/75 sm:text-base">
          Every drink on our board, exactly as poured at the counter.
        </p>
        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#CFBD8D]/45">
          All prices in JOD · tax included · <Star className="inline h-2.5 w-2.5 -translate-y-px fill-[#CF9E58] text-[#CF9E58]" /> house signatures
        </p>
      </Reveal>

      {/* Jump pills */}
      <Reveal
        delay={120}
        className="relative mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 px-6"
      >
        {MENU.map(({ title, id, icon: Icon, columns }) => (
          <button
            key={id}
            type="button"
            onClick={() => jump(id)}
            className="liquid-glass group flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-[#CFBD8D]/80 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#CF9E58] hover:shadow-[0_12px_36px_-12px_rgba(207,158,88,0.5)]"
          >
            <Icon className="h-3.5 w-3.5 text-[#CF9E58]" strokeWidth={1.5} />
            {title}
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] lining-nums text-[#CFBD8D]/60 transition-colors duration-300 group-hover:text-[#CF9E58]">
              {columns.reduce((n, c) => n + c.length, 0)}
            </span>
          </button>
        ))}
      </Reveal>

      {/* Sections */}
      <div className="relative mx-auto mt-14 flex max-w-5xl flex-col gap-10 px-6 lg:px-10">
        {MENU.map((section, si) => (
          <Reveal key={section.id} delay={si * 130}>
            <SectionPanel section={section} />
          </Reveal>
        ))}
      </div>

      {/* Cross-links */}
      <Reveal delay={150} className="relative mx-auto mt-16 max-w-5xl px-6 lg:px-10">
        <div className="liquid-glass flex flex-col items-center gap-6 rounded-3xl px-8 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-display text-2xl font-medium text-[#F4EBD6]">
              Rather brew it <span className="text-shimmer italic">at home?</span>
            </h3>
            <p className="mt-2 flex items-center justify-center gap-2 text-sm font-light text-[#CFBD8D]/70 sm:justify-start">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#CF9E58]" />
              Beans, capsules & teas from the roastery — or find a branch near you.
            </p>
          </div>
          <a
            href="#/shop"
            className="btn-shine group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[#CF9E58] px-7 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-[#173134] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#CFBD8D] hover:shadow-[0_12px_40px_rgba(207,158,88,0.45)]"
          >
            Visit the Shop
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </main>
  );
}
