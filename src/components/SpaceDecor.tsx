/**
 * Decorative celestial ornaments — a radiant north star, an orbiting
 * satellite ring, and a crescent moon. All aria-hidden, pointer-transparent, and
 * palette-matched (champagne / gold / burgundy on the night teal).
 */

export function NorthStar({
  className = "",
  size = 130,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`animate-drift pointer-events-none absolute ${className}`}
      style={{ animationDuration: "8s" }}
    >
      <defs>
        <radialGradient id="ns-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#CF9E58" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#CF9E58" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* halo */}
      <circle cx="60" cy="60" r="44" fill="url(#ns-glow)" opacity="0.5" />
      {/* long cross flare rays */}
      <path d="M6 60 H114" stroke="#CFBD8D" strokeWidth="0.5" opacity="0.28" />
      <path d="M60 6 V114" stroke="#CFBD8D" strokeWidth="0.5" opacity="0.28" />
      {/* four-point star */}
      <path
        d="M60 26 L64.5 55.5 L94 60 L64.5 64.5 L60 94 L55.5 64.5 L26 60 L55.5 55.5 Z"
        fill="#CFBD8D"
        opacity="0.65"
      />
      {/* bright core */}
      <circle cx="60" cy="60" r="2.5" fill="#F4EBD6" opacity="0.9" />
      {/* companion sparkles */}
      <path
        d="M92 30 L93.4 36.6 L100 38 L93.4 39.4 L92 46 L90.6 39.4 L84 38 L90.6 36.6 Z"
        fill="#CF9E58"
        opacity="0.5"
        className="star"
        style={{ animationDuration: "4s" }}
      />
      <path
        d="M30 88 L31 92.5 L35.5 93.5 L31 94.5 L30 99 L29 94.5 L24.5 93.5 L29 92.5 Z"
        fill="#CF9E58"
        opacity="0.45"
        className="star"
        style={{ animationDuration: "5s", animationDelay: "1.4s" }}
      />
    </svg>
  );
}

export function Orbit({
  className = "",
  size = 260,
  reverse = false,
}: {
  className?: string;
  size?: number;
  reverse?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className={`${
          reverse ? "astro-ring-reverse" : "astro-ring"
        } absolute inset-0 rounded-full border border-dashed border-[#CFBD8D]/15`}
      >
        {/* orbiting satellite */}
        <span className="absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#CF9E58] shadow-[0_0_10px_2px_rgba(207,158,88,0.55)]" />
      </div>
      <div
        className={`${
          reverse ? "astro-ring" : "astro-ring-reverse"
        } absolute inset-[18%] rounded-full border border-dotted border-[#CF9E58]/12`}
      >
        <span className="absolute -bottom-[2px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#CFBD8D] shadow-[0_0_8px_1px_rgba(207,189,141,0.5)]" />
      </div>
    </div>
  );
}

export function Moon({
  className = "",
  size = 90,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`animate-drift pointer-events-none absolute ${className}`}
      style={{ animationDuration: "9s" }}
    >
      <defs>
        <mask id="moon-crescent">
          <circle cx="50" cy="50" r="34" fill="white" />
          <circle cx="64" cy="42" r="30" fill="black" />
        </mask>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="#CFBD8D"
        opacity="0.35"
        mask="url(#moon-crescent)"
      />
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke="#CF9E58"
        strokeWidth="0.6"
        opacity="0.2"
      />
    </svg>
  );
}
