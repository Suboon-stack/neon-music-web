import { albums, artists, playlists, songs } from './homeCatalog'

export const genres = ['All', 'Pop', 'Hip-Hop', 'R&B', 'Indie', 'Rock', 'Electronic', 'Lo-Fi'] as const
export type Genre = (typeof genres)[number]

// These are demo filter assignments for tracks in the sample catalog.
const sampleGenres: Record<string, Exclude<Genre, 'All'>> = {
  'blinding-lights': 'Pop',
  'deja-vu': 'Pop',
  love: 'Hip-Hop',
  'happier-than-ever': 'Pop',
  'castle-on-the-hill': 'Pop',
  'pink-white': 'R&B',
  'paper-kites': 'Indie',
  'amp-static': 'Rock',
  'signal-flare': 'Electronic',
  'quiet-hours': 'Lo-Fi',
}

export const trendingAlbums = albums.slice(0, 4)
export const editorialAlbums = [albums[5], albums[4]]
export const popularPlaylists = ['workout-beats', 'chill-vibes', 'focus-flow', 'late-night']
  .flatMap((id) => playlists.filter((playlist) => playlist.id === id))

export function searchMusic(query: string, genre: Genre) {
  const term = query.trim().toLowerCase()
  const matches = (...values: string[]) => values.some((value) => value.toLowerCase().includes(term))
  const genreSongs = songs.filter((song) => genre === 'All' || sampleGenres[song.id] === genre)
  const inGenre = (id: string) => genreSongs.some((song) => song.id === id)

  return {
    albums: albums.filter((album) => album.songIds.some(inGenre) && matches(album.title, album.artistName)),
    artists: artists.filter((artist) => matches(artist.name) && genreSongs.some((song) => song.artistId === artist.id)),
    songs: genreSongs.filter((song) => {
      const artist = artists.find((item) => item.id === song.artistId)
      const album = albums.find((item) => item.id === song.albumId)
      return matches(song.title, artist?.name ?? '', album?.title ?? '')
    }),
  }
}
