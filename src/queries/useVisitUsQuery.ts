import { useStaticQuery, graphql } from "gatsby"

export function useVisitUsQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsVisit(meta: {isValid: {eq: true}, status: {eq: "published"}}) {
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
        locations {
          name
          information
          image {
            gatsbyImageData
            alt
            title
          }
          address
          googleMapsLink
        }
      }
    }
  `)

  return data
}
