import React, { useLayoutEffect, useRef, useState } from "react"
import { useLocation } from "@reach/router"

export const Audio = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setIsPlaying] = useState<boolean>(false)
  const { pathname } = useLocation()
  const safePassage = pathname.includes("safe-passage")

  useLayoutEffect(() => {
    if (playing && audioRef && audioRef.current) {
      audioRef.current.play()
      audioRef.current.volume = 0.3
      setTimeout(() => {
        if (!safePassage) {
          audioRef.current.pause()
          setIsPlaying(false)
        }
      }, audioRef.current.duration * 1000)
    }
  }, [playing])

  const handleClick = () => {
    setIsPlaying(!playing)
  }

  if (src) {
    return (
      <>
        <audio
          className="audio"
          loop={safePassage ? true : false}
          ref={audioRef}
        >
          <source src={src} type="audio/mpeg" />
        </audio>
        <div className="player-container grid grid-cols-12 lg:grid-cols-8 gap-x-5 md:gap-x-10 lg:gap-x-12 xl:gap-x-16 my-6 md:my-8 lg:my-10">
          {playing ? (
            <div
              className="pause col-span-2 md:col-span-2 md:col-start-1 lg:col-span-1 lg:col-start-1"
              onClick={() => handleClick()}
            />
          ) : (
            <div
              className="play col-span-2 md:col-span-2 md:col-start-1 lg:col-span-1 lg:col-start-1"
              onClick={() => handleClick()}
            />
          )}
        </div>
      </>
    )
  }

  return null
}
