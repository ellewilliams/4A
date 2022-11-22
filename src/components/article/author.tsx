import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

export const Author = ({ author, featureColour, darkMode }) => (
  <div className="papers-grid mt-4">
    <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-2 3xl:col-span-5 3xl:col-start-2">
      <div>
        <div
          className={`${
            darkMode ? "#fff" : "border-silver-chalice"
          } mb-14 md:mb-15 lg:mb-16 mt-2 lg:mt-4 border-b-3`}
        />
        <h3
          className="heading-4 mb-7"
          style={{ color: darkMode ? "#fff" : featureColour }}
        >
          About the contributor
        </h3>
      </div>
      <div className="grid grid-cols-12 gap-x-5 md:grid-cols-10 md:gap-x-10 lg:grid-cols-6 lg:gap-x-12 xl:gap-x-16 page-gap">
        <div className="order-2 md:order-1 col-span-12 col-start-1 md:col-span-6 lg:col-span-4">
          {author[0].shortBiography && (
            <div
              className="body-sans mb-4 lg:mb-7"
              dangerouslySetInnerHTML={{ __html: author[0].shortBiography }}
              style={{
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
                display: "-webkit-box",
              }}
            />
          )}
          <Link
            to={`/creatives/${author[0].slug}`}
            aria-label={`Read more about ${author[0].name}`}
            className="body-sans underline"
          >
            Read more
          </Link>
        </div>
        <div className="order-1 mb-3 md:order-2 col-span-4 md:col-span-3 md:col-start-8 lg:col-span-2 lg:col-start-5">
          <Link
            to={`/creatives/${author[0].slug}`}
            aria-label={`Read more about ${author[0].name}`}
          >
            <GatsbyImage
              image={author[0].profileImage.gatsbyImageData}
              alt={author[0].profileImage.alt || author[0].name}
            />
          </Link>
        </div>
      </div>
    </div>
  </div>
)
