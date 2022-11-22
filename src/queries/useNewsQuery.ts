import { useStaticQuery, graphql } from "gatsby"

export function useNewsQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsNews(meta: {isValid: {eq: true}, status: {eq: "published"}}) {
        title
        slug
        id
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        description
        titleMedia
        descriptionMedia
      }
      allDatoCmsNewsPost(
        filter: { meta: { isValid: { eq: true }, status: { eq: "published" } } }
        sort: { fields: datePosted, order: DESC }
        ) {
        nodes {
          title
          id
          link
          image {
            gatsbyImageData
            alt
          }
          datePosted(formatString: "DD MMMM YYYY")
        }
      }
      allDatoCmsMediaPost(
        filter: { meta: { isValid: { eq: true }, status: { eq: "published" } } }
        sort: { fields: datePosted, order: DESC }
        ) {
        nodes {
          title
          id
          link
          image {
            gatsbyImageData
            alt
          }
          datePosted(formatString: "DD MMMM YYYY")
        }
      }
    }
  `)

  return data
}
