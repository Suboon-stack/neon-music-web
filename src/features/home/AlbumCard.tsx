import { albumPath } from '../../data/homeCatalog'
import type { albums } from '../../data/homeCatalog'
import { AlbumArtwork } from './AlbumArtwork'
import { PlayButton } from './HomeControls'

type AlbumEntry = (typeof albums)[number]

export function AlbumCard({ album, onPlay }: { album: AlbumEntry; onPlay: () => void }) {
  return (
    <li className="home-album">
      <a href={`#${albumPath(album.id)}`}>
        <AlbumArtwork album={album} />
        <strong>{album.title}</strong>
        <small>{album.artistName}</small>
      </a>
      <PlayButton label={`Preview ${album.title}`} onClick={onPlay} />
    </li>
  )
}
