import React from "react"
import Layout from "../components/layout"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { SwiperGallery } from "../components/headerGallery"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Controller, Scene } from "react-scrollmagic"
import { Tween, Timeline } from "react-gsap"
dayjs.extend(utc)
dayjs.extend(timezone)

const EventSeries = ({ data, pageContext }) => {
  const {
    title,
    description,
    tagline,
    credit,
    creditLogos,
    eventLogo,
    headerImageGallery,
  } = data.datoCmsEventSeries
  const upcomingEvents = data.upcomingQuery.nodes
  const pastEvents = data.pastQuery.nodes
  const upcomingSpecialEvents = data.upcomingSEQuery.nodes
  const pastSpecialEvents = data.pastSEQuery.nodes
  const { textColour, backgroundColour } = pageContext

  return (
    <Layout theme={backgroundColour} featureColor="#FFFFFF">
      <HelmetDatoCms title={title} />
      <div className="feature-image mb-12 md:mb-16 lg:mb-20 -mt-16 md:-mt-28 relative">
        <img
          src={eventLogo.url}
          alt={title}
          className="event-logo absolute w-3/4 sm:w-2/3 md:w-1/2 z-10 top-1/2 left-0 right-0 ml-auto mr-auto transform -translate-y-1/2"
        />
        <div
          className="absolute bg-black opacity-10 w-full h-full"
          style={{ zIndex: 5 }}
        />
        <Controller>
          <Scene
            indicators={false}
            duration="250%"
            pin={false}
            triggerHook="onEnter"
            reverse
          >
            <Timeline wrapper={<div className="parallax" />}>
              <Tween
                position="0"
                from={{
                  yPercent: -20,
                }}
                to={{
                  yPercent: 20,
                }}
                ease="none"
              >
                <div className="header-gallery">
                  <SwiperGallery slides={headerImageGallery} />
                </div>
              </Tween>
            </Timeline>
          </Scene>
        </Controller>
      </div>
      <div className="container-fluid event">
        <div className="page-grid">
          <div className="order-1 section-gap-padding col-span-12 md:col-span-10 md:col-start-2 2xl:col-span-8 2xl:col-start-3 text-center">
            {textColour && (
              <div
                className="heading-2-regular heading-gap"
                style={{ color: textColour }}
                dangerouslySetInnerHTML={{
                  __html: tagline,
                }}
              />
            )}
            {description && (
              <div
                className="body-sans lg:w-4/5 lg:mx-auto"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}
          </div>

          {(upcomingEvents.length || upcomingSpecialEvents.length > 0) && (
            <section
              aria-label="Upcoming Events"
              className="order-2 section-gap page-grid col-span-12"
              id="events"
            >
              {upcomingEvents.map((event: any) => {
                const {
                  id,
                  slug,
                  title,
                  eventDates,
                  eventType,
                  formattedTitle,
                  locations,
                  featureImageVideo,
                } = event
                return (
                  <div
                    className="event col-span-12 lg:col-span-6 mb-12 md:mb-16"
                    key={id}
                  >
                    <Link to={`/events/${slug}`} className="no-underline">
                      <GatsbyImage
                        image={featureImageVideo.gatsbyImageData}
                        alt={featureImageVideo.alt || formattedTitle || ""}
                      />
                      <h3
                        className="heading-2-regular my-3 sm:my-4 md:my-5"
                        style={{ color: textColour }}
                      >
                        {title}
                      </h3>
                      <div className="details">
                        <p className="body-sans">
                          <b>{eventType?.eventType}</b>
                        </p>
                        {eventDates.length &&
                          eventDates.map(({ eventDateTime }, index: number) => (
                            <p key={index} className="body-sans">
                              {dayjs(eventDateTime).format(
                                "dddd, D MMMM YYYY, h:mma"
                              )}
                            </p>
                          ))}
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
              {upcomingSpecialEvents.map((event: any) => {
                const {
                  id,
                  slug,
                  title,
                  startDate,
                  endDate,
                  formattedTitle,
                  locations,
                  featureImage,
                } = event
                return (
                  <div
                    className="event col-span-12 lg:col-span-6 mb-12 md:mb-16"
                    key={id}
                  >
                    <Link to={`/events/${slug}`} className="no-underline">
                      <GatsbyImage
                        image={featureImage.gatsbyImageData}
                        alt={featureImage.alt || formattedTitle || ""}
                      />
                      <h3
                        className="heading-2-regular my-3 sm:my-4 md:my-5"
                        style={{ color: textColour }}
                      >
                        {title}
                      </h3>
                      <div className="details">
                        <p className="body-sans">
                          <b>Special Event</b>
                          <br />
                          {dayjs(startDate).format(
                            "ddd D MMMM YYYY, h:mma"
                          )} – {dayjs(endDate).format("ddd D MMMM YYYY, h:mma")}
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

          {(pastEvents.length || pastSpecialEvents.length > 0) && (
            <section
              aria-label="Past Events"
              className="order-2 section-gap page-grid col-span-12"
              id="events"
            >
              <h4 className="heading-3-4 col-span-12 mb-6 md:mb-8 text-silver-chalice">
                Past Events
              </h4>
              {pastEvents.map((event: any) => {
                const {
                  id,
                  slug,
                  title,
                  eventDates,
                  eventType,
                  formattedTitle,
                  locations,
                  featureImageVideo,
                } = event
                return (
                  <div
                    className="event col-span-6 md:col-span-4 mb-12 md:mb-16"
                    key={id}
                  >
                    <Link to={`/events/${slug}`} className="no-underline">
                      <GatsbyImage
                        image={featureImageVideo.gatsbyImageData}
                        alt={featureImageVideo.alt || formattedTitle || ""}
                      />
                      <h3
                        className="heading-3-4-regular my-3 sm:my-4 md:my-5"
                        style={{ color: textColour }}
                      >
                        {title}
                      </h3>
                      <div className="details">
                        <p className="body-sans">
                          <b>{eventType?.eventType}</b>
                        </p>
                        {eventDates.length &&
                          eventDates.map(({ eventDateTime }, index: number) => (
                            <p key={index} className="body-sans">
                              {dayjs(eventDateTime).format(
                                "dddd, D MMMM YYYY, h:mma"
                              )}
                            </p>
                          ))}
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
              {pastSpecialEvents.map((event: any) => {
                const {
                  id,
                  slug,
                  title,
                  startDate,
                  endDate,
                  formattedTitle,
                  locations,
                  featureImage,
                } = event
                return (
                  <div
                    className="event col-span-6 md:col-span-4 mb-12 md:mb-16"
                    key={id}
                  >
                    <Link to={`/events/${slug}`} className="no-underline">
                      <GatsbyImage
                        image={featureImage.gatsbyImageData}
                        alt={featureImage.alt || formattedTitle || ""}
                      />
                      <h3
                        className="heading-3-4-regular my-3 sm:my-4 md:my-5"
                        style={{ color: textColour }}
                      >
                        {title}
                      </h3>
                      <div className="details">
                        <p className="body-sans">
                          <b>Special Event</b>
                          <br />
                          {dayjs(startDate).format(
                            "ddd D MMMM YYYY, h:mma"
                          )} – {dayjs(endDate).format("ddd D MMMM YYYY, h:mma")}
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

          <div className="order-5 col-span-12 md:col-span-8 md:col-start-3 lg:col-start-4 lg:col-span-6 text-center section-gap">
            {credit && (
              <div
                className="small-sans mb-4 md:mb-6 lg:mb-8"
                dangerouslySetInnerHTML={{
                  __html: credit,
                }}
              />
            )}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 lg:grid-cols-4">
              {creditLogos.map((image: any, index: number) => (
                <div key={index} className="partner-logo">
                  <GatsbyImage
                    image={image.gatsbyImageData}
                    alt={image.alt || "Credit Logo"}
                    className="h-16 col-span-1 mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EventSeries

export const query = graphql`
  query EventSeriesQuery($slug: String!, $currentDate: Date!) {
    datoCmsEventSeries(slug: { eq: $slug }) {
      title
      slug
      description
      tagline
      textColour {
        hex
      }
      backgroundColour {
        hex
      }
      startDate
      endDate
      formattedTitle
      headerImageGallery {
        title
        alt
        gatsbyImageData(placeholder: NONE, height: 527)
        url(
          imgixParams: { w: "1600", h: "900", fit: "crop", crop: "focalpoint" }
        )
        sizes {
          width
          aspectRatio
        }
      }
      credit
      creditLogos {
        alt
        gatsbyImageData(placeholder: NONE)
      }
      featureImage {
        alt
        title
        gatsbyImageData(placeholder: NONE)
      }
      eventLogo {
        alt
        title
        url
      }
    }
    upcomingQuery: allDatoCmsEvent(
      filter: {
        endDate: { gte: $currentDate }
        meta: { status: { ne: "draft" } }
        associatedEventSeries: { elemMatch: { slug: { eq: $slug } } }
      }
      sort: { fields: eventDates___eventDateTime, order: ASC }
    ) {
      nodes {
        eventDates {
          eventDateTime
          id
        }
        associatedEventSeries {
          slug
        }
        formattedTitle
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
    pastQuery: allDatoCmsEvent(
      filter: {
        endDate: { lt: $currentDate }
        meta: { status: { ne: "draft" } }
        associatedEventSeries: { elemMatch: { slug: { eq: $slug } } }
      }
      sort: { fields: eventDates___eventDateTime, order: ASC }
    ) {
      nodes {
        eventDates {
          eventDateTime
          id
        }
        associatedEventSeries {
          slug
        }
        formattedTitle
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
    upcomingSEQuery: allDatoCmsSpecialEvent(
      filter: {
        endDate: { gte: $currentDate }
        meta: { status: { ne: "draft" } }
        associatedEventSeries: { elemMatch: { slug: { eq: $slug } } }
      }
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
    pastSEQuery: allDatoCmsSpecialEvent(
      filter: {
        endDate: { lt: $currentDate }
        meta: { status: { ne: "draft" } }
        associatedEventSeries: { elemMatch: { slug: { eq: $slug } } }
      }
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
