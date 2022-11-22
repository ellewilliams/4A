import React from "react"
import Layout from "../components/layout"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { graphql } from "gatsby"
import { Audio } from "../components/audio"
import { Gallery } from "../components/gallery"
import { SideBar } from "../components/sideBar"
import { Author } from "../components/article/author"
import { Note } from "../components/article/note"
import { Text } from "../components/article/text"
import { Quote } from "../components/article/quote"
import { Image } from "../components/article/image"
import { Video } from "../components/article/video"
import { MobileSideBar } from "../components/mobileSideBar"
import { useLocation } from "@reach/router"
import { useThemeColor } from "../hooks/useThemeColor"
import { ArticleJsonLd } from "gatsby-plugin-next-seo"
import { isBrowser } from "../utils/isBrowser"

export enum CONTENT_BLOCKS {
  IMAGE = "DatoCmsImage",
  TEXT = "DatoCmsTextBlock",
  QUOTE = "DatoCmsTextQuote",
  NOTE = "DatoCmsNote",
  GALLERY = "DatoCmsImageGallery",
  INTERNAL_VIDEO = "DatoCmsInternalVideo",
  EXTERNAL_VIDEO = "DatoCmsExternalVideo",
}

const Article = ({ data, pageContext }) => {
  const { darkMode, featureColour } = pageContext
  const {
    title,
    author,
    contentBlock,
    paper,
    seoMetaTags,
    featureImage,
    meta: { updatedAt, firstPublishedAt },
  } = data.datoCmsArticle
  const { color } = useThemeColor("pampas")
  const { pathname } = useLocation()
  const safePassage = pathname.includes("safe-passage")

  return (
    <Layout
      featureColor={featureColour}
      theme={darkMode ? "codgray" : "pampas"}
      darkMode={darkMode}
    >
      <HelmetDatoCms title={title} seo={seoMetaTags} />
      <ArticleJsonLd
        url={isBrowser && window.location.toString()}
        headline={title}
        images={[featureImage.url]}
        datePublished={firstPublishedAt}
        dateModified={updatedAt}
        authorName={author[0].name}
        authorType="Person"
        publisherName="4A Centre for Contemporary Asian Art"
        publisherLogo="https://www.datocms-assets.com/53320/1627883556-4afavicon.png"
        description={seoMetaTags?.tags[3]?.attributes?.content || ""}
      />
      <div className="papers-grid">
        <div className="col-span-12 lg:col-span-8 3xl:col-span-7">
          <div className="header-wrapper grid grid-cols-12 lg:grid-cols-8 3xl:grid-cols-7 gap-x-5 md:gap-x-10 lg:gap-x-14 mt-10 sm:mt-14 lg:mt-12 mb-9 sm:mb-11 lg:mb-12">
            <h2
              className="heading-1 col-span-12 lg:col-span-8 3xl:col-span-7"
              style={{ color: darkMode ? "#fff" : featureColour }}
            >
              {title}
            </h2>
            <h2
              className="heading-1 col-span-10 col-start-3 lg:col-span-7 lg:col-start-2 3xl:col-span-7 3xl:col-start-2"
              style={{ color: darkMode ? "#fff" : featureColour }}
            >
              <span className="font-normal">{author[0].name}</span>
            </h2>
          </div>
          <Audio
            src={
              safePassage &&
              "https://www.datocms-assets.com/53320/1630318949-beach.mp3"
            }
          />
          {contentBlock.map((block: any) => {
            switch (block.internal.type) {
              case CONTENT_BLOCKS.IMAGE:
                return <Image key={block.id} block={block} />
              case CONTENT_BLOCKS.TEXT:
                return (
                  <Text
                    key={block.id}
                    block={block}
                    safePassage={safePassage}
                  />
                )
              case CONTENT_BLOCKS.QUOTE:
                return (
                  <Quote
                    key={block.id}
                    block={block}
                    featureColour={featureColour}
                    darkMode={darkMode}
                  />
                )
              case CONTENT_BLOCKS.NOTE:
                return (
                  <Note
                    key={block.id}
                    block={block}
                    featureColour={featureColour}
                    darkMode={darkMode}
                  />
                )
              case CONTENT_BLOCKS.GALLERY:
                return <Gallery key={block.id} block={block} />
              case CONTENT_BLOCKS.INTERNAL_VIDEO:
                return <Video key={block.id} block={block} />
              case CONTENT_BLOCKS.EXTERNAL_VIDEO:
                return <Video key={block.id} block={block} />
            }
          })}
        </div>
        {paper && (
          <div className="col-span-12 col-start-0 lg:col-span-4 lg:col-start-9">
            <SideBar
              backgroundColor={color}
              featureColour={featureColour}
              publishedMonth={paper.publishedMonth}
              articles={paper.paperArticles}
              title={paper.title}
              slug={paper.slug}
            />
            <MobileSideBar
              backgroundColor={color}
              featureColour={featureColour}
              publishedMonth={paper.publishedMonth}
              articles={paper.paperArticles}
              title={paper.title}
              slug={paper.slug}
            />
          </div>
        )}
      </div>
      <Author
        author={author}
        featureColour={featureColour}
        darkMode={darkMode}
      />
    </Layout>
  )
}

export default Article

export const query = graphql`
  query ArticleQuery($slug: String!) {
    datoCmsArticle(
      slug: { eq: $slug }
    ) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      meta {
        updatedAt
        firstPublishedAt
      }
      featureImage {
        url
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
        ... on DatoCmsTextQuote {
          id
          quote
          internal {
            type
          }
        }
        ... on DatoCmsNote {
          id
          internal {
            type
          }
          notes
        }
      }
      featureColour {
        hex
      }
      id
      letterFromTheEditor
      slug
      title
      paper {
        publishedMonth(formatString: "MMMM YYYY")
        title
        slug
        paperArticles {
          id
          title
          slug
          featureColour {
            hex
          }
          author {
            name
          }
        }
      }
      author {
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
    }
  }
`
