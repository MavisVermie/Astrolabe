import { useMemo } from "react";

type Star = {
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  bright: boolean;
};

/** Deterministic pseudo-random so stars don't jump between re-renders. */
function makeStars(count: number, seed: number): Star[] {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: count }, () => ({
    top: rnd() * 100,
    left: rnd() * 100,
    size: rnd() < 0.82 ? 1.5 : 2.5,
    delay: rnd() * 7,
    duration: 2.5 + rnd() * 5,
    bright: rnd() < 0.18,
  }));
}

type Props = {
  count?: number;
  shooting?: boolean;
  className?: string;
};

export default function Starfield({ count = 70, shooting = false, className = "" }: Props) {
  const stars = useMemo(() => makeStars(count, count * 7919 + 13), [count]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {stars.map((st, i) => (
        <span
          key={i}
          className="star absolute rounded-full"
          style={{
            top: `${st.top}%`,
            left: `${st.left}%`,
            width: `${st.size}px`,
            height: `${st.size}px`,
            animationDelay: `${st.delay}s`,
            animationDuration: `${st.duration}s`,
            backgroundColor: st.bright ? "#CFBD8D" : "rgba(244, 235, 214, 0.9)",
            boxShadow: st.bright
              ? "0 0 6px 1px rgba(207, 158, 88, 0.55)"
              : "0 0 3px rgba(244, 235, 214, 0.35)",
          }}
        />
      ))}
      {shooting && (
        <>
          <span className="shooting-star" style={{ top: "14%", left: "-8%", animationDelay: "2.5s" }} />
          <span
            className="shooting-star"
            style={{ top: "6%", left: "34%", animationDelay: "10.5s", animationDuration: "17s" }}
          />
          <span
            className="shooting-star"
            style={{ top: "40%", left: "12%", animationDelay: "6.8s", animationDuration: "21s" }}
          />
        </>
      )}
    </div>
  );
}
