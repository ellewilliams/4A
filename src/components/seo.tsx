import React, { FC } from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

type MetaProps = JSX.IntrinsicElements["meta"]

interface SEOProps {
  description?: string
  lang?: string
  meta?: MetaProps
  keywords?: []
  title?: string
  ogImgSrc?: string
}

const SEO: FC<SEOProps> = ({
  description,
  lang,
  meta = [],
  keywords,
  title,
  ogImgSrc,
}) => (
  <StaticQuery
    query={siteMetadataQuery}
    render={(data) => {
      const metaDescription =
        description ||
        data.datoCmsSiteSetting.description ||
        data.site.siteMetadata.description
      const metaLang = lang || data.site.siteMetadata.lang || "en"
      const metaKeywords = keywords || Array(data.site.siteMetadata.keywords)
      const metaOgImgSrc = ogImgSrc || data.datoCmsSiteSetting.ogImage.url

      return (
        <Helmet
          htmlAttributes={{
            lang: metaLang,
          }}
          title={title}
          titleTemplate={`%s | ${
            data.datoCmsSiteSetting.title || data.site.siteMetadata.title
          }`}
          meta={[
            {
              name: `description`,
              content: metaDescription,
            },
            {
              property: `og:title`,
              content: title,
            },
            {
              property: `og:description`,
              content: metaDescription,
            },
            {
              property: `og:type`,
              content: `website`,
            },
            {
              property: `og:image`,
              content: metaOgImgSrc,
            },
            {
              name: `twitter:card`,
              content: `summary`,
            },
            {
              name: `twitter:creator`,
              content: data.site.siteMetadata.author,
            },
            {
              name: `twitter:title`,
              content: title,
            },
            {
              name: `twitter:description`,
              content: metaDescription,
            },
          ]
            .concat(
              metaKeywords.length > 0
                ? {
                    name: `keywords`,
                    content: metaKeywords.join(`, `),
                  }
                : []
            )
            // @ts-ignore
            .concat(meta)}
        />
      )
    }}
  />
)

export default SEO

const siteMetadataQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        lang
        keywords
      }
    }
    datoCmsSiteSetting {
      description
      title
      ogImage {
        url
      }
    }
  }
`
