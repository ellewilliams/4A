import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export const Online = ({ block, papers, digitalProjects, talks }) => (
  <div className="col-span-12 page-grid section-gap container-fluid">
    <div className="latest-paper col-span-12 md:col-span-5 medium-gap">
      <h3 className="heading-3 text-silver-chalice mb-6 md:mb-8">
        {block.papersTitle}
      </h3>
      {papers.nodes.map((paper) => (
        <div key={paper.slug} className="paper mb-12 md:mb-14 lg:mb-20">
          <Link to={`/papers/${paper.slug}`}>
            <div className="relative paper-image-wrapper">
              <div
                className="colour-overlay mix-blend-color h-full w-full absolute z-10"
                style={{
                  backgroundColor: paper.featureColour.hex,
                }}
              />
              <img
                src={paper.featureImage.url}
                alt={paper.featureImage.alt}
                className="absolute h-full w-full left-0 object-cover"
              />
            </div>
            <h2 className="heading-2-regular text-torch-red my-4 md:my-5">
              {paper.title}
            </h2>
            <div
              className="my-5 md:my-6 body-sans"
              dangerouslySetInnerHTML={{
                __html: paper.summary,
              }}
            />
            <p className="my-4 md:my-5 body-sans underline">Read</p>
          </Link>
        </div>
      ))}
    </div>
    <div className="latest-digital col-span-10 col-start-3 md:col-span-6 md:col-start-7 md:mt-24 lg:mt-32 mb-12 md:mb-14 lg:mb-0">
      <h3 className="heading-3 text-silver-chalice mb-6 md:mb-8">
        {block.digitalTitle}
      </h3>
      {digitalProjects.nodes.map((digital) => (
        <div key={digital.slug} className="digital">
          <Link to={`/digital/${digital.slug}`}>
            <GatsbyImage
              image={digital.featureImage.gatsbyImageData}
              alt={digital.featureImage.alt || digital.title}
            />
            <h2 className="heading-2-regular text-torch-red my-4 md:my-5 artist-name">
              {digital.title}
              <br />
              {digital.artist.map(({ name }, index: number) => (
								<span key={index}>{name}</span>
							))}
            </h2>
            <p className="my-4 md:my-5 body-sans underline">Experience</p>
          </Link>
        </div>
      ))}
    </div>
    <div className="latest-talk col-span-10 md:col-span-4 md:-mt-6">
      <h3 className="heading-3 text-silver-chalice mb-6 md:mb-8">
        {block.talksTitle}
      </h3>
      {talks.nodes.map((talk) => (
        <div key={talk.title} className="talk mb-12 md:mb-16 lg:mb-0">
          <Link to={`/talks`}>
            <GatsbyImage
              image={talk.featureImage.gatsbyImageData}
              alt={talk.featureImage.alt || talk.title}
            />
            <h2 className="heading-2-regular text-torch-red my-4 md:my-5">
              {talk.title}
            </h2>
            <p className="my-4 md:my-5 body-sans underline">Listen</p>
          </Link>
        </div>
      ))}
    </div>
  </div>
)
