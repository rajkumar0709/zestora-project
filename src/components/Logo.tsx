export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="Zestora">
      <svg
        viewBox="0 0 40 40"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="zlogo" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="oklch(0.82 0.20 150)" />
            <stop offset="100%" stopColor="oklch(0.88 0.17 150)" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="36" height="36" rx="11" fill="url(#zlogo)" />
        <path
          d="M13 13 H28 L15 27 H28"
          stroke="oklch(0.14 0.02 160)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span
        className="font-display text-xl font-bold tracking-tight leading-none"
        style={{ color: "oklch(1 0 0)" }}
      >
        Zestora
      </span>
    </div>
  );
}
