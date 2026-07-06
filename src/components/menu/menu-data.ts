import type { LucideIcon } from "lucide-react";
import { Flame, Snowflake, Sparkles } from "lucide-react";
import { asset } from "../../lib/asset";

/** A drink on the board. Prices in JOD; null = size not offered. */
export type MenuItem = {
  name: string;
  small: number | null;
  regular: number | null;
  /** House specialty — gets a star and shimmer treatment. */
  signature?: boolean;
};

export type MenuSection = {
  title: string;
  id: string;
  tagline: string;
  icon: LucideIcon;
  /** Portrait side image (lg+ screens). */
  image?: { src: string; alt: string };
  /** Rendered as two columns on desktop, mirroring the in-store board. */
  columns: MenuItem[][];
};

export const MENU: MenuSection[] = [
  {
    title: "Hot",
    id: "hot",
    tagline: "Slow mornings, warm hands",
    icon: Flame,
    image: { src: asset("menu/hot.webp"), alt: "Flat white with golden latte art" },
    columns: [
      [
        { name: "Espresso", small: 2.25, regular: null },
        { name: "Double Espresso", small: 2.75, regular: null },
        { name: "Espresso Macchiato", small: 2.75, regular: null },
        { name: "Turkish Coffee", small: 2.25, regular: null },
        { name: "Double Turkish Coffee", small: 2.75, regular: null },
        { name: "Bedouin Coffee", small: 3.25, regular: null, signature: true },
        { name: "Black Eye", small: 3.25, regular: 3.75 },
        { name: "American Filter Coffee", small: 2.75, regular: 3.25 },
        { name: "Manual Brewing Coffee", small: 3.0, regular: null },
        { name: "Americano", small: 2.75, regular: 3.25 },
        { name: "Tea", small: 2.25, regular: null },
        { name: "Karak Tea", small: 2.75, regular: 3.25, signature: true },
        { name: "Flat White", small: 3.25, regular: null },
      ],
      [
        { name: "Cappuccino", small: 3.25, regular: 3.75 },
        { name: "Café Misto", small: 3.25, regular: 3.75 },
        { name: "Spanish Latte", small: 3.25, regular: 3.75 },
        { name: "Café Latte", small: 3.25, regular: 3.75 },
        { name: "Macchiato Latte", small: 3.25, regular: 3.75 },
        { name: "White Hot Chocolate", small: 3.25, regular: 3.75 },
        { name: "Classic Hot Chocolate", small: 3.25, regular: 3.75 },
        { name: "Gendoia", small: 4.0, regular: 4.5 },
        { name: "Classic Hot Mocha", small: 4.0, regular: 4.5 },
        { name: "White Hot Mocha", small: 4.0, regular: 4.5 },
        { name: "Caramel Macchiato", small: 4.0, regular: 4.5 },
        { name: "French Coffee", small: 4.0, regular: 4.5 },
      ],
    ],
  },
  {
    title: "Cold",
    id: "cold",
    tagline: "Chilled, poured over stars of ice",
    icon: Snowflake,
    image: { src: asset("menu/cold.webp"), alt: "Iced coffee with cream swirl" },
    columns: [
      [
        { name: "Baklava Special Blend", small: 5.0, regular: 5.5, signature: true },
        { name: "Cake Frappe", small: 5.0, regular: 5.5 },
        { name: "Milk Shake", small: 4.0, regular: 4.5 },
        { name: "Caramel Frappe", small: 4.0, regular: 4.5 },
        { name: "Oreo Frappe", small: 4.0, regular: 4.5 },
        { name: "Coffee Frappe", small: 4.0, regular: 4.5 },
        { name: "Mocha Frappe", small: 4.0, regular: 4.5 },
        { name: "Iced Mocha", small: 4.0, regular: 4.5 },
        { name: "Iced White Mocha", small: 4.0, regular: 4.5 },
        { name: "Iced Caramel Macchiato", small: 4.0, regular: 4.5 },
        { name: "Chocolate Chiller", small: 4.0, regular: 4.5 },
        { name: "Iced Latte", small: 3.25, regular: 3.75 },
        { name: "Iced Spanish Latte", small: 3.25, regular: 3.75 },
        { name: "Iced Pistachio Latte", small: 3.5, regular: 4.0, signature: true },
      ],
      [
        { name: "Fresh Lemon Juice", small: 3.25, regular: 3.75 },
        { name: "Fresh Orange Juice", small: 3.25, regular: 3.75 },
        { name: "Mango Juice", small: 3.25, regular: 3.75 },
        { name: "Strawberry Juice", small: 3.25, regular: 3.75 },
        { name: "Smoothies", small: 3.25, regular: 3.75 },
        { name: "Cold Brew", small: 3.25, regular: 3.75 },
        { name: "Iced Coffee", small: 2.75, regular: 3.25 },
        { name: "Iced Tea Peach", small: 2.75, regular: 3.25 },
        { name: "Iced Tea Lemon", small: 2.75, regular: 3.25 },
      ],
    ],
  },
  {
    title: "Add",
    id: "extras",
    tagline: "Little upgrades, extra wonder",
    icon: Sparkles,
    columns: [
      [
        { name: "Add Flavor", small: 0.5, regular: 0.75 },
        { name: "Add Espresso Shot", small: 0.75, regular: null },
      ],
    ],
  },
];

export const priceLabel = (n: number | null) =>
  n === null ? "—" : n.toFixed(2);
