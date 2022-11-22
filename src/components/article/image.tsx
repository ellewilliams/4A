import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { IMAGE_SIZES } from "../digital/image"

function handleImageSize(size: string) {
  switch (size) {
    case IMAGE_SIZES.SMALL:
      return "col-span-8 col-start-3 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-3 3xl:col-span-3 3xl:col-start-3"
    case IMAGE_SIZES.MEDIUM:
      return "col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-2 3xl:col-span-5 3xl:col-start-2"
    case IMAGE_SIZES.LARGE:
      return "col-span-12 lg:col-span-8"
  }
}

export const Image = ({ block }) => (
  <div key={block.id} className="block-grid">
    <div className={handleImageSize(block.imageSize)}>
      <GatsbyImage
        className="align-middle"
        image={block.image.gatsbyImageData}
        alt={block.image.alt || block.image.title}
      />
    </div>
    <div className={handleImageSize(block.imageSize)}>
      {block.image.title && (
        <p className="small-sans mt-1 text-silver-chalice">
          {block.image.title}
        </p>
      )}
    </div>
  </div>
)
