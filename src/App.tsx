import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Story from "./components/Story";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CursorGlow from "./components/CursorGlow";
import Marquee from "./components/Marquee";
import Testimonials from "./components/Testimonials";
import ShopPage from "./components/shop/ShopPage";
import MenuPage from "./components/menu/MenuPage";
import BranchesPage from "./components/branches/BranchesPage";
import type { CartLine, Product } from "./components/shop/products";

/** Tiny hash router: "#/shop", "#/menu", "#/branches" render pages, else the landing. */
function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export default function App() {
  const route = useHashRoute();
  const isShop = route.startsWith("#/shop");
  const isMenu = route.startsWith("#/menu");
  const isBranches = route.startsWith("#/branches");
  const activePage = isShop
    ? ("shop" as const)
    : isMenu
      ? ("menu" as const)
      : isBranches
        ? ("branches" as const)
        : ("home" as const);

  // Cart lives here so the navbar button and the shop page share it,
  // and it survives navigating between pages.
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);

  const addToCart = (product: Product) => {
    setCart((cur) => {
      const i = cur.findIndex((l) => l.product.slug === product.slug);
      if (i === -1) return [...cur, { product, qty: 1 }];
      const next = [...cur];
      next[i] = { ...next[i], qty: next[i].qty + 1 };
      return next;
    });
  };

  const changeQty = (slug: string, delta: number) => {
    setCart((cur) =>
      cur
        .map((l) =>
          l.product.slug === slug ? { ...l, qty: l.qty + delta } : l
        )
        .filter((l) => l.qty > 0)
    );
  };

  // Entering a page: start at the top. Returning to a landing anchor
  // (e.g. "#story" clicked from a page): scroll to it once it exists.
  useEffect(() => {
    if (activePage) {
      window.scrollTo({ top: 0 });
      return;
    }
    setCartOpen(false);
    const id = route.replace("#", "");
    if (id === "/") {
      window.scrollTo({ top: 0 });
      return;
    }
    if (id && id !== "top") {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [route, activePage]);

  return (
    <div className="min-h-screen bg-[#0D1F21]">
      <Navbar
        activePage={activePage ?? "home"}
        cartCount={isShop ? cartCount : undefined}
        onCartOpen={() => setCartOpen(true)}
      />
      {isShop ? (
        <ShopPage
          cart={cart}
          onAdd={addToCart}
          onChangeQty={changeQty}
          drawerOpen={cartOpen}
          onDrawerClose={() => setCartOpen(false)}
        />
      ) : isMenu ? (
        <MenuPage />
      ) : isBranches ? (
        <BranchesPage />
      ) : (
        <main>
          <Hero />
          <Marquee />
          <Features />
          <Story />
          <Gallery />
          <Testimonials />
        </main>
      )}
      <Footer />
      <BackToTop />
      <CursorGlow />
    </div>
  );
}
