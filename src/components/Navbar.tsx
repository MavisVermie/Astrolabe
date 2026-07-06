import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight, ShoppingBag, CupSoda, MapPin, House } from "lucide-react";
import { asset } from "../lib/asset";

type NavbarProps = {
  /** Which dedicated page is open (highlights its nav link). */
  activePage?: "home" | "menu" | "shop" | "branches";
  /** Cart badge count; the cart button renders only when this is provided. */
  cartCount?: number;
  onCartOpen?: () => void;
};

const PAGE_LINKS = [
  { label: "Home", href: "#/", page: "home" as const, icon: House },
  { label: "Menu", href: "#/menu", page: "menu" as const, icon: CupSoda },
  { label: "Branches", href: "#/branches", page: "branches" as const, icon: MapPin },
  { label: "Shop", href: "#/shop", page: "shop" as const, icon: ShoppingBag },
];

const linkClass = (isActive: boolean) =>
  `relative text-sm font-normal uppercase tracking-[0.22em] transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-[#CF9E58] after:transition-all after:duration-300 hover:text-[#CF9E58] hover:after:w-full ${
    isActive ? "text-[#CF9E58] after:w-full" : "text-[#CFBD8D]/75 after:w-0"
  }`;

export default function Navbar({ activePage, cartCount, onCartOpen }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pulse, setPulse] = useState(false);
  const prevCount = useRef(cartCount ?? 0);

  // Pop the badge whenever the count increases.
  useEffect(() => {
    const prev = prevCount.current;
    prevCount.current = cartCount ?? 0;
    if (cartCount !== undefined && cartCount > prev) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 350);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      {/* Scroll progress */}
      <div className="absolute inset-x-0 top-0 h-[3px]">
        <div
          className="h-full origin-left bg-gradient-to-r from-[#CF9E58] via-[#CFBD8D] to-[#CF9E58] shadow-[0_0_8px_rgba(207,158,88,0.7)] transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <nav
        className={`liquid-glass mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled ? "shadow-[0_16px_48px_-16px_rgba(0,0,0,0.8)]" : ""
        }`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-3">
          <img
            src={asset("brand/logo-mark.png")}
            alt="Astrolabe emblem"
            className="h-10 w-10 rounded-full object-cover transition-transform duration-700 group-hover:rotate-[360deg]"
          />
          <span className="font-display text-xl font-semibold tracking-[0.28em] text-[#CFBD8D]">
            ASTROLABE
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 lg:flex">
          {PAGE_LINKS.map(({ label, href, page, icon: Icon }) => (
            <li key={page}>
              <a
                href={href}
                className={`${linkClass(activePage === page)} flex items-center gap-2`}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart (shop page only) — badge sits outside the glass circle so
              .liquid-glass overflow:hidden can never clip it */}
          {cartCount !== undefined && (
            <button
              type="button"
              onClick={onCartOpen}
              aria-label={`Open cart (${cartCount} item${cartCount === 1 ? "" : "s"})`}
              className="group relative"
            >
              <span className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-[#CFBD8D] transition-all duration-300 group-hover:text-[#CF9E58] group-hover:shadow-[0_8px_28px_-8px_rgba(207,158,88,0.6)]">
                <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              </span>
              {cartCount > 0 && (
                <span
                  className={`absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#CF9E58] px-1 text-[11px] font-semibold leading-none text-[#173134] shadow-[0_0_14px_rgba(207,158,88,0.6)] transition-transform duration-300 ${
                    pulse ? "scale-125" : "scale-100"
                  }`}
                >
                  {cartCount}
                </span>
              )}
            </button>
          )}

          <a
            href="#/shop"
            className="btn-shine group hidden items-center gap-2 rounded-full bg-[#CF9E58] px-5 py-2.5 text-sm font-medium uppercase tracking-[0.18em] text-[#173134] transition-all duration-300 hover:bg-[#CFBD8D] hover:shadow-[0_0_28px_rgba(207,158,88,0.45)] lg:flex"
          >
            Order Now
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 text-[#CFBD8D] transition-colors duration-300 hover:text-[#CF9E58] lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mx-auto max-w-7xl overflow-hidden transition-all duration-500 ease-out lg:hidden ${
          open ? "mt-2 max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="liquid-glass rounded-2xl p-6">
          <ul className="flex flex-col gap-5">
            {PAGE_LINKS.map(({ label, href, page, icon: Icon }) => (
              <li key={page}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 text-sm uppercase tracking-[0.24em] transition-colors duration-300 hover:text-[#CF9E58] ${
                    activePage === page ? "text-[#CF9E58]" : "text-[#CFBD8D]/85"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 border-t border-[#CFBD8D]/15 pt-6">
            <a
              href="#/shop"
              onClick={() => setOpen(false)}
              className="btn-shine rounded-full bg-[#CF9E58] px-5 py-3 text-center text-sm font-medium uppercase tracking-[0.18em] text-[#173134] transition-colors duration-300 hover:bg-[#CFBD8D]"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
