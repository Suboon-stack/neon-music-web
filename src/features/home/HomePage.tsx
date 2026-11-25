import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { albums, albumPath, homePlaylists, playlistPath } from '../../data/homeCatalog'
import { AlbumArtwork } from './AlbumArtwork'
import { FavoriteButton, HomeIcon, PlayButton } from './HomeControls'
import { AlbumCard } from './AlbumCard'
import type { usePreviewPlayer } from './usePreviewPlayer'

type PlaylistEntry = (typeof homePlaylists)[number]

function HomeHeader({ heading }: { heading: RefObject<HTMLHeadingElement | null> }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'

  return (
    <header className="home-header">
      <span className="home-avatar"><HomeIcon icon="guest" /></span>
      <div>
        <p>{greeting}</p>
        <h1 ref={heading} tabIndex={-1}>Welcome, Guest</h1>
      </div>
      <details className="home-notifications">
        <summary aria-label="Notifications"><HomeIcon icon="bell" /></summary>
        <p>No new notifications.</p>
      </details>
    </header>
  )
}

function PlaylistCard({ playlist, onPlay }: { playlist: PlaylistEntry; onPlay: () => void }) {
  return (
    <li className={`home-playlist playlist--${playlist.theme}`}>
      <span className="playlist-art" aria-hidden="true" />
      <a href={`#${playlistPath(playlist.id)}`}>
        <strong>{playlist.name}</strong>
        <small>{playlist.description}</small>
      </a>
      <PlayButton label={`Preview ${playlist.name}`} onClick={onPlay} />
    </li>
  )
}

export function HomePage({ player, favorites, toggleFavorite }: {
  player: ReturnType<typeof usePreviewPlayer>
  favorites: string[]
  toggleFavorite: (id: string) => void
}) {
  const heading = useRef<HTMLHeadingElement>(null)
  const featured = albums[0]
  useEffect(() => {
    document.title = 'Home | Neon Music'
    heading.current?.focus()
  }, [])

  return (
    <main className="home-content">
      <HomeHeader heading={heading} />
      <section className="home-featured" aria-label="Featured album">
        <div className="home-featured-copy">
          <span>Featured album</span>
          <h2><a href={`#${albumPath(featured.id)}`}>{featured.title}</a></h2>
          <p>{featured.artistName}</p>
          <div className="home-featured-actions">
            <PlayButton text="Play" label={`Play ${featured.title} preview`} onClick={() => player.start(featured.songIds)} />
            <FavoriteButton label={`Favorite ${featured.title}`} pressed={favorites.includes(`album:${featured.id}`)} onClick={() => toggleFavorite(`album:${featured.id}`)} />
          </div>
        </div>
        <div className="home-featured-art"><AlbumArtwork album={featured} /></div>
      </section>

      <section aria-labelledby="recent-title">
        <h2 className="home-section-title" id="recent-title">Recently Played</h2>
        <ul className="home-recent" aria-label="Recently Played albums" tabIndex={0}>
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} onPlay={() => player.start(album.songIds)} />
          ))}
        </ul>
      </section>

      <section aria-labelledby="playlists-title">
        <h2 className="home-section-title" id="playlists-title">Made For You</h2>
        <ul className="home-playlists">
          {homePlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} onPlay={() => player.start(playlist.songIds)} />
          ))}
        </ul>
      </section>
    </main>
  )
}
