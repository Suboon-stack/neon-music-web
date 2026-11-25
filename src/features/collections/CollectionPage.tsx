import { PageContainer } from '../../components/layout/PageContainer'
import { songs } from '../../data/homeCatalog'
import type { albums, playlists } from '../../data/homeCatalog'
import { formatTime } from '../../utils/formatTime'
import { AlbumArtwork } from '../home/AlbumArtwork'
import { FavoriteButton, HomeIcon, PlayButton } from '../home/HomeControls'
import type { usePreviewPlayer } from '../home/usePreviewPlayer'
import { TrackList } from './TrackList'

type Collection = (typeof albums)[number] | (typeof playlists)[number]

export function CollectionPage({ collection, player, favorite, onFavorite }: {
  collection: Collection
  player: ReturnType<typeof usePreviewPlayer>
  favorite: boolean
  onFavorite: () => void
}) {
  const tracks = collection.songIds.flatMap((id) => songs.filter((song) => song.id === id))
  const orderedIds = tracks.map((song) => song.id)
  const count = `${tracks.length} ${tracks.length === 1 ? 'track' : 'tracks'}`
  const duration = tracks.reduce((total, song) => total + song.durationSeconds, 0)
  const album = 'title' in collection ? collection : undefined
  const playlist = 'name' in collection ? collection : undefined
  const title = album?.title ?? playlist?.name ?? ''

  const artwork = album ? <AlbumArtwork album={album} /> : (
    <div className={`collection-playlist-art playlist--${playlist?.theme}`} aria-hidden="true">
      <span>{playlist?.name}</span>
    </div>
  )

  return (
    <PageContainer
      title={title}
      className="collection-page"
      artwork={artwork}
      headerDetails={(
        <>
          <p className="collection-description">{album?.artistName ?? playlist?.description}</p>
          <p className="collection-meta">
            {album && <><span>{album.releaseYear}</span> · </>}
            {count}
            {playlist && tracks.length > 0 && <> · {formatTime(duration)} total</>}
          </p>
          <div className="collection-actions">
            <PlayButton
              text="Play"
              label={`Play ${title} preview`}
              disabled={!tracks.length}
              onClick={() => player.start(orderedIds, { shuffle: false })}
            />
            {playlist && tracks.length > 1 && (
              <button
                type="button"
                className="button button--secondary collection-shuffle"
                aria-label={`Shuffle ${title}`}
                onClick={() => player.shuffleCollection(orderedIds)}
              >
                <HomeIcon icon="shuffle" />
                Shuffle
              </button>
            )}
            <FavoriteButton label={`Favorite ${title}`} pressed={favorite} onClick={onFavorite} />
          </div>
        </>
      )}
    >
      <section aria-labelledby="collection-tracks">
        <h2 className="home-section-title" id="collection-tracks">Tracks</h2>
        {tracks.length ? (
          <TrackList
            songs={tracks}
            currentId={player.track.id}
            onPlay={(song) => player.start(orderedIds, { trackId: song.id })}
            linkAlbums={Boolean(playlist)}
            numbered
          />
        ) : <p className="collection-empty">This {album ? 'album' : 'playlist'} has no tracks in the local catalog.</p>}
      </section>
    </PageContainer>
  )
}
