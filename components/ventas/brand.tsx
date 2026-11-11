type BrandProps = {
  className?: string
}

type MarkProps = BrandProps & {
  tone?: "ink" | "cream"
}

export function ZifroMark({ className, tone = "ink" }: MarkProps) {
  const ground = tone === "cream" ? "#F5F2EB" : "#171614"
  const line = tone === "cream" ? "#171614" : "#F5F2EB"
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Zifro"
    >
      <rect width="100" height="100" rx="26" fill={ground} />
      <path
        d="M76.8 20 L50.7 32.6 L35 32.6 L35.7 74.7 L66.8 64.2 L50.7 32.6"
        fill="none"
        stroke={line}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="76.8" cy="20" r="6" fill={line} />
      <circle cx="35.7" cy="74.7" r="6" fill={line} />
      <circle cx="66.8" cy="64.2" r="6" fill={line} />
      <circle cx="50.7" cy="32.6" r="9.3" fill="#FF7A2B" />
    </svg>
  )
}

export function ZifroWordmark({ className }: BrandProps) {
  return (
    <svg
      viewBox="0 0 404 100"
      className={className}
      role="img"
      aria-label="Zifro"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 14H64L14 86H66" />
        <path d="M100 14V86" />
        <path d="M134 86V14H184M134 50H176" />
        <path d="M220 86V14H250C282 14 282 52 250 52H220M250 52L280 86" />
        <circle cx="350" cy="50" r="38" />
      </g>
    </svg>
  )
}

export function ZifroLockup({
  className,
  tone = "ink",
}: BrandProps & { tone?: "ink" | "cream" }) {
  return (
    <span className={`v-lockup ${className ?? ""}`}>
      <ZifroMark className="v-lockup__mark" tone={tone} />
      <ZifroWordmark className="v-lockup__word" />
    </span>
  )
}

export function NodeMap({ className }: BrandProps) {
  return (
    <svg
      viewBox="0 0 520 420"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M96 318 L178 206 L298 252 L420 112" />
        <path d="M178 206 L298 252 L268 352" />
        <path d="M298 252 L390 300" />
      </g>
      <g fill="currentColor">
        <circle cx="96" cy="318" r="5" />
        <circle cx="178" cy="206" r="5" />
        <circle cx="298" cy="252" r="5" />
        <circle cx="420" cy="112" r="5" />
        <circle cx="268" cy="352" r="5" />
        <circle cx="390" cy="300" r="5" />
      </g>
      <circle cx="298" cy="252" r="12" fill="#FF7A2B" />
    </svg>
  )
}
