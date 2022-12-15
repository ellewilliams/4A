import React, { useState } from "react"

export enum IFRAME_SIZES {
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

function handleIframeSize(size: string) {
  switch (size) {
    case IFRAME_SIZES.MEDIUM:
      return "col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-3 3xl:col-span-6 3xl:col-start-4"
    case IFRAME_SIZES.LARGE:
      return "col-span-12 lg:col-span-10 lg:col-start-2"
  }
}

export const InlineIframe = ({ block, title }) => {

  return (
    <div key={block.id} className="inline-iframe page-grid block">
      <div className={handleIframeSize(block.iframeSize)}>
				<div className="h-0 relative" style={{ paddingBottom: `${block.height}%` }}>
					<iframe
						width="100%"
						height="100%"
						className="absolute top-0 left-0 right-0 bottom-0 h-full w-full"
						src={block.hyperlink}
						title={title}
						allow="camera;fullscreen;autoplay;"
					></iframe>
				</div>
    </div>
	</div>
  )
}
