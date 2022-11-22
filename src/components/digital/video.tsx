import * as React from "react"
import ReactPlayer from "react-player"
import { useLocation } from "@reach/router"
import { CONTENT_BLOCKS } from "../../templates/article"

enum IMAGE_SIZES {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

function handleImageSize(size: string): string {
  switch (size) {
    case IMAGE_SIZES.SMALL:
      return "col-span-8 col-start-3 md:col-span-6 md:col-start-4 lg:col-span-5 lg:col-start-4 3xl:col-span-4 3xl:col-start-5"
    case IMAGE_SIZES.MEDIUM:
      return "col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-3 3xl:col-span-6 3xl:col-start-4"
    case IMAGE_SIZES.LARGE:
      return "col-span-12 lg:col-span-10 lg:col-start-2"
  }
}

export const Video = ({ block }) => {
  const { videoSize, video } = block
  const internal = block.internal.type === CONTENT_BLOCKS.INTERNAL_VIDEO

  return (
    <div className="page-grid block">
      <div className={handleImageSize(videoSize)}>
        <div
          className={`${!internal ? "player-wrapper" : ""} "z-1"
          `}
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
