import * as React from "react"
import ReactPlayer from "react-player"
import { useLocation } from "@reach/router"
import { CONTENT_BLOCKS } from "../../templates/article"

export enum VIDEO_SIZES {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

function handleImageSize(size: string): string {
  switch (size) {
    case VIDEO_SIZES.SMALL:
      return "col-span-8 col-start-3 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-3 3xl:col-span-3 3xl:col-start-3"
    case VIDEO_SIZES.MEDIUM:
      return "col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-2 3xl:col-span-5 3xl:col-start-2"
    case VIDEO_SIZES.LARGE:
      return "col-span-12 lg:col-span-8"
  }
}

export const Video = ({ block }) => {
  const { videoSize, video } = block
  const { pathname } = useLocation()
  const safePassage = pathname.includes("safe-passage")
  const internal = block.internal.type === CONTENT_BLOCKS.INTERNAL_VIDEO

  return (
    <div className="block-grid">
      <div className={handleImageSize(videoSize)}>
        <div
          className={`${!internal ? "player-wrapper" : ""} ${
            safePassage ? "relative" : "z-1"
          }`}
          style={safePassage ? { marginTop: -100 } : {}}
        >
          <ReactPlayer
            url={internal ? video.video.streamingUrl : video.url}
            width="100%"
            height="100%"
            className={!internal ? "player" : ""}
            muted={internal ? true : false}
            loop={internal ? true : false}
            playing={internal ? true : false}
          />
        </div>
      </div>
      <div className={handleImageSize(videoSize)}>
        {video.title && (
          <p className="small-sans mt-1 text-silver-chalice">{video.title}</p>
        )}
      </div>
    </div>
  )
}
