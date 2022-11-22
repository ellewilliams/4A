import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

export const Artist = ({ artist, featureColour, darkMode }) => (
  <div className="page-grid mt-4">
    <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-3 3xl:col-span-6 3xl:col-start-4 mt-8 lg:mt-12">
      <div>
        <div
          className={`${
            darkMode ? "#fff" : "border-silver-chalice"
          } mb-14 md:mb-15 lg:mb-16 border-b-3`}
        />
        <h3
          className="heading-4 mb-7"
          style={{ color: darkMode ? "#fff" : featureColour }}
        >
          About the artist
        </h3>
      </div>
      <div className="grid grid-cols-12 gap-x-5 md:grid-cols-10 md:gap-x-10 lg:grid-cols-6 lg:gap-x-12 xl:gap-x-16">
        <div className="order-2 md:order-1 col-span-12 col-start-1 md:col-span-6 lg:col-span-4">
          {artist.shortBiography && (
            <div
              className="body-sans mb-4 lg:mb-7"
              dangerouslySetInnerHTML={{ __html: artist.shortBiography }}
              style={{
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
                display: "-webkit-box",
              }}
            />
          )}
          <Link
            to={`/creatives/${artist.slug}`}
            aria-label={`Read more about ${artist.name}`}
            className="body-sans underline"
          >
            Read more
          </Link>
        </div>
        <div className="order-1 mb-3 md:order-2 col-span-4 md:col-span-3 md:col-start-8 lg:col-span-2 lg:col-start-5">
          <Link
            to={`/creatives/${artist.slug}`}
            aria-label={`Read more about ${artist.name}`}
          >
            <GatsbyImage
              image={artist.profileImage.gatsbyImageData}
              alt={artist.profileImage.alt || artist.name}
            />
          </Link>
        </div>
      </div>
    </div>
  </div>
)
