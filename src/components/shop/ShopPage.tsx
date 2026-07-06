import { useEffect, useMemo, useState } from "react";
import {
  ShoppingBag,
  Plus,
  Minus,
  X,
  Trash2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Starfield from "../Starfield";
import Reveal from "../Reveal";
import TiltCard from "../TiltCard";
import { NorthStar, Orbit } from "../SpaceDecor";
import {
  CATEGORIES,
  PRODUCTS,
  imageFor,
  fmtJOD,
  type Category,
  type Product,
  type CartLine,
} from "./products";

type ShopPageProps = {
  cart: CartLine[];
  onAdd: (product: Product) => void;
  onChangeQty: (slug: string, delta: number) => void;
  drawerOpen: boolean;
  onDrawerClose: () => void;
};

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: () => void;
}) {
  return (
    <TiltCard className="h-full">
      <article className="liquid-glass group relative flex h-full flex-col overflow-hidden rounded-3xl transition-shadow duration-500 hover:shadow-[0_24px_60px_-20px_rgba(207,158,88,0.35)]">
        <div className="tilt-glow pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={imageFor(product)}
            alt={product.name}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1F21]/45 to-transparent" />
          <span className="liquid-glass absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#CFBD8D]">
            {product.category}
          </span>
        </div>

        {/* Info */}
        <div className="relative flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-xl font-semibold leading-snug text-[#F4EBD6]">
            {product.name}
          </h3>
          <p className="mt-1.5 text-xs font-light tracking-wide text-[#CFBD8D]/60">
            {product.note}
          </p>
          <div className="mt-5 flex flex-1 items-end justify-between gap-3">
            <p className="font-display text-2xl font-bold leading-none lining-nums text-[#CF9E58]">
              {product.price.toFixed(2)}
              <span className="ml-1.5 align-middle text-[11px] font-medium uppercase tracking-[0.14em] text-[#CFBD8D]/70">
                JOD
              </span>
            </p>
            <button
              type="button"
              onClick={onAdd}
              aria-label={`Add ${product.name} to cart`}
              className="btn-shine group/btn flex items-center gap-2 rounded-full bg-[#CF9E58] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#173134] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#CFBD8D] hover:shadow-[0_8px_28px_rgba(207,158,88,0.45)]"
            >
              <Plus className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:rotate-90" />
              Add
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-colors duration-500 group-hover:border-[#CF9E58]/30" />
      </article>
    </TiltCard>
  );
}

