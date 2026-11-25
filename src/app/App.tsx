import { useState } from 'react'
import { AppLayout } from '../components/layout/AppLayout'
import { PageContainer } from '../components/layout/PageContainer'
import { Button } from '../components/ui/Button'
import { albumPath, albums, artists, playlistPath, playlists } from '../data/homeCatalog'
import { AuthLayout } from '../features/auth/components/AuthLayout'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { RegisterPage } from '../features/auth/pages/RegisterPage'
import { WelcomePage } from '../features/auth/pages/WelcomePage'
import { CollectionPage } from '../features/collections/CollectionPage'
import { DiscoverPage } from '../features/discover/DiscoverPage'
import { HomePage } from '../features/home/HomePage'
import { MiniPlayer } from '../features/home/MiniPlayer'
import { usePreviewPlayer } from '../features/home/usePreviewPlayer'
import { routes, useRoute } from './router'
import '../features/home/home.css'
import '../features/discover/discover.css'
import '../features/collections/collections.css'

const relatedLinks: Record<string, { path: string; title: string }> = {
  [routes.library.path]: routes.playlist,
  [routes.album.path]: routes.discover,
  [routes.playlist.path]: routes.library,
}

function MusicShell({ path, title }: { path: string; title: string }) {
  const player = usePreviewPlayer()
  const [favorites, setFavorites] = useState<string[]>([])
  const album = albums.find((item) => albumPath(item.id) === path)
  const playlist = playlists.find((item) => playlistPath(item.id) === path)
  const collection = album ?? playlist
  const relatedPage = relatedLinks[path]

  function toggleFavorite(id: string) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  let page
  if (path === routes.home.path) {
    page = <HomePage player={player} favorites={favorites} toggleFavorite={toggleFavorite} />
  } else if (path === routes.discover.path) {
    page = <DiscoverPage play={player.start} />
  } else if (collection) {
    const favoriteId = album ? `album:${album.id}` : `playlist:${collection.id}`
    page = (
      <CollectionPage
        collection={collection}
        player={player}
        favorite={favorites.includes(favoriteId)}
        onFavorite={() => toggleFavorite(favoriteId)}
      />
    )
  } else if (path === routes.player.path) {
    const artist = artists.find((item) => item.id === player.track.artistId)
    page = (
      <PageContainer title={title}>
        <section className="placeholder" aria-label="Current track">
          <strong>{player.track.title}</strong>
          <p>{artist?.name}</p>
          <p>Playback is simulated. Use the mini-player to control the preview.</p>
        </section>
      </PageContainer>
    )
  } else {
    page = (
      <PageContainer title={title}>
        <section className="placeholder">
          <p>This screen is planned for a later phase.</p>
          {relatedPage && <Button href={`#${relatedPage.path}`}>{relatedPage.title}</Button>}
        </section>
      </PageContainer>
    )
  }

  return (
    <AppLayout activePath={path}>
      <div className="music-shell">
        <div className="music-page" key={path}>{page}</div>
        <MiniPlayer player={player} favorite={favorites.includes(player.track.id)} onFavorite={() => toggleFavorite(player.track.id)} />
      </div>
    </AppLayout>
  )
}

export default function App() {
  const { path, title, layout } = useRoute()

  if (path === routes.welcome.path) return <WelcomePage />
  if (path === routes.login.path) return <LoginPage />
  if (path === routes.register.path) return <RegisterPage />

  if (layout === 'entry') {
    return (
      <AuthLayout title={title}>
        <Button href={`#${routes.home.path}`}>Go to Home</Button>
      </AuthLayout>
    )
  }

  return <MusicShell path={path} title={title} />
}
