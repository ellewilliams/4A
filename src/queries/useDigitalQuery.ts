import { useStaticQuery, graphql } from "gatsby"

export function useDigitalProjectQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsDigital(
        meta: { status: { eq: "published" }, isValid: { eq: true } }
      ) {
        id
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        title
        digitalDescription
        featureColour {
          hex
        }
        credits
      }
      latestDigitalProjects: allDatoCmsDigitalProject(
        filter: { meta: { isValid: { eq: true }, status: { eq: "published" } } }
        sort: { fields: publicationDate, order: DESC }
        limit: 4
      ) {
        nodes {
          slug
          title
          featureImage {
            alt
            gatsbyImageData(placeholder: NONE)
          }
					publicationDate(formatString: "MMMM YYYY")
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
      allDatoCmsDigitalProject(
        filter: { meta: { isValid: { eq: true }, status: { eq: "published" } } }
        sort: { fields: publicationDate, order: DESC }
        skip: 4
      ) {
        nodes {
          slug
          title
          featureImage {
            alt
            gatsbyImageData(placeholder: NONE)
          }
					publicationDate(formatString: "MMMM YYYY")
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
  `)

  return data
}
