import { Instagram, Facebook, ArrowUpRight } from "lucide-react";
import Starfield from "./Starfield";
import Reveal from "./Reveal";
import Constellation from "./Constellation";

const SOCIALS = [
  {
    icon: Instagram,
    label: "Instagram",
    handle: "@astrolabejordan",
    href: "https://www.instagram.com/astrolabejordan/",
  },
  {
    icon: Facebook,
    label: "Facebook",
    handle: "Astrolabe Jordan",
    href: "https://www.facebook.com/AstrolabeJordan",
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-[#0D1F21]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CF9E58]/40 to-transparent" />
      <Starfield count={80} shooting />
      <Constellation className="left-[5%] top-14 hidden w-48 opacity-40 lg:block" />

      {/* Contact section */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#CF9E58]">
            Contact Us
          </p>
          <h2 className="font-display mt-5 text-4xl font-medium text-[#F4EBD6] sm:text-5xl">
            Say hello, <span className="text-shimmer italic">day or night</span>
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-[#CFBD8D]/75">
            Questions, bookings, or just to talk coffee and constellations —
            our door (and our DMs) are always open.
          </p>

          {/* Social buttons */}
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {SOCIALS.map(({ icon: Icon, label, handle, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass group flex w-full items-center justify-between gap-5 rounded-2xl px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_-16px_rgba(207,158,88,0.4)] sm:w-72"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#173134] text-[#CF9E58] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#793635]/60">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-medium uppercase tracking-[0.16em] text-[#F4EBD6]">
                      {label}
                    </span>
                    <span className="block text-xs font-light text-[#CFBD8D]/65">
                      {handle}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-[#CFBD8D]/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#CF9E58]" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-[#CFBD8D]/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between lg:px-10">
          <a href="#top" className="group flex items-center gap-3">
            <img
              src="/brand/logo-mark.png"
              alt="Astrolabe emblem"
              className="h-9 w-9 rounded-full object-cover transition-transform duration-700 group-hover:rotate-[360deg]"
            />
            <span className="font-display text-lg font-semibold tracking-[0.28em] text-[#CFBD8D]">
              ASTROLABE
            </span>
          </a>

          <p className="text-xs font-light tracking-[0.18em] text-[#CFBD8D]/50">
            © {new Date().getFullYear()} Astrolabe Café. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
