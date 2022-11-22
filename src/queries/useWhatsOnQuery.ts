import { useStaticQuery, graphql } from "gatsby"

export function useWhatsOnQuery() {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsExhibition(
        filter: { endDate: { gte: "2022" } } 
        sort: { fields: startDate, order: ASC }
      ) {
        nodes {
          id
          slug
          exhibitionStatus
          startDate(formatString: "DD MMMM")
          endDate
          featureImageVideo {
            alt
            gatsbyImageData(placeholder: NONE)
            video {
              streamingUrl
            }
          }
          formattedTitle
          locations {
            id
            location {
              title
            }
          }
        }
      }
      allDatoCmsEvent(
        filter: { endDate: { gte: "2022" } }
        sort: { fields: eventDates___eventDateTime, order: DESC }
      ) {
        nodes {
          eventDates {
            eventDateTime
            id
          }
          id
          slug
          eventType {
            eventType
          }
          locations {
            id
            location {
              title
            }
          }
          featureImageVideo {
            alt
            gatsbyImageData
            video {
              streamingUrl
            }
          }
          title
        }
      }
    }
  `)

  return data
}
