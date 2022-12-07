import * as React from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import { filter } from "lodash"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { GatsbyImage } from "gatsby-plugin-image"
dayjs.extend(utc)
dayjs.extend(timezone)

enum Status {
  CURRENT = "CURRENT",
  UPCOMING = "UPCOMING",
}

const WhatsOnPage = ({ data }) => {
  const allDatoCmsEventSeries = data.allDatoCmsEventSeries.nodes
  const exhibitions = data.allDatoCmsExhibition.nodes
  const upcomingEvents = data.allDatoCmsEvent.nodes
  const upcomingSpecialEvents = data.allDatoCmsSpecialEvent.nodes
  const currentExhibitions = filter(exhibitions, [
    "exhibitionStatus",
    Status.CURRENT,
  ])
  const upcomingExhibitions = filter(exhibitions, ["endDate", Status.UPCOMING])

  return (
    <Layout theme="white">
      <HelmetDatoCms title="What's On" />
      <div className="container-fluid whats-on page-top">
        <h2 className="heading-feature text-torch-red mb-8 md:mb-10 lg:mb-12">
          What's On
        </h2>
        {(currentExhibitions.length || allDatoCmsEventSeries.length > 0) && (
          <section
            aria-label="Current Exhibitions"
            className="current-exhibitions section-gap page-grid"
          >
            {currentExhibitions.map((exhibition) => {
              const {
                id,
                slug,
                endDate,
                formattedTitle,
                locations,
                featureImageVideo,
              } = exhibition
              return (
                <div
                  className="exhibition col-span-12 md:col-span-6 xl:col-span-6 mb-12 md:mb-16"
                  key={id}
                >
                  <Link to={`/exhibitions/${slug}`}>
                    <GatsbyImage
                      image={featureImageVideo.gatsbyImageData}
                      alt={featureImageVideo.alt || formattedTitle || ""}
                    />
                    <h3
                      className="heading-2-regular text-torch-red my-3 sm:my-4 md:my-5"
                      dangerouslySetInnerHTML={{ __html: formattedTitle }}
                    />
                    <div className="details">
                      <p className="body-sans">Open until {endDate}</p>
                      {locations.map(({ location }) => (
                        <p key={location.title} className="body-sans">
                          {location.title}
                        </p>
                      ))}
                    </div>
                  </Link>
                </div>
              )
            })}
            {allDatoCmsEventSeries.map((eventseries) => {
              const { id, slug, formattedTitle, featureImage } = eventseries
              const endDate = new Date(eventseries.endDate)
							var now = dayjs()
							var today = now.format("YYYY-MM-DD")
							if (endDate >= new Date(today)) {
                return (
                  <div
                    className="event-series col-span-12 md:col-span-6 xl:col-span-6 mb-12 md:mb-16"
                    key={id}
                  >
                    <Link to={`/${slug}`}>
                      <GatsbyImage
                        image={featureImage.gatsbyImageData}
                        alt={featureImage.alt || formattedTitle || ""}
                      />
                      <h3
                        className="heading-2-regular text-torch-red my-3 sm:my-4 md:my-5"
                        dangerouslySetInnerHTML={{ __html: formattedTitle }}
                      />
                      <div className="details">
                        <p className="body-sans">
                          Ongoing until{" "}
                          {dayjs(endDate).format("dddd, D MMMM YYYY")}
                          <br />
                          Various locations
                        </p>
                      </div>
                    </Link>
                  </div>
                )
              }
            })}
          </section>
        )}
        {(upcomingEvents.length || upcomingSpecialEvents.length > 0) && (
          <section
            aria-label="Upcoming Events"
            className="section-gap page-grid"
            id="events"
          >
            <h3 className="heading-3 col-span-12 text-silver-chalice mb-6 md:mb-8">
              Upcoming Events
            </h3>
            {upcomingEvents.map((event) => {
              const endDate = new Date(event.endDate)
              var now = dayjs()
							var today = now.format("YYYY-MM-DD")
							if (endDate >= new Date(today)) {
                return (
                  <div
                    className="event col-span-6 lg:col-span-4 mb-12 md:mb-16"
                    key={event.id}
                  >
                    <Link to={`/events/${event.slug}`}>
                      <GatsbyImage
                        image={event.featureImageVideo.gatsbyImageData}
                        alt={
                          event.featureImageVideo.alt ||
                          event.formattedTitle ||
                          ""
                        }
                      />
                      <h3 className="heading-3-2col-regular text-torch-red my-3 sm:my-4 md:my-5">
                        {event.title}
                      </h3>
                      <div className="details">
                        <p className="body-sans">
                          <b>{event.eventType?.eventType}</b>
                        </p>
                        {event.eventDates.length &&
                          event.eventDates.map(
                            ({ eventDateTime }, index: number) => (
                              <p key={index} className="body-sans">
                                {dayjs(eventDateTime).format(
                                  "dddd, D MMMM YYYY, h:mma"
                                )}
                              </p>
                            )
                          )}
                        {event.locations.map(({ location }) => (
                          <p key={location.title} className="body-sans">
                            {location.title}
                          </p>
                        ))}
                      </div>
                    </Link>
                  </div>
                )
              }
            })}
            {upcomingSpecialEvents.map((event: any) => {
              const {
                id,
                slug,
                title,
                startDate,
                formattedTitle,
                locations,
                featureImage,
              } = event
              const endDate = new Date(event.endDate)
              if (endDate >= new Date(Date.now())) {
                return (
                  <div
                    className="event col-span-6 lg:col-span-4 mb-12 md:mb-16"
                    key={id}
                  >
                    <Link to={`/events/${slug}`} className="no-underline">
                      <GatsbyImage
                        image={featureImage.gatsbyImageData}
                        alt={featureImage.alt || formattedTitle || ""}
                      />
                      <h3 className="heading-3-2col-regular text-torch-red my-3 sm:my-4 md:my-5">
                        {title}
                      </h3>
                      <div className="details">
                        <p className="body-sans">
                          <b>Special Event</b>
                          <br />
                          {dayjs(startDate).format(
                            "ddd D MMMM YYYY, h:mma"
                          )} – <br />
                          {dayjs(endDate).format("ddd D MMMM YYYY, h:mma")}
                        </p>
                        {locations.map(({ location }) => (
                          <p key={location.title} className="body-sans">
                            {location.title}
                          </p>
                        ))}
                      </div>
                    </Link>
                  </div>
                )
              }
            })}
          </section>
        )}
				{(upcomingExhibitions.length > 0) && (
        <section
          aria-label="Upcoming Exhibitions"
          className="medium-gap page-grid"
          id="upcoming-exhibitions"
        >
          <h3 className="heading-3 col-span-12 text-silver-chalice mb-6 md:mb-8">
            Upcoming Exhibitions
          </h3>
          {upcomingExhibitions.length > 0 &&
            upcomingExhibitions.map((exhibition) => {
              const {
                id,
                slug,
                startDate,
                endDate,
                formattedTitle,
                locations,
                featureImageVideo,
              } = exhibition
              return (
                <div
                  className="exhibition col-span-6 lg:col-span-4 mb-12 md:mb-16"
                  key={id}
                >
                  <Link to={`/exhibitions/${slug}`}>
                    <GatsbyImage
                      image={featureImageVideo.gatsbyImageData}
                      alt={featureImageVideo.alt || formattedTitle || ""}
                    />
                    <h3
                      className="heading-3-2col-regular text-torch-red my-3 sm:my-4 md:my-5"
                      dangerouslySetInnerHTML={{ __html: formattedTitle }}
                    />
                    <div className="details">
                      <p className="body-sans">
                        {startDate} &#8211; {endDate}
                      </p>
                      {locations.map(({ location }) => (
                        <p key={location.title} className="body-sans">
                          {location.title}
                        </p>
                      ))}
                    </div>
                  </Link>
                </div>
              )
            })}
        </section>
				)}
        <div className="page-grid page-gap">
          <div className="col-span-10 col-start-3 md:col-span-3 md:col-start-9">
            <Link to="/archive" className="heading-4 underline text-torch-red">
              Explore our archive
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default WhatsOnPage

export const data = graphql`
  query {
    allDatoCmsExhibition(
      filter: { exhibitionStatus: { in: ["CURRENT", "UPCOMING", "PAST"] } }
      sort: { fields: startDate, order: ASC }
    ) {
      nodes {
        id
        slug
        exhibitionStatus
        startDate(formatString: "DD MMMM")
        endDate(formatString: "DD MMMM YYYY")
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
      filter: {
        meta: { isValid: { eq: true }, status: { ne: "draft" } }
        endDate: { gte: "2022" }
      }
      sort: { fields: eventDates___eventDateTime, order: ASC }
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
        endDate
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
    allDatoCmsEventSeries(
      filter: { meta: { isValid: { eq: true }, status: { ne: "draft" } } }
      sort: { fields: startDate, order: ASC }
    ) {
      nodes {
        startDate
        endDate
        id
        slug
        featureImage {
          alt
          gatsbyImageData
        }
        title
        formattedTitle
      }
    }
    allDatoCmsSpecialEvent(
      filter: { meta: { isValid: { eq: true }, status: { ne: "draft" } } }
      sort: { fields: startDate, order: ASC }
    ) {
      nodes {
        startDate
        endDate
        associatedEventSeries {
          slug
        }
        formattedTitle
        id
        slug
        locations {
          id
          location {
            title
          }
        }
        featureImage {
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
`
