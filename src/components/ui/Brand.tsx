export function BrandMark() {
  return (
    <svg viewBox="0 0 36 32" width="36" height="32" fill="none" aria-hidden="true">
      <path d="M2 17h3l2 5 3-13 3 16 4-23 4 28 4-22 3 15 3-10 2 4h1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Brand() {
  return (
    <span className="brand">
      <BrandMark />
      <span>Neon<br />Music</span>
    </span>
  )
}
