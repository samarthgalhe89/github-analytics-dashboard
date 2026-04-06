"use client";

interface DevTraceLogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export default function DevTraceLogo({
  size = 40,
  animated = false,
  className = "",
}: DevTraceLogoProps) {
  return (
    <svg
      viewBox="0 0 48 56"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * (56 / 48)}
      className={`${className} ${animated ? "dna-logo-animated" : ""}`}
      role="img"
      aria-label="DevTrace Logo"
    >
      <defs>
        <linearGradient id="dna-strand-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id="dna-strand-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#79c0ff" />
        </linearGradient>
        {animated && (
          <filter id="dna-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {/* DNA Strand 1 */}
      <path
        className={animated ? "dna-strand dna-strand-1" : ""}
        d="M10,4 C10,12 38,12 38,20 C38,28 10,28 10,36 C10,44 38,44 38,52"
        stroke="url(#dna-strand-a)"
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
      />

      {/* DNA Strand 2 */}
      <path
        className={animated ? "dna-strand dna-strand-2" : ""}
        d="M38,4 C38,12 10,12 10,20 C10,28 38,28 38,36 C38,44 10,44 10,52"
        stroke="url(#dna-strand-b)"
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
      />

      {/* Connecting rungs */}
      {[12, 20, 28, 36, 44].map((y, i) => (
        <line
          key={y}
          className={animated ? "dna-rung" : ""}
          x1="19"
          y1={y}
          x2="29"
          y2={y}
          stroke="#6366F1"
          strokeWidth="1.5"
          opacity={i % 2 === 0 ? 0.35 : 0.25}
          strokeLinecap="round"
          style={animated ? { animationDelay: `${0.6 + i * 0.1}s` } : undefined}
        />
      ))}

      {/* Endpoint nodes */}
      <circle
        className={animated ? "dna-node dna-node-endpoint" : ""}
        cx="10" cy="4" r="3" fill="#8B5CF6"
        style={animated ? { animationDelay: "0.3s" } : undefined}
      />
      <circle
        className={animated ? "dna-node dna-node-endpoint" : ""}
        cx="38" cy="4" r="3" fill="#6366F1"
        style={animated ? { animationDelay: "0.4s" } : undefined}
      />
      <circle
        className={animated ? "dna-node dna-node-endpoint" : ""}
        cx="38" cy="52" r="3" fill="#4F46E5"
        style={animated ? { animationDelay: "1.1s" } : undefined}
      />
      <circle
        className={animated ? "dna-node dna-node-endpoint" : ""}
        cx="10" cy="52" r="3" fill="#79c0ff"
        style={animated ? { animationDelay: "1.2s" } : undefined}
      />

      {/* Center crossover nodes */}
      <circle
        className={animated ? "dna-node dna-node-center" : ""}
        cx="24" cy="20" r="2" fill="#818CF8" opacity={animated ? undefined : 0.7}
        style={animated ? { animationDelay: "0.7s" } : undefined}
        filter={animated ? "url(#dna-glow)" : undefined}
      />
      <circle
        className={animated ? "dna-node dna-node-center" : ""}
        cx="24" cy="36" r="2" fill="#818CF8" opacity={animated ? undefined : 0.7}
        style={animated ? { animationDelay: "0.9s" } : undefined}
        filter={animated ? "url(#dna-glow)" : undefined}
      />
    </svg>
  );
}
