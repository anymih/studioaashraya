import React from 'react'

export function SectionSheet({ className = '' }: { className?: string }) {
  return (
    <figure className={`border-[1.5px] border-[var(--ink)] bg-[var(--surface)] ${className}`}>
      <svg
        viewBox="0 0 720 400"
        role="img"
        aria-label="Section drawing of a two storey house with four numbered stage checks at the footing, plinth, first slab and second slab"
        className="block w-full h-auto"
      >
        <defs>
          <pattern id="section-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line className="s-hl" x1="0" y1="0" x2="0" y2="9" />
          </pattern>
        </defs>
        <rect x="20" y="300" width="680" height="64" fill="url(#section-hatch)" />
        <line className="s-ln" x1="20" y1="300" x2="700" y2="300" style={{ strokeWidth: 2 }} />
        <rect className="s-pad" x="186" y="318" width="48" height="14" />
        <rect className="s-pad" x="366" y="318" width="48" height="14" />
        <rect className="s-pad" x="546" y="318" width="48" height="14" />
        <rect className="s-room" x="214" y="204" width="172" height="82" />
        <rect className="s-room" x="394" y="204" width="172" height="82" />
        <rect className="s-room" x="214" y="114" width="172" height="82" />
        <rect className="s-room" x="394" y="114" width="172" height="82" />
        <rect className="s-win" x="250" y="226" width="40" height="36" />
        <rect className="s-win" x="500" y="232" width="30" height="54" />
        <rect className="s-win" x="250" y="142" width="40" height="36" />
        <rect className="s-win" x="470" y="142" width="40" height="36" />
        <rect className="s-solid" x="206" y="106" width="8" height="212" />
        <rect className="s-solid" x="386" y="106" width="8" height="212" />
        <rect className="s-solid" x="566" y="106" width="8" height="212" />
        <rect className="s-solid" x="206" y="286" width="368" height="6" />
        <rect className="s-solid" x="198" y="196" width="384" height="8" />
        <rect className="s-solid" x="198" y="106" width="384" height="8" />
        <line className="s-ext" x1="210" y1="76" x2="210" y2="104" />
        <line className="s-ext" x1="570" y1="76" x2="570" y2="104" />
        <line className="s-dim" x1="210" y1="80" x2="570" y2="80" />
        <line className="s-dim" x1="210" y1="74" x2="210" y2="86" />
        <line className="s-dim" x1="570" y1="74" x2="570" y2="86" />
        <text className="s-t" x="390" y="70" textAnchor="middle">12.00 m</text>
        <line className="s-ext" x1="586" y1="106" x2="630" y2="106" />
        <line className="s-ext" x1="586" y1="196" x2="630" y2="196" />
        <line className="s-ext" x1="586" y1="286" x2="630" y2="286" />
        <line className="s-ext" x1="586" y1="300" x2="630" y2="300" />
        <line className="s-dim" x1="620" y1="106" x2="620" y2="300" />
        <text className="s-t" x="634" y="155">3.00</text>
        <text className="s-t" x="634" y="245">3.00</text>
        <text className="s-t" x="634" y="333">GL 0.00</text>
        <line className="s-ldr" x1="112" y1="325" x2="186" y2="325" /><circle className="s-gate" cx="186" cy="325" r="3" />
        <line className="s-ldr" x1="112" y1="289" x2="206" y2="289" /><circle className="s-gate" cx="206" cy="289" r="3" />
        <line className="s-ldr" x1="112" y1="200" x2="198" y2="200" /><circle className="s-gate" cx="198" cy="200" r="3" />
        <line className="s-ldr" x1="112" y1="110" x2="198" y2="110" /><circle className="s-gate" cx="198" cy="110" r="3" />
        <circle className="s-gate" cx="34" cy="325" r="11" /><text className="s-gn" x="34" y="329">1</text><text className="s-gl" x="52" y="329">FOOTING</text>
        <circle className="s-gate" cx="34" cy="289" r="11" /><text className="s-gn" x="34" y="293">2</text><text className="s-gl" x="52" y="293">PLINTH</text>
        <circle className="s-gate" cx="34" cy="200" r="11" /><text className="s-gn" x="34" y="204">3</text><text className="s-gl" x="52" y="204">SLAB 1</text>
        <circle className="s-gate" cx="34" cy="110" r="11" /><text className="s-gn" x="34" y="114">4</text><text className="s-gl" x="52" y="114">SLAB 2</text>
        <text className="s-t" x="20" y="388">NUMBERED MARKS ARE CHECKS MADE BEFORE EACH POUR</text>
      </svg>
      <figcaption className="grid grid-cols-1 sm:grid-cols-3 border-t-[1.5px] border-[var(--ink)]">
        <div className="p-2.5 sm:p-3 border-b sm:border-b-0 sm:border-r border-[var(--line)] min-w-0">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">Studio</span>
          <b className="block font-sans font-medium text-[13px] text-[var(--ink)] mt-0.5">Aashraya</b>
        </div>
        <div className="p-2.5 sm:p-3 border-b sm:border-b-0 sm:border-r border-[var(--line)] min-w-0">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">Drawing</span>
          <b className="block font-sans font-medium text-[13px] text-[var(--ink)] mt-0.5">Typical section, not to scale</b>
        </div>
        <div className="p-2.5 sm:p-3 min-w-0">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">Rule</span>
          <b className="block font-sans font-medium text-[13px] text-[var(--ink)] mt-0.5">Check first, then pour</b>
        </div>
      </figcaption>
    </figure>
  )
}
