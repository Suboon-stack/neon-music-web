import { routes } from '../../app/router'
import { Brand } from '../ui/Brand'

interface NavigationLink {
  path: string
  label: string
  icon: string
}

const [homeLink, discoverLink, libraryLink, playlistsLink] = [
  { ...routes.home, label: 'Home', icon: 'M3 10l9-7 9 7v10h-6v-6H9v6H3z' },
  { ...routes.discover, label: 'Discover', icon: 'M16 16l5 5M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z' },
  { ...routes.library, label: 'Library', icon: 'M3 5h5v15H3zM8 5h5v15H8zM14 7l4-2 5 13-4 2z' },
  { ...routes.playlist, label: 'Playlists', icon: 'M4 6h1m4 0h11M4 12h1m4 0h11M4 18h1m4 0h11' },
]

const playerLink = { ...routes.player, label: 'Now Playing', icon: 'M7 4l14 8-14 8z' }
const settingsLink = { ...routes.settings, label: 'Settings', icon: 'M4 7h16M4 17h16M9 4v6m6 4v6' }

function NavigationLinks({ links, activePath }: {
  links: NavigationLink[]
  activePath: string
}) {
  return links.map(({ path, label, icon }) => (
    <a key={path} href={`#${path}`} aria-current={path === activePath ? 'page' : undefined}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={icon} />
      </svg>
      {label}
    </a>
  ))
}

export function Sidebar({ activePath }: { activePath: string }) {
  return (
    <aside className="sidebar">
      <a className="brand-link" href="#/"><Brand /></a>
      <nav className="navigation" aria-label="Desktop navigation">
        <NavigationLinks links={[homeLink, discoverLink, libraryLink, playlistsLink]} activePath={activePath} />
        <div className="navigation-divider">
          <NavigationLinks links={[settingsLink]} activePath={activePath} />
        </div>
      </nav>
      <nav className="navigation sidebar-footer" aria-label="Player">
        <NavigationLinks links={[playerLink]} activePath={activePath} />
      </nav>
    </aside>
  )
}

export function MobileNavigation({ activePath }: { activePath: string }) {
  return (
    <nav className="navigation mobile-navigation" aria-label="Mobile navigation">
      <NavigationLinks links={[homeLink, discoverLink, libraryLink, playerLink, settingsLink]} activePath={activePath} />
    </nav>
  )
}
