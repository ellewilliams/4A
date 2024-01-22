import { useStaticQuery, graphql } from "gatsby"

export function useArchiveQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsArchive(
        meta: { isValid: { eq: true }, status: { ne: "draft" } }
      ) {
        archiveDisclaimer
      }
      allDatoCmsExhibition(
        filter: { meta: { isValid: { eq: true }, status: { ne: "draft" } } }
        sort: { fields: startDate, order: DESC }
      ) {
        nodes {
          id
          slug
					dateTextOverride
          exhibitionStatus
          startDate
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
        filter: { meta: { isValid: { eq: true }, status: { ne: "draft" } } }
        sort: { fields: eventDates, order: DESC }
      ) {
        nodes {
          eventDates {
            eventDateTime
            id
          }
          id
          slug
          eventStatus
          eventType {
            eventType
          }
					endDate
					dateTextOverride
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