export default function ShopPage({
  cart,
  onAdd,
  onChangeQty,
  drawerOpen,
  onDrawerClose,
}: ShopPageProps) {
  const [filter, setFilter] = useState<Category | "All">("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === filter),
    [filter]
  );

  const total = cart.reduce((n, l) => n + l.qty * l.product.price, 0);

  // Lock scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Escape closes the drawer.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDrawerClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, onDrawerClose]);

  return (
    <main className="relative overflow-hidden bg-[#0D1F21] pb-28 pt-36 sm:pt-40">
      <Starfield count={110} shooting />
      <Orbit className="left-[4%] top-[10rem] hidden opacity-60 xl:block" size={260} />
      <NorthStar className="right-[5%] top-[24rem] hidden opacity-70 xl:block" size={120} />
      <div className="aurora pointer-events-none absolute -top-10 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-[#CF9E58]/5 blur-3xl" />
      <div className="aurora pointer-events-none absolute bottom-0 left-[8%] h-72 w-[34rem] rounded-full bg-[#793635]/10 blur-3xl" />

      {/* Header */}
      <Reveal className="relative mx-auto max-w-2xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full liquid-glass px-4 py-2">
          <Sparkles className="h-3.5 w-3.5 text-[#CF9E58]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#CFBD8D]/90">
            The Astrolabe Shop
          </span>
        </div>
        <h1 className="font-display text-4xl font-medium leading-[1.08] text-[#F4EBD6] sm:text-6xl">
          Take the stars <span className="text-shimmer italic">home</span>
        </h1>
        <p className="mt-6 text-sm font-light leading-relaxed text-[#CFBD8D]/75 sm:text-base">
          Beans we roast, teas we blend, and the vessels we trust — everything
          from our counter, delivered to yours.
        </p>
      </Reveal>

      {/* Category filters */}
      <Reveal
        delay={120}
        className="relative mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-3 px-6"
      >
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
              filter === c
                ? "bg-[#CF9E58] font-medium text-[#173134] shadow-[0_8px_28px_rgba(207,158,88,0.4)]"
                : "liquid-glass text-[#CFBD8D]/80 hover:-translate-y-0.5 hover:text-[#CF9E58]"
            }`}
          >
            {c}
          </button>
        ))}
      </Reveal>

      {/* Product grid */}
      <div className="relative mx-auto mt-14 max-w-7xl px-6 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((p, i) => (
            <Reveal key={`${filter}-${p.slug}`} delay={(i % 4) * 90}>
              <ProductCard product={p} onAdd={() => onAdd(p)} />
            </Reveal>
          ))}
        </div>
        <p className="mt-12 text-center text-[10px] uppercase tracking-[0.3em] text-[#CFBD8D]/40">
          {visible.length} {visible.length === 1 ? "item" : "items"} ·
          hand-packed under the night sky
        </p>
      </div>

      {/* Cart drawer */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!drawerOpen}
      >
        <div
          className="absolute inset-0 bg-[#0D1F21]/70 backdrop-blur-sm"
          onClick={onDrawerClose}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          className={`liquid-glass absolute right-0 top-0 flex h-full w-full max-w-md flex-col rounded-l-3xl transition-transform duration-500 ease-out ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-[#CFBD8D]/10 px-7 py-6">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-[#CF9E58]" strokeWidth={1.5} />
              <h2 className="font-display text-xl font-semibold tracking-wide text-[#F4EBD6]">
                Your Cart
              </h2>
            </div>
            <button
              type="button"
              onClick={onDrawerClose}
              aria-label="Close cart"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#CFBD8D] transition-all duration-300 hover:rotate-90 hover:text-[#CF9E58]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Lines */}
          <div className="flex-1 overflow-y-auto px-7 py-6">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="astro-ring flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-[#CFBD8D]/30">
                  <ShoppingBag
                    className="h-6 w-6 text-[#CFBD8D]/50"
                    strokeWidth={1.25}
                  />
                </div>
                <p className="text-sm font-light text-[#CFBD8D]/60">
                  Your cart is still empty —<br />
                  the stars await.
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-5">
                {cart.map(({ product, qty }) => (
                  <li key={product.slug} className="flex items-center gap-4">
                    <img
                      src={imageFor(product)}
                      alt={product.name}
                      className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#F4EBD6]">
                        {product.name}
                      </p>
                      <p className="mt-0.5 text-xs font-light text-[#CFBD8D]/60">
                        {fmtJOD(product.price)}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => onChangeQty(product.slug, -1)}
                          aria-label={`Decrease ${product.name} quantity`}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#CFBD8D]/25 text-[#CFBD8D] transition-colors duration-300 hover:border-[#CF9E58] hover:text-[#CF9E58]"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-sm text-[#F4EBD6]">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => onChangeQty(product.slug, 1)}
                          aria-label={`Increase ${product.name} quantity`}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#CFBD8D]/25 text-[#CFBD8D] transition-colors duration-300 hover:border-[#CF9E58] hover:text-[#CF9E58]"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-sm font-medium text-[#CFBD8D]">
                        {fmtJOD(product.price * qty)}
                      </p>
                      <button
                        type="button"
                        onClick={() => onChangeQty(product.slug, -qty)}
                        aria-label={`Remove ${product.name}`}
                        className="text-[#CFBD8D]/40 transition-colors duration-300 hover:text-[#793635]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Totals */}
          <div className="border-t border-[#CFBD8D]/10 px-7 py-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-[#CFBD8D]/60">
                Total
              </span>
              <span className="text-shimmer font-display text-2xl font-semibold">
                {fmtJOD(total)}
              </span>
            </div>
            <button
              type="button"
              disabled={cart.length === 0}
              className="btn-shine group mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#CF9E58] px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-[#173134] transition-all duration-300 hover:bg-[#CFBD8D] hover:shadow-[0_12px_40px_rgba(207,158,88,0.45)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Checkout
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.24em] text-[#CFBD8D]/40">
              Online checkout coming soon · visit any branch
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
