import { albumPath, artists } from '../../data/homeCatalog'
import type { Song } from '../../types/music'
import { formatTime } from '../../utils/formatTime'
import { PlayButton } from '../home/HomeControls'

export function TrackList({ songs, onPlay, linkAlbums = false, currentId, numbered = false }: {
  songs: Song[]
  onPlay: (song: Song) => void
  linkAlbums?: boolean
  currentId?: Song['id']
  numbered?: boolean
}) {
  const List = numbered ? 'ol' : 'ul'

  return (
    <List className="track-list" role="list">
      {songs.map((song, index) => {
        const artist = artists.find((item) => item.id === song.artistId)
        const current = song.id === currentId
        return (
          <li key={song.id} aria-current={current ? 'true' : undefined}>
            {numbered && <span className="track-number" aria-hidden="true">{index + 1}</span>}
            <div className="track-info">
              {linkAlbums && song.albumId
                ? <a href={`#${albumPath(song.albumId)}`}><strong>{song.title}</strong></a>
                : <strong>{song.title}</strong>}
              <small>{artist?.name}</small>
            </div>
            <span className="track-duration">{formatTime(song.durationSeconds)}</span>
            <PlayButton label={`Play ${song.title} preview`} onClick={() => onPlay(song)} />
          </li>
        )
      })}
    </List>
  )
}
