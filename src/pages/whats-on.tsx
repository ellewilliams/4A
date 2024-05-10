import * as React from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import { filter } from "lodash"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { GatsbyImage } from "gatsby-plugin-image"
import { useWhatsOnPageQuery } from "../queries/useWhatsOnPageQuery"
dayjs.extend(utc)
dayjs.extend(timezone)

const WhatsOnPage = ({ data }) => {
	const { datoCmsWhatsOn } = useWhatsOnPageQuery()
  const allDatoCmsEventSeries = data.allDatoCmsEventSeries.nodes
  const upcomingEvents = data.allDatoCmsEvent.nodes
  const upcomingSpecialEvents = data.allDatoCmsSpecialEvent.nodes
  const exhibitions = data.allDatoCmsExhibition.nodes
	const { title } =
	datoCmsWhatsOn

  return (
    <Layout theme="white">
      <HelmetDatoCms title={title} />
      <div className="container-fluid whats-on page-top">
        <h2 className="heading-feature text-torch-red mb-8 md:mb-10 lg:mb-12">
					{title}
        </h2>
        {(exhibitions.length || allDatoCmsEventSeries.length > 0) && (
          <section
            aria-label="Current Exhibitions"
            className="current-exhibitions page-grid"
          >
            {exhibitions.map((exhibition) => {
              const {
                id,
                slug,
                formattedTitle,
                locations,
                featureImageVideo,
								dateTextOverride,
              } = exhibition
							const startDate = new Date(exhibition.startDate)
							const endDate = new Date(exhibition.endDate)
							var now = dayjs()
							var today = now.format("YYYY-MM-DD")
							if (startDate <= new Date(today) && endDate >= new Date(today)) {
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
											{dateTextOverride ? (
												<p className="body-sans">
													{dateTextOverride}
												</p>
											) : (
                      	<p className="body-sans">Open until {dayjs(endDate).format("D MMMM YYYY")}</p>
											)}
                      {locations.map(({ location }) => (
                        <p key={location.title} className="body-sans">
                          {location.title}
                        </p>
                      ))}
                    </div>
                  </Link>
                </div>
              )}
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
            className="page-grid"
            id="events"
          >
            {upcomingEvents.map((event) => {
              const endDate = new Date(event.endDate)
              var now = dayjs()
							var today = now.format("YYYY-MM-DD")
							if (endDate >= new Date(today)) {
                return (
									<>
									<h3 className="whats-on-heading heading-3 section-gap-top col-span-12 text-silver-chalice mb-6 md:mb-8">
									</h3>
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
                        {event.dateTextOverride ? (
													<p className="body-sans">
														{event.dateTextOverride}
													</p>
												) : event.eventDates.length ? (
													event.eventDates.length &&
														event.eventDates.map(({ eventDateTime }, index: number) => (
															<p key={index} className="body-sans">
																{dayjs(eventDateTime).format("dddd, D MMMM YYYY, h:mma")}
															</p>
														))
												) : null}
                        {event.locations.map(({ location }) => (
                          <p key={location.title} className="body-sans">
                            {location.title}
                          </p>
                        ))}
                      </div>
                    </Link>
                  </div>
									</>
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
									<>
									<h3 className="whats-on-heading heading-3 section-gap-top col-span-12 text-silver-chalice mb-6 md:mb-8">
									</h3>
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
									</>
                )
              }
            })}
          </section>
        )}
				{(exhibitions.length > 0) && (
        <section
          aria-label="Upcoming Exhibitions"
          className="medium-gap page-grid"
          id="upcoming-exhibitions"
        >
          {exhibitions.length > 0 &&
            exhibitions.map((exhibition) => {
              const {
                id,
                slug,
								endDate,
                formattedTitle,
                locations,
                featureImageVideo,
								dateTextOverride,
              } = exhibition
							const startDate = new Date(exhibition.startDate)
							var now = dayjs()
							var today = now.format("YYYY-MM-DD")
							if (startDate > new Date(today)) {
              return (
								<>
								<h3 className="whats-on-heading heading-3 section-gap-top col-span-12 text-silver-chalice mb-6 md:mb-8">
								</h3>
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
											{dateTextOverride ? (
												<p className="body-sans">
													{dateTextOverride}
												</p>
											) : (
												<p className="body-sans">
													{dayjs(startDate).format("D MMM YYYY")} – {dayjs(endDate).format("D MMM YYYY")}
												</p>
											)}
                      </p>
                      {locations.map(({ location }) => (
                        <p key={location.title} className="body-sans">
                          {location.title}
                        </p>
                      ))}
                    </div>
                  </Link>
                </div>
							</>)}
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
			filter: {
				meta: { isValid: { eq: true }, status: { ne: "draft" } }
				endDate: { gte: "2022" }
			}
			sort: { fields: startDate, order: ASC }
    ) {
      nodes {
        id
        slug
        exhibitionStatus
        startDate
        endDate
				dateTextOverride
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
				dateTextOverride
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
