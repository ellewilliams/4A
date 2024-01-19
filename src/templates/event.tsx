import React from "react"
import Layout from "../components/layout"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import ReactPlayer from "react-player"
import { SwiperGallery } from "../components/swiperGallery"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Controller, Scene } from "react-scrollmagic"
import { Tween, Timeline } from "react-gsap"
dayjs.extend(utc)
dayjs.extend(timezone)

const Event = ({ data, pageContext }) => {
  const {
    title,
    description,
    eventDates,
		dateTextOverride,
    formattedTitle,
    locations,
    artists,
    associatedExhibition,
    credit,
    creditLogos,
    headerImage,
    eventRecording,
    eventVideo,
    imageGallery,
    eventPoster,
    logoBlock,
    associatedEventSeries,
  } = data.datoCmsEvent
  const { featureColour } = pageContext
  const upcomingEvents = data.allDatoCmsEvent.nodes

  return (
    <Layout theme="white" featureColor={featureColour}>
      <HelmetDatoCms title={title} />
      <div className="container-fluid event">
        <div className="page-grid page-top mb-3 lg:mb-6">
          <div className="md:col-span-3 md:col-start-9">
            <div className="heading-3 text-silver-chalice">Event</div>
          </div>
        </div>
        <div className="page-grid heading-gap">
          <div className="col-span-12 md:col-span-9">
            <div
              className="heading-exhibition text-torch-red"
              style={{ color: featureColour }}
              dangerouslySetInnerHTML={{
                __html: formattedTitle,
              }}
            />
          </div>
        </div>
      </div>
      <div className="feature-image mb-12 md:mb-16 lg:mb-20">
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
                <div className="image-wrapper">
                  <GatsbyImage
                    image={headerImage.gatsbyImageData}
                    alt={headerImage.alt || formattedTitle || ""}
                    className="w-full feature-header-image"
                  />
                </div>
              </Tween>
            </Timeline>
          </Scene>
        </Controller>
      </div>
      <div className="container-fluid event">
        <div className="page-grid">
          <div className="order-1 lg:order-2 mb-12 lg:mb-0 col-span-12 lg:col-span-4 lg:col-start-9 2xl:col-span-3 2xl:col-start-9 grid grid-cols-12 gap-x-5 md:gap-x-10 lg:block">
            <div className="when col-span-12 sm:col-span-6">
              <h4 className="heading-4 mb-4 text-silver-chalice">When</h4>
							{dateTextOverride ? (
								<h4 className="heading-3-regular">
									{dateTextOverride}
								</h4>
							) : eventDates.length ? (
								eventDates.map(({ eventDateTime }, index: number) => (
									<h4 key={index} className="heading-3-regular">
										{dayjs(eventDateTime).format("dddd, D MMMM YYYY, h:mma")}
									</h4>
								))
							) : null}
            </div>
            {locations.length > 0 && (
              <div className="main-locations col-span-12 sm:col-span-6">
                <h4 className="heading-4 mb-4 text-silver-chalice mt-12 sm:mt-0 lg:mt-16 xl:mt-20">
                  Location
                </h4>
                {locations.map(({ location, exhibitionDetails, id }) => (
                  <div key={id} className="location">
                    <h4 className="location-name heading-3-regular mb-4">
                      {location.title}
                    </h4>
                    <div className="location-details">
                      {location && (
                        <p className="location-address body-sans my-4">
                          {location?.address}
                        </p>
                      )}
                      {exhibitionDetails && (
                        <div
                          className="location-dates body-sans"
                          dangerouslySetInnerHTML={{
                            __html: exhibitionDetails,
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="order-2 lg:order-1 col-span-12 md:col-span-9 lg:col-start-2 lg:col-span-7 xl:col-span-6 xl:col-start-2">
            <div
              className="body-sans"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
            {artists.length > 0 && (
              <div className="artists body-sans">
                <h4 className="heading-4 mb-4 text-silver-chalice mt-12 lg:mt-16 xl:mt-20">
                  Artists
                </h4>
                <div className="artist-wrapper">
                  {artists.map(({ slug, name }, index: number) => (
                    <a href={`/creatives/${slug}`} key={index}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: name,
                        }}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
            {eventRecording && (
              <div className="event-recording body-sans">
                <h4 className="heading-4 mb-4 text-silver-chalice mt-12 lg:mt-16 xl:mt-20">
                  Event recording
                </h4>
                <div
                  className="player-embed mt-5 md:mt-7"
                  dangerouslySetInnerHTML={{
                    __html: eventRecording,
                  }}
                />
              </div>
            )}
            {eventVideo && (
              <div className="event-video body-sans">
                <h4 className="heading-4 mb-4 text-silver-chalice mt-12 lg:mt-16 xl:mt-20">
                  Event video
                </h4>
                <div className="player-wrapper mt-5 md:mt-7">
                  <ReactPlayer
                    url={eventVideo.url}
                    width="100%"
                    height="100%"
                    className={"player"}
                    muted={false}
                    loop={false}
                    playing={false}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {imageGallery && (
        <>
          {imageGallery.length > 0 && (
            <div className="medium-gap medium-gap-top py-8 md:py-10 lg:py-12 xl:py-14">
              <SwiperGallery slides={imageGallery} />
            </div>
          )}
        </>
      )}
      <div className="container-fluid event mt-12 lg:mt-16 xl:mt-20">
        <div className="page-grid mb-20 md:mb-24 lg:mb-28">
          <div className="order-4 col-span-12 lg:col-start-2 lg:col-span-10">
            {eventPoster && (
              <div className="event-poster body-sans grid grid-cols-12 md:grid-cols-10 gap-x-5 md:gap-x-10 lg:gap-x-14 mb-12 lg:mb-16 xl:mb-20">
                <h4 className="col-span-12 md:col-span-10 heading-4 mb-4 text-silver-chalice">
                  Event poster
                </h4>
                <GatsbyImage
                  image={eventPoster.gatsbyImageData}
                  alt={eventPoster.alt || "Event Poster"}
                  className="col-span-12 md:col-span-7 xl:col-span-5 mt-1 md:mt-3"
                />
              </div>
            )}
            {associatedExhibition.length > 0 && (
              <div className="exhibition body-san md:mb-12 lg:mb-16 xl:mb-20">
                <h4 className="heading-4 mb-5 md:mb-6 text-silver-chalice">
                  Associated Exhibition
                </h4>
                <div className="grid grid-cols-12 md:grid-cols-10 gap-x-5 md:gap-x-10 lg:gap-x-14">
                  {associatedExhibition.map(
                    ({
                      id,
                      formattedTitle,
                      locations,
                      excerpt,
                      featureImageVideo,
                      slug,
                      startDate,
                      endDate,
                    }) => {
                      return (
                        <div
                          className="col-span-12 md:col-span-5 mb-12 md:mb-0"
                          key={id}
                        >
                          <Link
                            className="no-underline"
                            to={`/exhibitions/${slug}`}
                          >
                            <GatsbyImage
                              image={featureImageVideo.gatsbyImageData}
                              alt={featureImageVideo.alt || formattedTitle}
                            />
                          </Link>
                          <div>
                            <Link
                              className="no-underline"
                              to={`/exhibitions/${slug}`}
                            >
                              <div
                                className="heading-3-regular my-4 md:my-5"
                                style={{ color: featureColour }}
                                dangerouslySetInnerHTML={{
                                  __html: formattedTitle,
                                }}
                              />
                            </Link>
                            <p className="body-sans" key={id}>
                              {startDate} &#8211; {endDate}
                            </p>
                            {locations.map(({ location }) => (
                              <p key={location.title} className="body-sans">
                                {location.title}
                              </p>
                            ))}
                            {excerpt !== "" && (
                              <div
                                className="body-sans content excerpt my-5 md:my-6"
                                dangerouslySetInnerHTML={{
                                  __html: excerpt,
                                }}
                              />
                            )}
                            <Link
                              className="read-more"
                              to={`/exhibitions/${slug}`}
                            >
                              More info
                            </Link>
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>
              </div>
            )}
            {associatedEventSeries.length > 0 && (
              <div className="associated-event-series body-san md:mb-12 lg:mb-16 xl:mb-20">
                <h4 className="heading-4 mb-5 md:mb-6 text-silver-chalice mix-blend-multiply">
                  Associated Event Series
                </h4>
                <div className="grid grid-cols-12 md:grid-cols-10 gap-x-5 md:gap-x-10 lg:gap-x-14">
                  {associatedEventSeries.map(
                    ({
                      id,
                      formattedTitle,
                      tagline,
                      featureImage,
                      slug,
                      startDate,
                      endDate,
                    }) => {
                      return (
                        <div
                          className="col-span-12 md:col-span-5 mb-12 md:mb-0"
                          key={id}
                        >
                          <Link className="no-underline" to={`/${slug}`}>
                            <GatsbyImage
                              image={featureImage.gatsbyImageData}
                              alt={featureImage.alt || formattedTitle}
                            />
                          </Link>
                          <div>
                            <Link className="no-underline" to={`/${slug}`}>
                              <div
                                className="heading-3-regular my-4 md:my-5"
                                style={{ color: featureColour }}
                                dangerouslySetInnerHTML={{
                                  __html: formattedTitle,
                                }}
                              />
                            </Link>
                            {tagline !== "" && (
                              <div
                                className="body-sans content excerpt my-5 md:my-6"
                                dangerouslySetInnerHTML={{
                                  __html: tagline,
                                }}
                              />
                            )}
                            <Link
                              className="read-more body-sans underline"
                              to={`/${slug}`}
                            >
                              More info
                            </Link>
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="order-5 col-span-12 md:col-span-9 lg:col-start-2 lg:col-span-7 xl:col-span-6 xl:col-start-2 mb-12 lg:mb-16 xl:mb-20">
            {headerImage.title && (
              <p className="small-sans mb-4 md:mb-6 lg:mb-8">
                Top image: {headerImage.title}
              </p>
            )}
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
                    className="h-16 col-span-1"
                  />
                </div>
              ))}
            </div>
            {logoBlock && (
              <div className="w-full">
                <GatsbyImage
                  image={logoBlock.gatsbyImageData}
                  alt={logoBlock.alt || "Credit Logos"}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {upcomingEvents.length > 0 && (
        <div className="related-events bg-light-grey mt-6 md:mt-8">
          <div className="container-fluid page-grid py-12 md:py-16 lg:py-20">
            <h4 className="heading-3-4 col-span-12 mb-6 md:mb-8 text-silver-chalice">
              Upcoming Events
            </h4>
            {upcomingEvents.map((event: any) => (
              <Link
                key={event.id}
                className="no-underline col-span-6 md:col-span-4 mb-12 md:mb-4"
                to={`/events/${event.slug}`}
              >
                <GatsbyImage
                  image={event.featureImageVideo.gatsbyImageData}
                  alt={event.featureImageVideo.alt || event.title || ""}
                />
                <div
                  className="heading-3-4-regular text-torch-red my-4 md:my-5"
                  dangerouslySetInnerHTML={{
                    __html: event.formattedTitle,
                  }}
                />
                <div className="details">
                  <p className="body-sans">
                    <b>{event.eventType?.eventType}</b>
                  </p>
                  {event.eventDates.length &&
                    event.eventDates.map(({ eventDateTime }, index: number) => (
                      <p key={index} className="body-sans">
                        {dayjs(eventDateTime).format(
                          "dddd, D MMMM YYYY, h:mma"
                        )}
                      </p>
                    ))}
                  {event.locations.map(({ location }) => (
                    <p key={location.title} className="body-sans">
                      {location.title}
                    </p>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Event

export const query = graphql`
  query EventQuery($slug: String!, $currentDate: Date!) {
    datoCmsEvent(slug: { eq: $slug }) {
      id
      title
      slug
      description
      featureColour {
        hex
      }
      eventDates {
        eventDateTime
        id
      }
			dateTextOverride
      formattedTitle
      locations {
        id
        exhibitionDetails
        location {
          id
          title
          address
        }
      }
      eventRecording
      eventVideo {
        url
        providerUid
        title
      }
      imageGallery {
        title
        alt
        gatsbyImageData(placeholder: NONE, height: 527)
        sizes {
          width
          aspectRatio
        }
      }
      logoBlock {
        alt
        gatsbyImageData(placeholder: NONE)
      }
      artists {
        ... on DatoCmsCreative {
          slug
          name
        }
      }
      headerImage {
        alt
        gatsbyImageData(
          placeholder: NONE
          imgixParams: { ar: "16:9", fit: "crop", crop: "focalpoint" }
        )
        title
      }
      credit
      creditLogos {
        alt
        gatsbyImageData(placeholder: NONE)
      }
      featureImageVideo {
        alt
        title
        gatsbyImageData(placeholder: NONE)
        video {
          streamingUrl
        }
      }
      eventPoster {
        alt
        title
        gatsbyImageData(placeholder: NONE)
      }
      associatedExhibition {
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
      associatedEventSeries {
        title
        formattedTitle
        startDate
        endDate
        tagline
        slug
        id
        featureImage {
          alt
          gatsbyImageData(placeholder: NONE)
        }
      }
    }
    allDatoCmsEvent(
      filter: { endDate: { gte: $currentDate }, slug: { ne: $slug } }
      sort: { fields: eventDates___eventDateTime, order: ASC }
      limit: 3
    ) {
      nodes {
        eventDates {
          eventDateTime
          id
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
  }
`
