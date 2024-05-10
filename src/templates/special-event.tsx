import React from "react"
import Layout from "../components/layout"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { HeaderSwiperGallery } from "../components/headerGallery"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Controller, Scene } from "react-scrollmagic"
import { Tween, Timeline } from "react-gsap"
dayjs.extend(utc)
dayjs.extend(timezone)

const SpecialEvent = ({ data, pageContext }) => {
  const {
    title,
    formattedTitle,
    description,
    credit,
    creditLogos,
    eventLogo,
    headerImageGallery,
    locations,
    artists,
    startDate,
    endDate,
    associatedEventSeries,
    logoBlock,
    program,
		timetable,
  } = data.datoCmsSpecialEvent
  const { textColour, backgroundColour } = pageContext
  const upcomingEvents = data.allDatoCmsEvent.nodes

  return (
    <Layout theme={backgroundColour} featureColor={textColour}>
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
                  <HeaderSwiperGallery slides={headerImageGallery} />
                </div>
              </Tween>
            </Timeline>
          </Scene>
        </Controller>
      </div>
      <div className="container-fluid special-event">
        <div className="page-grid">
          <div className="order-1 lg:order-2 mb-12 lg:mb-0 col-span-12 lg:col-span-4 lg:col-start-9 2xl:col-span-3 2xl:col-start-9 grid grid-cols-12 gap-x-5 md:gap-x-10 lg:block">
            <div className="when col-span-12 sm:col-span-6">
              <h4 className="heading-4 mb-4 text-silver-chalice mix-blend-multiply">
                When
              </h4>
              <h4 className="heading-3-regular">
                {dayjs(startDate).format("ddd D MMMM YYYY, h:mma")} –{" "}
                {dayjs(endDate).format("ddd D MMMM YYYY, h:mma")}
              </h4>
            </div>
            {locations.length > 0 && (
              <div className="main-locations col-span-12 sm:col-span-6">
                <h4 className="heading-4 mb-4 text-silver-chalice mix-blend-multiply mt-12 sm:mt-0 lg:mt-16 xl:mt-20">
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
          <div className="order-2 mb-12 lg:mb-0 lg:order-1 col-span-12 md:col-span-9 lg:col-start-2 lg:col-span-7 xl:col-span-6 xl:col-start-2">
            <div
              className="body-sans"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
            {headerImageGallery.some(item => item.title) && (
							<div className="small-sans mt-4 md:mt-6 lg:mt-8">
								Image credit:&nbsp;
								{headerImageGallery.map(({ title }, index: number) => (
									title && (
										<div key={index} className="inline">
											{title} /&nbsp;
										</div>
									)
								))}
							</div>
						)}
          </div>
          {program.length > 0 && (
            <div className="order-3 col-span-12 lg:col-start-2 lg:col-span-10 mt-12 lg:mt-16 xl:mt-20">
              <h4 className="heading-4 mb-5 md:mb-6 text-silver-chalice mix-blend-multiply col-span-2">
                Program
              </h4>
              {program.map(
                (
                  {
                    title,
                    genre,
                    description,
                    dateAndTime,
                    location,
                    linkedEventPage,
                    ticketsUrl,
                    artists,
                  },
                  index: number
                ) => (
                  <div
                    className="col-span-2 page-grid mb-6 md:mb-8 lg:mb-10 pt-2 border-t-1 border-black"
                    key={index}
                  >
                    <div className="col-span-12 md:col-span-4">
                      <div
                        className="body-sans font-medium mb-2 md:mb-0"
                        dangerouslySetInnerHTML={{
                          __html: title,
                        }}
                      />
                      {genre.length > 0 && (
                        <div className="medium-small">{genre}</div>
                      )}
                    </div>
                    <div className="col-span-12 md:col-span-3 medium-small">
                      {dateAndTime.length > 0 && <div>{dateAndTime}</div>}
                      {location.length > 0 && <div>{location}</div>}
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      {description.length > 0 && (
                        <div
                          className="medium-small mt-3 md:mt-0"
                          dangerouslySetInnerHTML={{
                            __html: description,
                          }}
                        />
                      )}
                      <div className="more-section medium-small">
                        {artists.length > 0 && (
                          <div className="artists flex flex-wrap w-full">
                            <div className="mr-1 inline">Artists:</div>
                            {artists.map(({ slug, name }, index: number) => (
                              <div className="underline mr-2 inline">
                                <a href={`/creatives/${slug}`} key={index}>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: name,
                                    }}
                                  />
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="more-section mt-4 flex medium-small">
                        {linkedEventPage && (
                          <div className="" key={linkedEventPage.id}>
                            <Link
                              className="no-underline mr-3 text-black bg-light-grey mix-blend-multiply block px-2 py-1 hover:bg-black hover:text-white transition cursor-pointer duration-300"
                              to={`/events/${linkedEventPage.slug}`}
                            >
                              Read more
                            </Link>
                          </div>
                        )}
                        {ticketsUrl && (
                          <a
                            className="no-underline text-black bg-light-grey mix-blend-multiply block px-2 py-1 hover:bg-black hover:text-white transition cursor-pointer duration-300"
                            href={`${ticketsUrl}`}
                            target={`_blank`}
                          >
                            Buy tickets
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
					{timetable && (
            <div className="order-3 col-span-12 lg:col-start-2 lg:col-span-10 xl:col-start-2 xl:col-span-9 2xl:col-start-2 2xl:col-span-8 mt-12 lg:mt-16 xl:mt-20">
              <h4 className="heading-4 mb-5 md:mb-6 text-silver-chalice mix-blend-multiply col-span-2">
                Timetable
              </h4>
							<GatsbyImage
                  image={timetable.gatsbyImageData}
                  alt="Event timetable"
                />
						</div>
					)}
          <div className="order-5 col-span-12 lg:col-start-2 lg:col-span-10 mt-12 lg:mt-16 xl:mt-20">
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
                                style={{ color: textColour }}
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
          <div className="order-6 col-span-12 md:col-span-9 lg:col-start-2 lg:col-span-7 xl:col-span-6 xl:col-start-2 mb-12 lg:mb-16 xl:mb-20">
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
            {logoBlock && (
              <div className="w-full">
                <GatsbyImage
                  image={logoBlock.gatsbyImageData}
                  alt={logoBlock.alt || "Credit Logos"}
                  className="w-full mix-blend-multiply"
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
                  style={{ color: textColour }}
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

export default SpecialEvent

export const query = graphql`
  query SpecialEventQuery($slug: String!) {
    datoCmsSpecialEvent(slug: { eq: $slug }) {
      title
      slug
      description
      textColour {
        hex
      }
      backgroundColour {
        hex
      }
      startDate
      endDate
      locations {
        id
        exhibitionDetails
        location {
          id
          title
          address
        }
      }
      artists {
        ... on DatoCmsCreative {
          slug
          name
        }
      }
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
			timetable {
        alt
        title
        gatsbyImageData(placeholder: NONE)
      }
      eventLogo {
        alt
        title
        url
      }
      logoBlock {
        alt
        gatsbyImageData(placeholder: NONE)
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
      program {
        title
        dateAndTime
        location
        description
        genre
        linkedEventPage {
          ... on DatoCmsEvent {
            id
            slug
          }
        }
        ticketsUrl
        artists {
          ... on DatoCmsCreative {
            id
            slug
            name
          }
        }
      }
    }
    allDatoCmsEvent(
      filter: { eventStatus: { eq: "UPCOMING" }, slug: { ne: $slug } }
      sort: { fields: eventDates, order: ASC }
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
