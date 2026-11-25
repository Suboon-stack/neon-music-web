import { formatTime } from '../../utils/formatTime'
import { routes } from '../../app/router'
import { albums, artists } from '../../data/homeCatalog'
import { AlbumArtwork } from './AlbumArtwork'
import { FavoriteButton, HomeIcon, PlayButton } from './HomeControls'
import type { usePreviewPlayer } from './usePreviewPlayer'

interface MiniPlayerProps {
  player: ReturnType<typeof usePreviewPlayer>
  favorite: boolean
  onFavorite: () => void
}

export function MiniPlayer({ player, favorite, onFavorite }: MiniPlayerProps) {
  const { track, elapsed, isPreviewing, toggle, skip, seek, volume, setVolume, repeat, toggleRepeat, isShuffled, toggleShuffle } = player
  const album = albums.find((item) => item.id === track.albumId)

  const artist = artists.find((item) => item.id === track.artistId)

  return (
    <section className="mini-player" aria-label="Mini-player">
      <div className="mini-current">
        <a className="mini-track" href={`#${routes.player.path}`} aria-label={`Open Now Playing: ${track.title}${artist ? ` by ${artist.name}` : ''}`}>
          {album && <AlbumArtwork album={album} />}
          <span className="mini-track-text">
            <strong>{track.title}</strong>
            <small>{artist?.name}</small>
            <small className="mini-preview-note">Simulation · No audio</small>
          </span>
        </a>
        <FavoriteButton label={`Favorite ${track.title}`} pressed={favorite} onClick={onFavorite} />
      </div>
      <div className="mini-controls">
        <button className="mini-secondary" type="button" aria-label="Shuffle" aria-pressed={isShuffled} onClick={toggleShuffle}><HomeIcon icon="shuffle" /></button>
        <button type="button" aria-label="Previous track" onClick={() => skip(-1)}><HomeIcon icon="previous" /></button>
        <PlayButton label={isPreviewing ? 'Pause preview' : 'Play preview'} paused={!isPreviewing} onClick={toggle} />
        <button type="button" aria-label="Next track" onClick={() => skip(1)}><HomeIcon icon="next" /></button>
        <button className="mini-secondary" type="button" aria-label="Repeat track" aria-pressed={repeat} onClick={toggleRepeat}><HomeIcon icon="repeat" /></button>
      </div>
      <div className="mini-sliders">
        <div className="mini-progress">
          <span aria-hidden="true">{formatTime(elapsed)}</span>
          <input type="range" aria-label="Preview position" aria-valuetext={`${formatTime(elapsed)} of ${formatTime(track.durationSeconds)}`} min={0} max={track.durationSeconds} value={elapsed} onChange={(event) => seek(event.currentTarget.valueAsNumber)} />
          <span aria-hidden="true">{formatTime(track.durationSeconds)}</span>
        </div>
        <div className="mini-volume">
          <HomeIcon icon="volume" />
          <input type="range" aria-label="Preview volume" aria-valuetext={`${volume}%`} min={0} max={100} value={volume} onChange={(event) => setVolume(event.currentTarget.valueAsNumber)} />
        </div>
      </div>
    </section>
  )
}
