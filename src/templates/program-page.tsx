import React from "react"
import Layout from "../components/layout"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { HeaderSwiperGallery } from "../components/headerGallery"
import { SwiperGallery } from "../components/swiperGallery"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Controller, Scene } from "react-scrollmagic"
import { Tween, Timeline } from "react-gsap"
dayjs.extend(utc)
dayjs.extend(timezone)

const ProgramPage = ({ data, pageContext }) => {
  const {
    title,
    description,
    tagline,
    credit,
    creditLogos,
    headerImageGallery,
		imageGallery,
		associatedExhibition,
  } = data.datoCmsProgramPage
  const upcomingEvents = data.upcomingQuery.nodes
  const pastEvents = data.pastQuery.nodes
  const { textColour, backgroundColour, copyColour } = pageContext

  return (
    <Layout theme={backgroundColour} featureColor={textColour} >
      <HelmetDatoCms title={title} />
      <div className="feature-image mb-12 md:mb-16 lg:mb-20 -mt-16 md:-mt-28 relative">
					<div className="page-grid heading-gap absolute bottom-0 left-0 right-0 z-10 container-fluid w-full mx-auto">
						<div
							className="heading-exhibition col-span-12 md:col-span-10 2xl:col-span-8="
							style={{ color: textColour }}
							dangerouslySetInnerHTML={{
								__html: title,
							}}
						/>
					</div>
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
      <div className="container-fluid program-page" style={{ color: copyColour }}>
        <div className="page-grid">
          <div className="order-1 col-span-12 md:col-span-10 md:col-start-2 2xl:col-span-8 2xl:col-start-2 text-left section-gap-padding">
            {tagline && (
              <div
                className="heading-2-regular heading-gap"
                style={{ color: copyColour }}
                dangerouslySetInnerHTML={{
                  __html: tagline,
                }}
              />
            )}
            {description && (
              <div
                className="body-sans lg:w-4/5"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}
          </div>
				</div>
			</div>
			{imageGallery.length > 0 && (
				<div className="medium-gap pb-8 md:pb-10 lg:pb-12 xl:pb-14">
					<SwiperGallery slides={imageGallery} />
				</div>
			)}
			<div className="container-fluid program-page" style={{ color: copyColour }}>
        <div className="page-grid">
					{associatedExhibition.length > 0 && (
						<div className="associated-exhibitions body-sans col-span-12 md:col-span-10 md:col-start-2 md:mb-12 lg:mb-16 xl:mb-20">
							<h4 className="heading-4 mb-5 md:mb-6 text-silver-chalice">
								Associated Exhibition{associatedExhibition.length > 1 && ('s')}
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
										dateTextOverride,
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
															style={{ color: textColour }}
															dangerouslySetInnerHTML={{
																__html: formattedTitle,
															}}
														/>
													</Link>
													{dateTextOverride ? (
														<p className="body-sans">
															{dateTextOverride}
														</p>
													) : startDate ? (
														<p className="body-sans" key={id}>
															{startDate} &#8211; {endDate}
														</p>
													) : null}
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
												</div>
											</div>
										)
									}
								)}
							</div>
						</div>
					)}
          {(upcomingEvents.length > 0) && (
            <section
              aria-label="Upcoming Events"
              className="order-2 section-gap page-grid col-span-12 md:col-span-10 md:col-start-2"
              id="events"
            >
						<h4 className="heading-3-4 col-span-12 mb-6 md:mb-8 text-silver-chalice">
							Upcoming Events
						</h4>
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
                    className="event col-span-6 md:col-span-4 mb-12 md:mb-16"
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
            </section>
          )}

          {(pastEvents.length > 0) && (
            <section
              aria-label="Past Events"
              className="order-2 section-gap page-grid col-span-12 md:col-span-10 md:col-start-2"
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
            </section>
          )}
					
					{credit || (creditLogos.length > 0) ? (
          <div className="order-5 col-span-12 md:col-span-6 md:col-start-2 section-gap">
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
                    className="h-16 col-span-1 mix-blend-multiply gatsby-image-wrapper"
                  />
                </div>
              ))}
            </div>
          </div>
					):null}
        </div>
      </div>
    </Layout>
  )
}

export default ProgramPage

export const query = graphql`
  query ProgramPageQuery($slug: String!, $currentDate: Date!) {
    datoCmsProgramPage(slug: { eq: $slug }) {
      title
      slug
      description
      tagline
      textColour {
        hex
      }
			copyColour {
        hex
      }
      backgroundColour {
        hex
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
			imageGallery {
        title
        alt
				gatsbyImageData(placeholder: NONE)
				url(
          imgixParams: { w: "1600", h:"1600" }
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
    }
    upcomingQuery: allDatoCmsEvent(
      filter: {
        endDate: { gte: $currentDate }
        meta: { status: { ne: "draft" } }
        associatedProgram: { elemMatch: { slug: { eq: $slug } } }
      }
      sort: { fields: eventDates___eventDateTime, order: ASC }
    ) {
      nodes {
        eventDates {
          eventDateTime
          id
        }
        associatedProgram {
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
        associatedProgram: { elemMatch: { slug: { eq: $slug } } }
      }
      sort: { fields: eventDates___eventDateTime, order: ASC }
    ) {
      nodes {
        eventDates {
          eventDateTime
          id
        }
        associatedProgram {
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
  }
`
