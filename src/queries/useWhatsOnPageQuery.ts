import { useStaticQuery, graphql } from "gatsby"

export function useWhatsOnPageQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsWhatsOn(meta: {isValid: {eq: true}, status: {eq: "published"}}) {
        title
        slug
        id
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
      }
    }
  `)

  return data
}
