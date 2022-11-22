import { useStaticQuery, graphql } from "gatsby"

export function useKidsQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsKidsPage(meta: {isValid: {eq: true}, status: {eq: "published"}}) {
        title
        titleImage {
          gatsbyImageData(placeholder: NONE)
        }
        slug
        id
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        description
      }
      allDatoCmsKidsProject(
        filter: { meta: { isValid: { eq: true }, status: { eq: "published" } } }
        sort: { fields: publicationDate, order: DESC }
        ) {
        nodes {
          title
          image {
            alt
            gatsbyImageData(placeholder: NONE)
          }
          file {
            url
          }
        }
      }
    }
  `)

  return data
}
