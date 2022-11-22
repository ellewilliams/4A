import React from "react"
import Layout from "../components/layout"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { graphql, Link } from "gatsby"
import { Artist } from "../components/digital/artist"
import { Text } from "../components/digital/text"
import { Image } from "../components/digital/image"
import { Gallery } from "../components/gallery"
import { Video } from "../components/digital/video"
import { Iframe } from "../components/digital/iframe"
import { InlineIframe } from "../components/digital/inline-iframe"
import { GatsbyImage } from "gatsby-plugin-image"

export enum CONTENT_BLOCKS {
  IMAGE = "DatoCmsImage",
  TEXT = "DatoCmsTextBlock",
  GALLERY = "DatoCmsImageGallery",
  INTERNAL_VIDEO = "DatoCmsInternalVideo",
  EXTERNAL_VIDEO = "DatoCmsExternalVideo",
  POPUP_IFRAME = "DatoCmsPopUpIframe",
	INLINE_IFRAME = "DatoCmsInlineIframe",
}

const DigitalProject = ({ data, pageContext }) => {
  const { title, seoMetaTag, artist, contentBlock, credits, publicationDate } =
    data.datoCmsDigitalProject
  const { featureColour, darkMode } = pageContext
  const otherDigital = data.allDatoCmsDigitalProject.nodes

  return (
    <Layout
      featureColor={featureColour}
      theme={darkMode ? "codgray" : "white"}
      darkMode={darkMode}
    >
      <HelmetDatoCms title={title} seo={seoMetaTag} />
      <div className="container-fluid digital-project section-gap-padding">
        <div className="page-grid page-top">
          <div className="col-span-12 md:col-span-3 md:col-start-9 mb-3 lg:mb-6">
            <div className="heading-3 text-silver-chalice">
              <Link to="/digital">4A Digital</Link>
            </div>
          </div>
          <h2
            className="heading-feature col-span-12 mb-9 sm:mb-11 lg:mb-12"
            style={{ color: featureColour }}
          >
            {title}
            <br />
            <span className="font-normal artist-name">
              {artist.map(({ name }, index: number) => (
                <span key={index}>{name}</span>
              ))}
            </span>
          </h2>
        </div>
        {contentBlock.map((block: any) => {
          switch (block.internal.type) {
            case CONTENT_BLOCKS.IMAGE:
              return <Image key={block.id} block={block} />
            case CONTENT_BLOCKS.TEXT:
              return <Text key={block.id} block={block} />
            case CONTENT_BLOCKS.GALLERY:
              return <Gallery key={block.id} block={block} />
            case CONTENT_BLOCKS.INTERNAL_VIDEO:
              return <Video key={block.id} block={block} />
            case CONTENT_BLOCKS.EXTERNAL_VIDEO:
              return <Video key={block.id} block={block} />
            case CONTENT_BLOCKS.POPUP_IFRAME:
              return (
                <Iframe
                  key={block.id}
                  block={block}
                  featureColour={featureColour}
                  title={title}
                />
              )
						case CONTENT_BLOCKS.INLINE_IFRAME:
							return (
								<InlineIframe
									key={block.id}
									block={block}
									title={title}
								/>
							)
          }
        })}
        <div className="credits block page-grid">
          {credits && (
            <div
              className="small-sans col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-3 3xl:col-span-6 3xl:col-start-4"
              dangerouslySetInnerHTML={{
                __html: credits,
              }}
            />
          )}
          <div className="small-sans col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-3 3xl:col-span-6 3xl:col-start-4 mt-4">
            Published {publicationDate}
          </div>
        </div>
        {artist.map((artist: any) => (
          <Artist
            artist={artist}
            featureColour={featureColour}
            darkMode={darkMode}
            key={artist.id}
          />
        ))}
      </div>
      <div className="related-events bg-transparent-grey mt-6 md:mt-8">
        <div className="container-fluid page-grid py-12 md:py-16 lg:py-20">
          <h4 className="heading-3-4 col-span-12 mb-6 md:mb-8 text-silver-chalice">
            See more of 4A Digital
          </h4>
          {otherDigital.map((project) => (
            <Link
              to={`/digital/${project.slug}`}
              key={project.id}
              className="col-span-6 lg:col-span-4 medium-gap"
            >
              <div>
                <GatsbyImage
                  image={project.featureImage.gatsbyImageData}
                  alt={project.featureImage.alt || project.title}
                />
                <div className="my-4 md:my-5">
                  <h3 className="heading-3" style={{ color: featureColour }}>
                    {project.title}
                  </h3>
                  <h4 className="heading-3-regular artist-name">
                    <p style={{ color: featureColour }}>
                      {project.artist.map(({ name }, index: number) => (
                        <span key={index}>{name}</span>
                      ))}
                    </p>
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default DigitalProject

export const query = graphql`
  query DigitalProjectQuery($slug: String!) {
    datoCmsDigitalProject(
      slug: { eq: $slug }
      meta: { status: { eq: "published" }, isValid: { eq: true } }
    ) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      contentBlock {
        ... on DatoCmsImage {
          id
          image {
            gatsbyImageData(placeholder: NONE)
            alt
            title
          }
          imageSize
          internal {
            type
          }
        }
        ... on DatoCmsInternalVideo {
          id
          video {
            video {
              streamingUrl
            }
            alt
            title
          }
          videoSize
          internal {
            type
          }
        }
        ... on DatoCmsExternalVideo {
          id
          internal {
            type
          }
          videoSize
          video {
            url
          }
        }
        ... on DatoCmsImageGallery {
          id
          gallery {
            gatsbyImageData
            alt
            title
          }
          imageSize
          internal {
            type
          }
        }
        ... on DatoCmsTextBlock {
          id
          text
          internal {
            type
          }
        }
        ... on DatoCmsPopUpIframe {
          id
          hyperlink
          linkText
          internal {
            type
          }
        }
				... on DatoCmsInlineIframe {
          id
					iframeSize
          hyperlink
					height
          internal {
            type
          }
        }
      }
      featureColour {
        hex
      }
      id
      slug
      title
      artist {
        id
        name
        shortBiography
        biography
        slug
        profileImage {
          alt
          gatsbyImageData(
            placeholder: NONE
            aspectRatio: 1
            height: 500
            width: 500
          )
        }
      }
      publicationDate(formatString: "DD MMMM YYYY")
      credits
    }
    allDatoCmsDigitalProject(
      filter: {
        meta: { isValid: { eq: true }, status: { eq: "published" } }
        slug: { ne: $slug }
      }
      sort: { fields: publicationDate, order: DESC }
      limit: 3
    ) {
      nodes {
        slug
        title
        featureImage {
          alt
          gatsbyImageData(placeholder: NONE)
        }
        featureColour {
          hex
        }
        darkMode
        id
        artist {
          name
        }
      }
    }
  }
`
