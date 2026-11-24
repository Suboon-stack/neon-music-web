export interface Artist {
  id: string
  name: string
}

export interface Song {
  id: string
  title: string
  artistId: Artist['id']
  albumId?: Album['id']
  durationSeconds: number
}

export interface Album {
  id: string
  title: string
  artistId: Artist['id']
  songIds: Song['id'][]
}

export interface Playlist {
  id: string
  name: string
  songIds: Song['id'][]
}
