import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

export enum IMAGE_SIZES {
  XSMALL = "X-SMALL",
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

function handleImageSize(size: string) {
  switch (size) {
    case IMAGE_SIZES.XSMALL:
      return "col-span-6 col-start-4 md:col-span-4 md:col-start-5 2xl:col-span-3 2xl:col-start-5"
    case IMAGE_SIZES.SMALL:
      return "col-span-8 col-start-3 md:col-span-6 md:col-start-4 lg:col-span-5 lg:col-start-4 3xl:col-span-4 3xl:col-start-5"
    case IMAGE_SIZES.MEDIUM:
      return "col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-3 3xl:col-span-6 3xl:col-start-4"
    case IMAGE_SIZES.LARGE:
      return "col-span-12 lg:col-span-10 lg:col-start-2"
  }
}

export const Image = ({ block }) => (
  <div key={block.id} className="page-grid block">
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
