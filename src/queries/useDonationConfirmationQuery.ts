import { useStaticQuery, graphql } from "gatsby"

export function useDonationConfirmationQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsDonationConfirmation(
        meta: { isValid: { eq: true }, status: { eq: "published" } }
      ) {
        title
        slug
        id
        heading
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        description
      }
    }
  `)

  return data
}
