import { useStaticQuery, graphql } from "gatsby"

export function usePaperQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsPapersPage {
        featureColour {
          hex
        }
        papersDescription
        credits
      }
      allDatoCmsPaper(
					filter: { 
					meta: { isValid: { eq: true }, status: { ne: "draft" } }}
					sort: { fields: publishedMonth, order: DESC }
				) {
        nodes {
          featureColour {
            hex
          }
          featureImage {
            gatsbyImageData(width: 800, placeholder: NONE)
            url
            alt
          }
          id
          summary
          title
          publishedMonth(formatString: "MMMM YYYY")
          slug
        }
      }
    }
  `)

  return data
}
