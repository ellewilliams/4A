import * as React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { Events } from "../components/home/events"
import { Info } from "../components/home/infoBlock"
import { Online } from "../components/home/onlineContent"
import { Announcement } from "../components/home/announcement"
import { GatsbyImage } from "gatsby-plugin-image"
import { Acknowledgement } from "../components/acknowledgement"
import { Icon } from "../components/icon"

enum CONTENT_BLOCKS {
  EVENTS = "DatoCmsEventsBlock",
  INFOBLOCK = "DatoCmsInformationBlock",
  ONLINE = "DatoCmsOnlineContent",
  ANNOUNCEMENT = "DatoCmsAnnouncementPanel",
}

const IndexPage = ({ data }) => {
  const allDatoCmsEvent = data.allDatoCmsEvent
  const allDatoCmsPaper = data.allDatoCmsPaper
  const allDatoCmsDigitalProject = data.allDatoCmsDigitalProject
  const allDatoCmsTalk = data.allDatoCmsTalk
  const {
    seoMetaTags,
    content,
    acknowledgementOfCountry,
    topExhibition,
    leftExhibition,
    rightExhibition,
  } = data.datoCmsHome

  return (
    <Layout theme="">
      <HelmetDatoCms seo={seoMetaTags}>
        {seoMetaTags?.tags[11]?.attributes?.content && (
          <meta
            property="og:image:secure_url"
            content={seoMetaTags.tags[11].attributes.content}
          />
        )}
      </HelmetDatoCms>
      <h1 className="visually-hidden">4A Center for Contemporary Asian Art</h1>
      <div className="home page-top">
        <div className="container-fluid">
          <div className="relative">
            <div className="absolute md:-mt-2 right-0 logo-name">
              <Icon className="logo" variant="name" fill="#FF8039" />
            </div>
          </div>
        </div>
        <section className="exhibitions container-fluid page-grid medium-gap">
          {topExhibition && (
            <div className="exhibition medium-gap col-span-12">
              <div className="image-wrapper">
                {topExhibition.featureImageVideo && (
                  <Link to={`/exhibitions/${topExhibition.slug}`}>
                    <GatsbyImage
                      image={topExhibition.featureImageVideo.gatsbyImageData}
                      alt={
                        topExhibition.featureImageVideo.alt ||
                        topExhibition.formattedTitle
                      }
                      className="mb-5 md:mb-7"
                      loading="eager"
                    />
                  </Link>
                )}
                {topExhibition.featureImage && (
                  <Link to={`/${topExhibition.slug}`}>
                    <GatsbyImage
                      image={topExhibition.featureImage.gatsbyImageData}
                      alt={
                        topExhibition.featureImage.alt ||
                        topExhibition.formattedTitle
                      }
                      className="mb-5 md:mb-7"
                      loading="eager"
                    />
                  </Link>
                )}
              </div>
              {topExhibition.featureImageVideo && (
                <Link
                  to={`/exhibitions/${topExhibition.slug}`}
                  className="outer-text-wrapper"
                >
                  <div className="text-wrapper">
                    {topExhibition.exhibitionStatus == "UPCOMING" && (
                      <h3 className="heading-4 text-silver-chalice exhibition-status mb-2">
                        {topExhibition.exhibitionStatus} exhibition
                      </h3>
                    )}
                    <h2
                      className="font-display antialiased text-4xl text-torch-red mb-3 sm:mb-4 md:mb-5"
                      dangerouslySetInnerHTML={{
                        __html: topExhibition.formattedTitle,
                      }}
                    />
                    <div className="details">
											{topExhibition.dateTextOverride ? (
												<p className="body-sans">
													{topExhibition.dateTextOverride}
												</p>
											) : topExhibition.exhibitionStatus == "CURRENT" ? (
                        <p className="body-sans">
                          Open until {topExhibition.endDate}
                        </p>
                      ) : (
                        <p className="body-sans">
                          Opening {topExhibition.startDate}
                        </p>
                      )}
                      {topExhibition.locations.map(({ location }) => (
                        <p key={location.title} className="body-sans">
                          {location.title}
                        </p>
                      ))}
                    </div>
                  </div>
                </Link>
              )}
              {topExhibition.featureImage && (
                <Link
                  to={`/${topExhibition.slug}`}
                  className="outer-text-wrapper"
                >
                  <div className="text-wrapper">
                    <h2
                      className="font-display antialiased text-4xl text-torch-red mb-3 sm:mb-4 md:mb-5"
                      dangerouslySetInnerHTML={{
                        __html: topExhibition.formattedTitle,
                      }}
                    />
                    <div className="details">
                      <p className="body-sans">
                        Ongoing until {topExhibition.endDate}
                        <br />
                        Various locations
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          )}
          {leftExhibition && (
            <div className="exhibition medium-gap col-span-12">
              <div className="image-wrapper">
                {leftExhibition.featureImageVideo && (
                  <Link to={`/exhibitions/${leftExhibition.slug}`}>
                    <GatsbyImage
                      image={leftExhibition.featureImageVideo.gatsbyImageData}
                      alt={
                        leftExhibition.featureImageVideo.alt ||
                        leftExhibition.formattedTitle
                      }
                      className="mb-5 md:mb-7"
                      loading="eager"
                    />
                  </Link>
                )}
                {leftExhibition.featureImage && (
                  <Link to={`/${leftExhibition.slug}`}>
                    <GatsbyImage
                      image={leftExhibition.featureImage.gatsbyImageData}
                      alt={
                        leftExhibition.featureImage.alt ||
                        leftExhibition.formattedTitle
                      }
                      className="mb-5 md:mb-7"
                      loading="eager"
                    />
                  </Link>
                )}
              </div>
              {leftExhibition.featureImageVideo && (
                <Link
                  to={`/exhibitions/${leftExhibition.slug}`}
                  className="outer-text-wrapper"
                >
                  <div className="text-wrapper">
                    {leftExhibition.exhibitionStatus == "UPCOMING" && (
                      <h3 className="heading-4 text-silver-chalice exhibition-status mb-2">
                        {leftExhibition.exhibitionStatus} exhibition
                      </h3>
                    )}
                    <h2
                      className="font-display antialiased text-4xl text-torch-red mb-3 sm:mb-4 md:mb-5"
                      dangerouslySetInnerHTML={{
                        __html: leftExhibition.formattedTitle,
                      }}
                    />
                    <div className="details">
											{leftExhibition.dateTextOverride ? (
												<p className="body-sans">
													{leftExhibition.dateTextOverride}
												</p>
											) : leftExhibition.exhibitionStatus == "CURRENT" ? (
                        <p className="body-sans">
                          Open until {leftExhibition.endDate}
                        </p>
                      ) : (
                        <p className="body-sans">
                          Opening {leftExhibition.startDate}
                        </p>
                      )}
                      {leftExhibition.locations.map(({ location }) => (
                        <p key={location.title} className="body-sans">
                          {location.title}
                        </p>
                      ))}
                    </div>
                  </div>
                </Link>
              )}
              {leftExhibition.featureImage && (
                <Link
                  to={`/${leftExhibition.slug}`}
                  className="outer-text-wrapper"
                >
                  <div className="text-wrapper">
                    <h2
                      className="font-display antialiased text-4xl text-torch-red mb-3 sm:mb-4 md:mb-5"
                      dangerouslySetInnerHTML={{
                        __html: leftExhibition.formattedTitle,
                      }}
                    />
                    <div className="details">
                      <p className="body-sans">
                        Ongoing until {leftExhibition.endDate}
                        <br />
                        Various locations
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          )}
          {rightExhibition && (
            <div className="exhibition medium-gap col-span-12">
              <div className="image-wrapper">
                {rightExhibition.featureImageVideo && (
                  <Link to={`/exhibitions/${rightExhibition.slug}`}>
                    <GatsbyImage
                      image={rightExhibition.featureImageVideo.gatsbyImageData}
                      alt={
                        rightExhibition.featureImageVideo.alt ||
                        rightExhibition.formattedTitle
                      }
                      className="mb-5 md:mb-7"
                      loading="eager"
                    />
                  </Link>
                )}
                {rightExhibition.featureImage && (
                  <Link to={`/${rightExhibition.slug}`}>
                    <GatsbyImage
                      image={rightExhibition.featureImage.gatsbyImageData}
                      alt={
                        rightExhibition.featureImage.alt ||
                        rightExhibition.formattedTitle
                      }
                      className="mb-5 md:mb-7"
                      loading="eager"
                    />
                  </Link>
                )}
              </div>
              {rightExhibition.featureImageVideo && (
                <Link
                  to={`/exhibitions/${rightExhibition.slug}`}
                  className="outer-text-wrapper"
                >
                  <div className="text-wrapper">
                    {rightExhibition.exhibitionStatus == "UPCOMING" && (
                      <h3 className="heading-4 text-silver-chalice exhibition-status mb-2">
                        {rightExhibition.exhibitionStatus} exhibition
                      </h3>
                    )}
                    <h2
                      className="font-display antialiased text-4xl text-torch-red mb-3 sm:mb-4 md:mb-5"
                      dangerouslySetInnerHTML={{
                        __html: rightExhibition.formattedTitle,
                      }}
                    />
                    <div className="details">
											{rightExhibition.dateTextOverride ? (
												<p className="body-sans">
													{rightExhibition.dateTextOverride}
												</p>
											) : rightExhibition.exhibitionStatus == "CURRENT" ? (
                        <p className="body-sans">
                          Open until {rightExhibition.endDate}
                        </p>
                      ) : (
                        <p className="body-sans">
                          Opening {rightExhibition.startDate}
                        </p>
                      )}
                      {rightExhibition.locations.map(({ location }) => (
                        <p key={location.title} className="body-sans">
                          {location.title}
                        </p>
                      ))}
                    </div>
                  </div>
                </Link>
              )}
              {rightExhibition.featureImage && (
                <Link
                  to={`/${rightExhibition.slug}`}
                  className="outer-text-wrapper"
                >
                  <div className="text-wrapper">
                    <h2
                      className="font-display antialiased text-4xl text-torch-red mb-3 sm:mb-4 md:mb-5"
                      dangerouslySetInnerHTML={{
                        __html: rightExhibition.formattedTitle,
                      }}
                    />
                    <div className="details">
                      <p className="body-sans">
                        Ongoing until {rightExhibition.endDate}
                        <br />
                        Various locations
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          )}
        </section>
        <div className="page-grid section-gap">
          <div className="col-span-10 col-start-3 md:col-span-3 md:col-start-9">
            <Link
              to="/whats-on"
              className="heading-4 underline text-torch-red"
              aria-label="See all exhibitions"
            >
              See all exhibitions
            </Link>
          </div>
        </div>
        <section className="blocks">
          {content.map((block: any) => {
            if (block.internal) {
              switch (block.internal.type) {
                case CONTENT_BLOCKS.EVENTS:
                  return (
                    <Events
                      key={block.id}
                      heading={block.eventsHeading}
                      events={allDatoCmsEvent}
											featuredEvents={block.featuredEvents}
                    />
                  )
                case CONTENT_BLOCKS.INFOBLOCK:
                  return <Info key={block.id} block={block} />
                case CONTENT_BLOCKS.ONLINE:
                  return (
                    <Online
                      key={block.id}
                      block={block}
                      papers={allDatoCmsPaper}
                      digitalProjects={allDatoCmsDigitalProject}
                      talks={allDatoCmsTalk}
                    />
                  )
                case CONTENT_BLOCKS.ANNOUNCEMENT:
                  return <Announcement key={block.id} block={block} />
              }
            }
          })}
        </section>
      </div>
			<Acknowledgement text={acknowledgementOfCountry} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomeQuery {
    datoCmsHome {
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
					dateTextOverride
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
					dateTextOverride
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
					dateTextOverride
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
					featuredEvents {
						... on DatoCmsEvent {
							id
							endDate
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
							dateTextOverride
						}
					}
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
				dateTextOverride
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
      filter: { endDate: { gte: "2023" }, meta: {isValid: {eq: true}, status: {ne: "draft"}} }
      sort: { fields: eventDates___eventDateTime, order: DESC }
    ) {
      nodes {
        id
        endDate
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
				dateTextOverride
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
`
