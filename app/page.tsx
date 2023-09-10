'use client'

import { useEffect, useState } from "react"

export interface MusicData {
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

export default function MusicInfo() {
    const [data, setData] = useState<MusicData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    const [songTitle, setSongTitle] = useState<string>('')
    const [artists, setArtists] = useState<Array<string>>([])
    const [album, setAlbum] = useState<string>('')
    const [imgUrl, setImgUrl] = useState<string>('')

    const fetchMusicData = () => {
        fetch("http://localhost:1608/", {cache: 'force-cache', next: {revalidate: 120}})
        .then(async (res) => {
            const info: MusicData = await res.json()
            if (info.title !== data?.title) {
                setSongTitle(info.title)
            }
            if (info.artists !== data?.artists) {
                setArtists(info.artists || [])
            }
            if (info.album !== data?.album) {
                setAlbum(info.album)
            }

            if (info.cover_url !== data?.cover_url) {
                setImgUrl(info.cover_path)
            }
            setData(info)
        })
        .catch((e) => {
            if (e instanceof Error) {
                setError(e.message)
            }
        })
        .finally(() =>{
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchMusicData()
        const fetchInterval = setInterval(() => {
            fetchMusicData()
        }, 500)
        return () => clearInterval(fetchInterval)
    }, [])

    const loadingComponent = (
                            <div className="bg-black bg-opacity-25 text-white p-2 rounded-md">
                                <div className="flex flex-row">
                                 <div className="flex-col flex-4">
                                 <div className="text-xl sm:text-6xl md:text-7xl  xl:text-8xl align-middle">Loading...</div>
                                    <div className="text-sm sm:text-4xl md:text-5xl  xl:text-6xl align-middle">Loading...</div>
                                </div>
                                </div> 
                            </div>
                            )
    const errorComponent = <div className="text-red-500">Error: {error}</div>
    const songComponent =   (
                            <div className="bg-black bg-opacity-25 text-white p-2 sm:p-3 rounded-md">
                                <div className="flex flex-row">
                                    <img className="flex-shrink h-24 sm:h-32 md:h-48 xl:h-56 rounded-md mr-5" src={imgUrl}/>
                                <div className="flex-col flex-4 align-middle my-auto">
                                    <div className="text-xl sm:text-6xl md:text-7xl xl:text-8xl align-middle"><i>{songTitle}</i></div>
                                    <div className="text-sm sm:text-4xl md:text-5xl xl:text-6xl align-middle">by <i>{artists}</i></div>
                                </div>
                                </div> 
                            </div>
                            )

    return (
        <div className="p-2">
            {loading? (
                loadingComponent) : error? (
                    errorComponent ) : (
                        songComponent )
            }
        </div>
    )
}