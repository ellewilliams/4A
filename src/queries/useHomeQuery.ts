import { useStaticQuery, graphql } from "gatsby"

export function useHomeQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsHome(
        meta: { isValid: { eq: true }, status: { eq: "published" } }
      ) {
        openingHours
        acknowledgementOfCountry
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        topExhibition {
          ... on DatoCmsExhibition {
            model {
              name
            }
            id
            slug
            exhibitionStatus
            startDate(formatString: "DD MMMM YYYY")
            endDate(formatString: "DD MMMM YYYY")
            featureImageVideo {
              alt
              gatsbyImageData(width: 1500, placeholder: NONE)
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
          ... on DatoCmsEventSeries {
            model {
              name
            }
            id
            slug
            startDate(formatString: "DD MMMM YYYY")
            endDate(formatString: "DD MMMM YYYY")
            featureImage {
              alt
              gatsbyImageData(width: 800, placeholder: NONE)
            }
            formattedTitle
          }
        }
        leftExhibition {
          ... on DatoCmsExhibition {
            id
            slug
            exhibitionStatus
            startDate(formatString: "DD MMMM YYYY")
            endDate(formatString: "DD MMMM YYYY")
            featureImageVideo {
              alt
              gatsbyImageData(width: 800, placeholder: NONE)
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
          ... on DatoCmsEventSeries {
            id
            slug
            startDate(formatString: "DD MMMM YYYY")
            endDate(formatString: "DD MMMM YYYY")
            featureImage {
              alt
              gatsbyImageData(width: 800, placeholder: NONE)
            }
            formattedTitle
          }
        }
        rightExhibition {
          ... on DatoCmsExhibition {
            id
            slug
            exhibitionStatus
            startDate(formatString: "DD MMMM YYYY")
            endDate(formatString: "DD MMMM YYYY")
            featureImageVideo {
              alt
              gatsbyImageData(width: 800, placeholder: NONE)
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
          ... on DatoCmsEventSeries {
            id
            slug
            startDate(formatString: "DD MMMM YYYY")
            endDate(formatString: "DD MMMM YYYY")
            featureImage {
              alt
              gatsbyImageData(width: 800, placeholder: NONE)
            }
            formattedTitle
          }
        }
        content {
          ... on DatoCmsEventsBlock {
            id
            eventsHeading
            internal {
              type
            }
          }
          ... on DatoCmsOnlineContent {
            id
            digitalTitle
            talksTitle
            papersTitle
            internal {
              type
            }
          }
          ... on DatoCmsInformationBlock {
            id
            title
            description
            internal {
              type
            }
            link
            callToAction
            image {
              alt
              gatsbyImageData(placeholder: NONE)
            }
          }
          ... on DatoCmsAnnouncementPanel {
            id
            heading
            subHeading
            internal {
              type
            }
            link
            callToAction
            backgroundImage {
              alt
              gatsbyImageData(placeholder: NONE)
            }
          }
        }
      }
      allDatoCmsExhibition(
        filter: { exhibitionStatus: { ne: "PAST" } }
        sort: { fields: startDate, order: ASC }
        limit: 3
      ) {
        nodes {
          id
          slug
          exhibitionStatus
          startDate(formatString: "DD MMMM")
          endDate(formatString: "DD MMMM YYYY")
          featureImageVideo {
            alt
            gatsbyImageData(width: 1440, placeholder: NONE)
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
        filter: { eventStatus: { eq: "UPCOMING" } }
        limit: 3
        sort: { fields: eventDates___eventDateTime, order: ASC }
      ) {
        nodes {
          id
          eventDates {
            eventDateTime
          }
          featureImageVideo {
            alt
            gatsbyImageData(width: 800, placeholder: NONE)
          }
          eventType {
            eventType
          }
          locations {
            id
            location {
              title
            }
          }
          slug
          title
        }
      }
      datoCmsAbout {
        title
        headerImage {
          gatsbyImageData(width: 1000, placeholder: NONE)
        }
        description
      }
      allDatoCmsPaper(
        filter: { meta: { status: { eq: "published" }, isValid: { eq: true } } }
        limit: 1
        sort: { fields: publishedMonth, order: DESC }
      ) {
        nodes {
          id
          title
          slug
          featureImage {
            gatsbyImageData(width: 1000, placeholder: NONE)
            url
            alt
          }
          featureColour {
            hex
          }
          summary
        }
      }
      allDatoCmsDigitalProject(
        filter: { meta: { status: { eq: "published" }, isValid: { eq: true } } }
        limit: 1
        sort: { fields: publicationDate, order: DESC }
      ) {
        nodes {
          slug
          title
          artist {
            name
          }
          featureImage {
            gatsbyImageData(width: 1000, placeholder: NONE)
            url
            alt
          }
        }
      }
      allDatoCmsTalk(
        filter: { meta: { status: { eq: "published" }, isValid: { eq: true } } }
        limit: 1
        sort: { fields: talkDate, order: DESC }
      ) {
        nodes {
          title
          description
          featureImage {
            gatsbyImageData(width: 800, placeholder: NONE)
          }
        }
      }
    }
  `)

  return data
}
