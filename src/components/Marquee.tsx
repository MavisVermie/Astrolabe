const ITEMS = [
  "Espresso",
  "Cold Brew",
  "Pour Over",
  "Affogato",
  "Cortado",
  "Iced Latte",
  "Fresh Pastries",
  "Matcha",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center">
          <span className="font-display px-8 text-2xl italic text-[#CFBD8D]/75 sm:px-12 sm:text-3xl">
            {item}
          </span>
          <span className="text-sm text-[#CF9E58]">✦</span>
        </li>
      ))}
    </ul>
  );
}

/** Infinite scrolling ticker of the house specialities. Pauses on hover. */
export default function Marquee() {
  return (
    <div className="marquee relative overflow-hidden border-y border-[#CFBD8D]/10 bg-[#10262A] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0D1F21] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0D1F21] to-transparent" />
      <div className="marquee-inner flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
