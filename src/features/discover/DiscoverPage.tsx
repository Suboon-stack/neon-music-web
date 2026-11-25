import { useRef, useState } from 'react'
import { PageContainer } from '../../components/layout/PageContainer'
import { editorialAlbums, genres, popularPlaylists, searchMusic, trendingAlbums } from '../../data/discoverCatalog'
import type { Genre } from '../../data/discoverCatalog'
import { albumPath, playlistPath } from '../../data/homeCatalog'
import { TrackList } from '../collections/TrackList'
import { AlbumArtwork } from '../home/AlbumArtwork'
import { AlbumCard } from '../home/AlbumCard'
import { HomeIcon, PlayButton } from '../home/HomeControls'
import type { usePreviewPlayer } from '../home/usePreviewPlayer'
import { SearchResults } from './SearchResults'
import type { ResultTab } from './SearchResults'

export function DiscoverPage({ play }: { play: ReturnType<typeof usePreviewPlayer>['start'] }) {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState<Genre>('All')
  const [tab, setTab] = useState<ResultTab>('all')
  const input = useRef<HTMLInputElement>(null)
  const isSearching = query.trim() !== ''
  const genreCatalog = searchMusic('', genre)
  const trending = trendingAlbums.filter((album) => genreCatalog.albums.includes(album))
  const editorial = editorialAlbums.filter((album) => genreCatalog.albums.includes(album))
  const playlists = popularPlaylists.filter((playlist) =>
    playlist.songIds.some((id) => genreCatalog.songs.some((song) => song.id === id)))

  function updateQuery(value: string) {
    if (!value.trim() || !query.trim()) setTab('all')
    setQuery(value)
  }

  function clearSearch() {
    updateQuery('')
    input.current?.focus()
  }

  return (
    <PageContainer title="Discover" className="discover-page" headerDetails={<p>Find new favorites in songs, albums, and playlists.</p>}>
      <div className="discover-filters">
        <div role="search" className="discover-search">
          <HomeIcon icon="search" />
          <input
            ref={input}
            type="search"
            aria-label="Search music"
            placeholder="Search songs, albums, artists..."
            value={query}
            onChange={(event) => updateQuery(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape' && query) {
                event.preventDefault()
                clearSearch()
              }
            }}
          />
          {query && <button type="button" aria-label="Clear search" onClick={clearSearch}><HomeIcon icon="close" /></button>}
        </div>
        <div className="discover-genres" role="group" aria-label="Genre filters">
          {genres.map((item) => (
            <button key={item} type="button" aria-pressed={genre === item} onClick={() => setGenre(item)}>{item}</button>
          ))}
        </div>
      </div>

      {isSearching ? <SearchResults query={query} genre={genre} tab={tab} setTab={setTab} play={play} /> : (
        <div className="discover-sections">
          {trending.length > 0 && (
            <section aria-labelledby="discover-trending">
              <h2 className="home-section-title" id="discover-trending">Trending Now</h2>
              <ul className="discover-albums">
                {trending.map((album) => <AlbumCard key={album.id} album={album} onPlay={() => play(album.songIds)} />)}
              </ul>
            </section>
          )}
          {genre !== 'All' && (
            <section aria-labelledby="genre-tracks">
              <h2 className="home-section-title" id="genre-tracks">{genre} Tracks</h2>
              <TrackList
                songs={genreCatalog.songs}
                onPlay={(song) => play(genreCatalog.songs.map((item) => item.id), { trackId: song.id })}
                linkAlbums
              />
            </section>
          )}
          {playlists.length > 0 && (
            <section aria-labelledby="discover-playlists">
              <h2 className="home-section-title" id="discover-playlists">Popular Playlists</h2>
              <ul className="discover-playlists">
                {playlists.map((playlist) => (
                  <li key={playlist.id} className={`discover-playlist playlist--${playlist.theme}`}>
                    <a href={`#${playlistPath(playlist.id)}`}>
                      <strong>{playlist.name}</strong>
                      <small>{playlist.description}</small>
                    </a>
                    <PlayButton label={`Preview ${playlist.name}`} onClick={() => play(playlist.songIds)} />
                  </li>
                ))}
              </ul>
            </section>
          )}
          {editorial.length > 0 && (
            <section aria-labelledby="discover-editorial">
              <h2 className="home-section-title" id="discover-editorial">Editorial Picks</h2>
              <ul className="editorial-list">
                {editorial.map((album) => (
                  <li key={album.id}>
                    <a href={`#${albumPath(album.id)}`}>
                      <AlbumArtwork album={album} />
                      <span><strong>{album.title}</strong><small>{album.artistName}</small></span>
                    </a>
                    <PlayButton label={`Preview ${album.title}`} onClick={() => play(album.songIds)} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </PageContainer>
  )
}
