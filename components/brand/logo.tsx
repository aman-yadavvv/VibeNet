export function Logo({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
        <defs>
          <linearGradient id="vg" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="50%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#FB7185" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#vg)" />
        <path d="M11 13 L20 27 L29 13" stroke="#0A0A0F" strokeWidth="3.5"
              strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="20" cy="13" r="2.5" fill="#0A0A0F" />
      </svg>
      <span className="font-display text-xl font-bold tracking-tight">
        vibe<span className="bg-gradient-primary bg-clip-text text-transparent">net</span>
      </span>
    </div>
  );
}