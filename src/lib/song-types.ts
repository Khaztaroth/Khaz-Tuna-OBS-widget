export type MusicData = {
    album: string
    artists: string[]
    cover_path: string
    cover_url: string
    duration: number
    lyrics: string
    playback_date: string
    playback_time: string
    status: string
    status_id: number
    title: string
  }

  export type PreviousMusicData = Record<string, {artist: string[], title: string, cover_path: string}>