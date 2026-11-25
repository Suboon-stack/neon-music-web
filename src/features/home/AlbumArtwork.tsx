import type { albums } from '../../data/homeCatalog'

export function AlbumArtwork({ album }: { album: (typeof albums)[number] }) {
  // The adjacent title and artist provide the same information as this decoration.
  return <span className={`home-cover cover--${album.cover}`} aria-hidden="true"><span>{album.coverText}</span></span>
}
