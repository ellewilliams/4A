import React, { useEffect, useRef, useState } from "react"
import { useLocation } from "@reach/router"

export const AudioPlayer = ({ block }) => {
	const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setIsPlaying] = useState<boolean>(false)
  const { pathname } = useLocation()

  useEffect(() => {
    if (playing && audioRef && audioRef.current) {
      audioRef.current.play()
      audioRef.current.volume = 0.3
      setTimeout(() => {
				setIsPlaying(false)
      }, audioRef.current.duration * 1000)
    }
  }, [playing])

  const handleClick = () => {
    setIsPlaying(!playing)
  }

	const pauseAudio = () => {
    setIsPlaying(!playing)
		audioRef.current.pause()
  }

	return (
		<div key={block.id} className="block-grid">
			<audio
				className="audio"
				loop={true}
				ref={audioRef}
			>
				<source src={block.audioFile.url} type="audio/mpeg" />
			</audio>
			<div className="player-container grid grid-cols-12 lg:grid-cols-8 gap-x-5 md:gap-x-10 lg:gap-x-12 xl:gap-x-16">
				{playing ? (
					<div
						className="pause col-span-2 md:col-span-2 md:col-start-1 lg:col-span-1 lg:col-start-1"
						onClick={() => pauseAudio()}
					/>
				) : (
					<div
						className="play col-span-2 md:col-span-2 md:col-start-1 lg:col-span-1 lg:col-start-1"
						onClick={() => handleClick()}
					/>
				)}
			</div>
		</div>
	)

  return null
}