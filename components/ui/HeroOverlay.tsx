import React from 'react'

export function HeroOverlay() {
  return (
    <div
      aria-hidden="true"
      className="hidden min-[480px]:block absolute inset-0 pointer-events-none z-10"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 800 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hairline dimension line on right */}
        <line
          x1="760"
          y1="120"
          x2="760"
          y2="880"
          stroke="var(--accent-hi)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <line x1="750" y1="120" x2="770" y2="120" stroke="var(--accent-hi)" strokeWidth="1.5" />
        <line x1="750" y1="880" x2="770" y2="880" stroke="var(--accent-hi)" strokeWidth="1.5" />

        <text
          x="750"
          y="500"
          fill="var(--accent-hi)"
          fontFamily="var(--font-mono)"
          fontSize="10"
          letterSpacing="0.1em"
          transform="rotate(-90 750 500)"
          textAnchor="middle"
        >
          11.20 M OVERALL
        </text>

        {/* Gate marker 1 (Foundation) */}
        <g transform="translate(680, 820)">
          <rect width="22" height="22" fill="var(--accent)" stroke="var(--surface)" strokeWidth="1" />
          <text
            x="11"
            y="15"
            fill="var(--on-accent)"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fontWeight="600"
            textAnchor="middle"
          >
            1
          </text>
        </g>

        {/* Gate marker 2 (Structure) */}
        <g transform="translate(680, 520)">
          <rect width="22" height="22" fill="var(--accent)" stroke="var(--surface)" strokeWidth="1" />
          <text
            x="11"
            y="15"
            fill="var(--on-accent)"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fontWeight="600"
            textAnchor="middle"
          >
            2
          </text>
        </g>

        {/* Gate marker 3 (Waterproofing/Services) */}
        <g transform="translate(680, 240)">
          <rect width="22" height="22" fill="var(--accent)" stroke="var(--surface)" strokeWidth="1" />
          <text
            x="11"
            y="15"
            fill="var(--on-accent)"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fontWeight="600"
            textAnchor="middle"
          >
            3
          </text>
        </g>

        {/* Caption */}
        <text
          x="40"
          y="960"
          fill="var(--accent-hi)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.12em"
        >
          GATE-CHECKED AT EVERY STAGE
        </text>
      </svg>
    </div>
  )
}

export default HeroOverlay
