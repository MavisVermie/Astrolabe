import { asset } from "../../lib/asset";

export type Category = "Coffee" | "Capsules" | "Tea" | "Snacks" | "Drinkware";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number; // JOD
  note: string;
};

export const CATEGORIES: Category[] = [
  "Coffee",
  "Capsules",
  "Tea",
  "Snacks",
  "Drinkware",
];

export const PRODUCTS: Product[] = [
  // Coffee
  {
    slug: "el-salvador-montecristo",
    name: "El Salvador Montecristo",
    category: "Coffee",
    price: 12.5,
    note: "Single origin · whole beans",
  },
  {
    slug: "colombia-narino-mariana",
    name: "Colombia Nariño Mariana",
    category: "Coffee",
    price: 13.0,
    note: "Single origin · whole beans",
  },
  {
    slug: "espresso-specialty-bag",
    name: "Espresso Specialty Blend",
    category: "Coffee",
    price: 11.0,
    note: "House espresso · whole beans",
  },
  // Capsules
  {
    slug: "bundle-50-capsules",
    name: "Bundle of 50 Capsules",
    category: "Capsules",
    price: 22.0,
    note: "Mixed roast · Nespresso-compatible",
  },
  {
    slug: "bold-capsules",
    name: "Bold Capsules",
    category: "Capsules",
    price: 5.5,
    note: "Dark roast · box of 10",
  },
  {
    slug: "highlands-capsules",
    name: "Highlands Capsules",
    category: "Capsules",
    price: 5.5,
    note: "Medium roast · box of 10",
  },
  {
    slug: "colombia-capsules",
    name: "Colombia Capsules",
    category: "Capsules",
    price: 5.5,
    note: "Single origin · box of 10",
  },
  // Tea
  {
    slug: "black-tea",
    name: "Black Tea",
    category: "Tea",
    price: 4.5,
    note: "20 bags · handmade in Jordan",
  },
  {
    slug: "tea-thyme",
    name: "Tea with Thyme",
    category: "Tea",
    price: 4.5,
    note: "20 bags · handmade in Jordan",
  },
  {
    slug: "tea-rosemary",
    name: "Tea with Rosemary",
    category: "Tea",
    price: 4.5,
    note: "20 bags · handmade in Jordan",
  },
  {
    slug: "tea-sage",
    name: "Tea with Sage",
    category: "Tea",
    price: 4.5,
    note: "20 bags · handmade in Jordan",
  },
  {
    slug: "tea-verbena",
    name: "Tea with Verbena",
    category: "Tea",
    price: 4.5,
    note: "20 bags · handmade in Jordan",
  },
  // Snacks
  {
    slug: "coffee-oat-bar",
    name: "Coffee Oat Bar",
    category: "Snacks",
    price: 1.5,
    note: "Baked daily · single bar",
  },
  {
    slug: "chocolate-oat-bar",
    name: "Chocolate Oat Bar",
    category: "Snacks",
    price: 1.5,
    note: "Baked daily · single bar",
  },
  {
    slug: "orange-oat-bar",
    name: "Orange Oat Bar",
    category: "Snacks",
    price: 1.5,
    note: "Baked daily · single bar",
  },
  // Drinkware
  {
    slug: "bottle-magsafe-yellow",
    name: "MagSafe Bottle — Yellow",
    category: "Drinkware",
    price: 25.0,
    note: "Insulated steel · phone mount lid",
  },
  {
    slug: "bottle-magsafe-red",
    name: "MagSafe Bottle — Red",
    category: "Drinkware",
    price: 25.0,
    note: "Insulated steel · phone mount lid",
  },
  {
    slug: "pottery-mug",
    name: "Pottery Mug",
    category: "Drinkware",
    price: 18.0,
    note: "Hand-thrown ceramic · teal glaze",
  },
  {
    slug: "wooden-luxury-tumbler",
    name: "Wooden Luxury Tumbler",
    category: "Drinkware",
    price: 20.0,
    note: "Walnut finish · double-walled",
  },
  {
    slug: "wooden-black-tumbler",
    name: "Wooden Black Tumbler",
    category: "Drinkware",
    price: 20.0,
    note: "Matte black · double-walled",
  },
];

export const imageFor = (p: Product) => asset(`shop/${p.slug}.webp`);
export const fmtJOD = (n: number) => `${n.toFixed(2)} JOD`;

export type CartLine = { product: Product; qty: number };
