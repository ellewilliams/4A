import { useStaticQuery, graphql } from "gatsby"

export function usePeopleQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsPeoplePage(
        meta: { isValid: { eq: true }, status: { eq: "published" } }
      ) {
        title
        slug
        id
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        staff {
          name
          bio
          peoplePosition
          image {
            gatsbyImageData
            alt
          }
          pronouns
          pronounciation {
            url
          }
        }
        board {
          name
          bio
          peoplePosition
          image {
            gatsbyImageData
            alt
          }
        }
        alumni {
          title
          names
        }
      }
    }
  `)

  return data
}
