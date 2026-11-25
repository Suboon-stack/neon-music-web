import type { Album, Artist, Playlist, Song } from '../types/music'

interface DashboardAlbum extends Album {
  artistName: string
  releaseYear: number
  cover: 'after-hours' | 'sour' | 'damn' | 'happier-than-ever' | 'divide' | 'blonde'
  coverText: string
}

interface DashboardPlaylist extends Playlist {
  description: string
  theme: 'daily' | 'focus' | 'chill' | 'workout' | 'night'
}

export const albums: DashboardAlbum[] = [
  { id: 'after-hours', title: 'After Hours', artistId: 'the-weeknd', artistName: 'The Weeknd', releaseYear: 2020, cover: 'after-hours', coverText: 'After Hours', songIds: ['blinding-lights'] },
  { id: 'sour', title: 'SOUR', artistId: 'olivia-rodrigo', artistName: 'Olivia Rodrigo', releaseYear: 2021, cover: 'sour', coverText: 'SOUR', songIds: ['deja-vu'] },
  { id: 'damn', title: 'DAMN.', artistId: 'kendrick-lamar', artistName: 'Kendrick Lamar', releaseYear: 2017, cover: 'damn', coverText: 'DAMN.', songIds: ['love'] },
  { id: 'happier-than-ever', title: 'Happier Than Ever', artistId: 'billie-eilish', artistName: 'Billie Eilish', releaseYear: 2021, cover: 'happier-than-ever', coverText: 'Happier Than Ever', songIds: ['happier-than-ever'] },
  { id: 'divide', title: '÷ (Divide)', artistId: 'ed-sheeran', artistName: 'Ed Sheeran', releaseYear: 2017, cover: 'divide', coverText: '÷', songIds: ['castle-on-the-hill'] },
  { id: 'blonde', title: 'Blonde', artistId: 'frank-ocean', artistName: 'Frank Ocean', releaseYear: 2016, cover: 'blonde', coverText: 'Blonde', songIds: ['pink-white'] },
]

export const artists: Artist[] = [
  ...albums.map((album) => ({ id: album.artistId, name: album.artistName })),
  { id: 'neon-demo', name: 'Neon Music Studio (demo)' },
]

export const songs: Song[] = [
  { id: 'blinding-lights', title: 'Blinding Lights', artistId: 'the-weeknd', albumId: 'after-hours', durationSeconds: 200 },
  { id: 'deja-vu', title: 'deja vu', artistId: 'olivia-rodrigo', albumId: 'sour', durationSeconds: 215 },
  { id: 'love', title: 'LOVE.', artistId: 'kendrick-lamar', albumId: 'damn', durationSeconds: 213 },
  { id: 'happier-than-ever', title: 'Happier Than Ever', artistId: 'billie-eilish', albumId: 'happier-than-ever', durationSeconds: 298 },
  { id: 'castle-on-the-hill', title: 'Castle on the Hill', artistId: 'ed-sheeran', albumId: 'divide', durationSeconds: 261 },
  { id: 'pink-white', title: 'Pink + White', artistId: 'frank-ocean', albumId: 'blonde', durationSeconds: 184 },
  { id: 'signal-flare', title: 'Signal Flare', artistId: 'neon-demo', durationSeconds: 204 },
  { id: 'quiet-hours', title: 'Quiet Hours', artistId: 'neon-demo', durationSeconds: 169 },
  { id: 'paper-kites', title: 'Paper Kites', artistId: 'neon-demo', durationSeconds: 192 },
  { id: 'amp-static', title: 'Amp Static', artistId: 'neon-demo', durationSeconds: 183 },
]

export const homePlaylists: DashboardPlaylist[] = [
  { id: 'daily-mix-1', name: 'Daily Mix 1', description: 'Pop favorites on rotation.', theme: 'daily', songIds: ['blinding-lights', 'deja-vu', 'castle-on-the-hill'] },
  { id: 'focus-flow', name: 'Focus Flow', description: 'Settle into your next task.', theme: 'focus', songIds: ['pink-white', 'happier-than-ever'] },
  { id: 'chill-vibes', name: 'Chill Vibes', description: 'Take the long way home.', theme: 'chill', songIds: ['love', 'pink-white'] },
]

export const playlists: DashboardPlaylist[] = [
  ...homePlaylists,
  { id: 'workout-beats', name: 'Workout Beats', description: 'High energy for your next session.', theme: 'workout', songIds: ['signal-flare', 'amp-static', 'blinding-lights'] },
  { id: 'late-night', name: 'Late Night', description: 'Low lights and slower tempos.', theme: 'night', songIds: ['quiet-hours', 'pink-white', 'paper-kites'] },
]

export function albumPath(id: string) { return `/albums/${id}` }
export function playlistPath(id: string) { return `/playlists/${id}` }
