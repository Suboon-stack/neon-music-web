import { searchMusic } from '../../data/discoverCatalog'
import { albumPath } from '../../data/homeCatalog'
import type { Genre } from '../../data/discoverCatalog'
import { TrackList } from '../collections/TrackList'
import { AlbumCard } from '../home/AlbumCard'
import { HomeIcon, PlayButton } from '../home/HomeControls'
import type { usePreviewPlayer } from '../home/usePreviewPlayer'

const resultTabs = [
  { id: 'all', label: 'All Results' },
  { id: 'songs', label: 'Songs' },
  { id: 'albums', label: 'Albums' },
  { id: 'artists', label: 'Artists' },
] as const

export type ResultTab = (typeof resultTabs)[number]['id']

export function SearchResults({ query, genre, tab, setTab, play }: {
  query: string
  genre: Genre
  tab: ResultTab
  setTab: (tab: ResultTab) => void
  play: ReturnType<typeof usePreviewPlayer>['start']
}) {
  const results = searchMusic(query, genre)
  const count = tab === 'all'
    ? results.songs.length + results.albums.length + results.artists.length
    : results[tab].length
  const includesTab = (group: ResultTab) => tab === 'all' || tab === group
  const term = query.trim().toLowerCase()
  const candidates = [
    ...results.songs.map((song) => ({ title: song.title, type: 'Song', albumId: song.albumId, ids: [song.id] })),
    ...results.albums.map((album) => ({ title: album.title, type: 'Album', albumId: album.id, ids: album.songIds })),
    ...results.artists.map((artist) => ({
      title: artist.name,
      type: 'Artist',
      albumId: undefined,
      ids: results.songs.filter((song) => song.artistId === artist.id).map((song) => song.id),
    })),
  ]
  const topResult = tab === 'all'
    ? candidates.find(({ title }) => title.toLowerCase() === term)
      ?? candidates.find(({ title }) => title.toLowerCase().startsWith(term))
      ?? candidates.find(({ title }) => title.toLowerCase().includes(term))
    : undefined

  return (
    <div className="discover-sections" id="search-results">
      <div className="search-results-heading">
        <h2>Search Results</h2>
        <div className="result-tabs" role="group" aria-label="Result type">
          {resultTabs.map(({ id, label }) => (
            <button key={id} type="button" aria-pressed={tab === id} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>
        <p className="discover-status" role="status">
          {count ? `${count} ${count === 1 ? 'result' : 'results'}` : 'No results here. Try another search, genre, or result type.'}
        </p>
      </div>

      {topResult && (
        <section aria-labelledby="top-result-heading">
          <h3 className="home-section-title" id="top-result-heading">Top Result</h3>
          <div className="top-result">
            <div>
              <small>{topResult.type}</small>
              {topResult.type === 'Album' && topResult.albumId
                ? <a href={`#${albumPath(topResult.albumId)}`}><strong>{topResult.title}</strong></a>
                : <strong>{topResult.title}</strong>}
            </div>
            <PlayButton label={`Play top result: ${topResult.title}`} onClick={() => play(topResult.ids)} />
          </div>
        </section>
      )}

      {includesTab('songs') && results.songs.length > 0 && (
        <section aria-labelledby="result-songs">
          <h3 className="home-section-title" id="result-songs">Songs</h3>
          <TrackList
            songs={results.songs}
            onPlay={(song) => play(results.songs.map((item) => item.id), { trackId: song.id })}
            linkAlbums
          />
        </section>
      )}
      {includesTab('albums') && results.albums.length > 0 && (
        <section aria-labelledby="result-albums">
          <h3 className="home-section-title" id="result-albums">Albums</h3>
          <ul className="discover-albums">
            {results.albums.map((album) => <AlbumCard key={album.id} album={album} onPlay={() => play(album.songIds)} />)}
          </ul>
        </section>
      )}
      {includesTab('artists') && results.artists.length > 0 && (
        <section aria-labelledby="result-artists">
          <h3 className="home-section-title" id="result-artists">Artists</h3>
          <ul className="artist-results">
            {results.artists.map((artist) => (
              <li key={artist.id}>
                <span className="artist-icon"><HomeIcon icon="guest" /></span>
                <strong>{artist.name}</strong>
                <PlayButton
                  label={`Play tracks by ${artist.name}`}
                  onClick={() => play(results.songs.filter((song) => song.artistId === artist.id).map((song) => song.id))}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
