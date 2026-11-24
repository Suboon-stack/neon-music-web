import { useSyncExternalStore } from 'react'

interface Route {
  path: string
  title: string
  layout: 'entry' | 'app'
}

export const routes = {
  welcome: { path: '/', title: 'Welcome', layout: 'entry' },
  login: { path: '/login', title: 'Log In', layout: 'entry' },
  register: { path: '/register', title: 'Create Account', layout: 'entry' },
  home: { path: '/home', title: 'Home', layout: 'app' },
  discover: { path: '/discover', title: 'Discover', layout: 'app' },
  album: { path: '/albums/sample-album', title: 'Album Details', layout: 'app' },
  player: { path: '/now-playing', title: 'Now Playing', layout: 'app' },
  library: { path: '/library', title: 'Library', layout: 'app' },
  playlist: { path: '/playlists/sample-playlist', title: 'Playlist Details', layout: 'app' },
  settings: { path: '/settings', title: 'Settings', layout: 'app' },
} as const satisfies Record<string, Route>

const notFound: Route = { path: '', title: 'Page Not Found', layout: 'entry' }

function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function readPath() {
  return window.location.hash.slice(1) || '/'
}

export function useRoute() {
  const path = useSyncExternalStore(subscribeToHash, readPath)
  return Object.values(routes).find((route) => route.path === path) ?? notFound
}
