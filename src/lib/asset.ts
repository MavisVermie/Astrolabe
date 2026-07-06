/**
 * Resolve a public/ asset against Vite's base URL so paths work both
 * locally ("/") and on GitHub Pages ("/Astrolabe/").
 */
export const asset = (path: string) =>
  import.meta.env.BASE_URL + path.replace(/^\//, "");
