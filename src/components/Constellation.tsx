/** Decorative astrolabe-style constellation drawn behind the Story quote. */
export default function Constellation({ className = "" }: { className?: string }) {
  const nodes: Array<[number, number, number]> = [
    [60, 60, 2.6], // north anchor
    [150, 118, 2], // arc east
    [235, 96, 2.8], // bright east star
    [305, 170, 2],
    [212, 205, 2.4], // center pivot
    [118, 235, 2],
    [42, 190, 2.4], // west
    [160, 300, 2.8], // south bright
    [265, 285, 2],
  ];
  const edges: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 1],
    [4, 5],
    [5, 6],
    [6, 0],
    [5, 7],
    [7, 8],
    [8, 4],
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 340 340"
      fill="none"
      className={`pointer-events-none absolute ${className}`}
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="#CFBD8D"
          strokeWidth="0.7"
          strokeDasharray="3 5"
          opacity="0.35"
        />
      ))}
      {nodes.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r * 2.6} fill="#CF9E58" opacity="0.10" />
          <circle
            cx={x}
            cy={y}
            r={r}
            fill="#CFBD8D"
            className="star"
            style={{ animationDelay: `${(i * 0.7) % 4}s`, animationDuration: `${3 + (i % 3)}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
