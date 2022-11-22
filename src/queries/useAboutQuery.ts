import { useStaticQuery, graphql } from "gatsby"

export function useAboutQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsAbout(meta: {isValid: {eq: true}, status: {eq: "published"}}) {
        title
        slug
        id
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        headerImage {
          gatsbyImageData
          alt
          title
        }
        description
        additionalInfo {
          title
          description
        }
        historyTitle
        headerImageHistory {
          gatsbyImageData
          alt
          title
        }
        descriptionHistory
      }
    }
  `)

  return data
}
