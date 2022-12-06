import { useStaticQuery, graphql } from "gatsby"

export function useOpportunitiesQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsOpportunitiesPage(meta: {isValid: {eq: true}, status: {eq: "published"}}) {
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
        opportunities {
          title
          organisation
					closingDateTime
          image {
            gatsbyImageData
            alt
            title
          }
          description
					additionalInfo {
						url
					}
        }
      }
    }
  `)

  return data
}
