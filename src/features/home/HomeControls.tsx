const icons = {
  search: 'M16 16l5 5M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
  close: 'M6 6l12 12M18 6 6 18',
  play: 'M8 5l12 7-12 7z',
  pause: 'M9 5v14m6-14v14',
  previous: 'M6 5v14m12-14L8 12l10 7z',
  next: 'M18 5v14M6 5l10 7-10 7z',
  heart: 'M20.8 5.8a5 5 0 0 0-7.1 0L12 7.5l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.1a5 5 0 0 0 0-7.1Z',
  shuffle: 'M3 6h3c5 0 7 12 12 12h3m-4-4 4 4-4 4M3 18h3c1.7 0 3-1.4 4.2-3.3m3.6-5.4C15 7.4 16.3 6 18 6h3m-4-4 4 4-4 4',
  repeat: 'M20 8l-3-3m3 3-3 3m3-3H7a3 3 0 0 0-3 3m0 5 3 3m-3-3 3-3m-3 3h13a3 3 0 0 0 3-3',
  volume: 'M3 9h4l5-4v14l-5-4H3zm13 0a4 4 0 0 1 0 6m2-9a8 8 0 0 1 0 12',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12a2 2 0 0 0 4 0',
  guest: 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2',
} as const

export function HomeIcon({ icon }: { icon: keyof typeof icons }) {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill={icon === 'play' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={icons[icon]} />
    </svg>
  )
}

export function PlayButton({ label, onClick, paused = true, text, disabled }: {
  label: string
  onClick: () => void
  paused?: boolean
  text?: string
  disabled?: boolean
}) {
  return (
    <button type="button" className={text ? "home-play home-play--text" : "home-play"} aria-label={label} onClick={onClick} disabled={disabled}>
      <HomeIcon icon={paused ? 'play' : 'pause'} />
      {text}
    </button>
  )
}

export function FavoriteButton({ label, pressed, onClick }: { label: string; pressed: boolean; onClick: () => void }) {
  return (
    <button type="button" className="home-favorite" aria-label={label} aria-pressed={pressed} onClick={onClick}>
      <HomeIcon icon="heart" />
    </button>
  )
}
