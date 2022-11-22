import { useStaticQuery, graphql } from "gatsby"

export function useTalksQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsTalksPage(
        meta: { isValid: { eq: true }, status: { eq: "published" } }
      ) {
        title
        slug
        headerImage {
          alt
          gatsbyImageData(placeholder: NONE)
          title
        }
        id
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        description
      }
      allDatoCmsTalk(
        filter: { meta: { isValid: { eq: true }, status: { eq: "published" } } }
        sort: { fields: talkDate, order: DESC }
      ) {
        nodes {
          title
          description
          featureImage {
            alt
            gatsbyImageData(placeholder: NONE)
          }
          externalVideo {
            url
            providerUid
            title
          }
          audioPlayerEmbed
          transcript {
            url
          }
          associatedEvent {
            slug
            id
          }
          talkDate(formatString: "DD MMMM YYYY")
        }
      }
    }
  `)

  return data
}
