import { useEffect, useState } from 'react'
import { songs } from '../../data/homeCatalog'

const catalogQueue = songs.map((song) => song.id)

function shuffleQueue(queue: string[], currentId: string) {
  const remaining = queue.filter((id) => id !== currentId)
  for (let i = remaining.length - 1; i > 0; i--) {
    const other = Math.floor(Math.random() * (i + 1))
    const item = remaining[i]
    remaining[i] = remaining[other]
    remaining[other] = item
  }
  return [currentId, ...remaining]
}

export function usePreviewPlayer() {
  const [queue, setQueue] = useState(catalogQueue)
  const [shuffledQueue, setShuffledQueue] = useState<string[] | null>(null)
  const [trackId, setTrackId] = useState(catalogQueue[0])
  const [elapsed, setElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [volume, setVolume] = useState(75)
  const track = songs.find((song) => song.id === trackId) ?? songs[0]
  const isPreviewing = isRunning && (repeat || elapsed < track.durationSeconds)
  const isShuffled = shuffledQueue !== null

  useEffect(() => {
    if (!isPreviewing) return

    // The timer updates the UI only. It never loads or plays any media.
    const interval = window.setInterval(() => {
      setElapsed((seconds) => {
        const next = seconds + 1
        if (repeat && next >= track.durationSeconds) return 0
        return Math.min(next, track.durationSeconds)
      })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [isPreviewing, repeat, track.id, track.durationSeconds])

  function start(songIds: string[], { trackId: firstId = songIds[0], shuffle = isShuffled } = {}) {
    if (!songIds.includes(firstId)) return

    setQueue(songIds)
    setShuffledQueue(shuffle ? shuffleQueue(songIds, firstId) : null)
    setTrackId(firstId)
    setElapsed(0)
    setIsRunning(true)
  }

  function shuffleCollection(songIds: string[]) {
    const randomIndex = Math.floor(Math.random() * songIds.length)
    start(songIds, { trackId: songIds[randomIndex], shuffle: true })
  }

  function toggle() {
    if (elapsed >= track.durationSeconds) setElapsed(0)
    setIsRunning(!isPreviewing)
  }

  function skip(offset: number) {
    const order = shuffledQueue ?? queue
    const index = order.indexOf(trackId)
    setTrackId(order[(index + offset + order.length) % order.length])
    setElapsed(0)
    setIsRunning(isPreviewing)
  }

  function seek(seconds: number) {
    setIsRunning(isPreviewing)
    setElapsed(seconds)
  }

  return {
    track, elapsed, isPreviewing, start, shuffleCollection, toggle, skip, seek, volume, setVolume,
    repeat, toggleRepeat: () => {
      if (!isPreviewing) setIsRunning(false)
      setRepeat(!repeat)
    },
    isShuffled, toggleShuffle: () => setShuffledQueue(isShuffled ? null : shuffleQueue(queue, trackId)),
  }
}
