import * as React from "react"
import ReactPlayer from "react-player"
import Layout from "../components/layout"
import { uniqBy, take } from "lodash"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { SwiperGallery } from "../components/swiperGallery"
import { Controller, Scene } from "react-scrollmagic"
import { Tween, Timeline } from "react-gsap"
import { isBrowser } from "../utils/isBrowser"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)

const Exhibition = ({ data, pageContext }) => {
  const {
    title,
    description,
    startDate,
    endDate,
    formattedTitle,
    locations,
    artists,
    curators,
    events,
    credit,
    creditLogos,
    logoBlock,
    imageGallery,
    headerImage,
    exhibitionVideo,
    seoMetaTags,
  } = data.datoCmsExhibition
  const { featureColour } = pageContext

  const arry = [
    ...data.allDatoCmsExhibitionArtists.nodes,
    ...data.allDatoCmsExhibitionCurators.nodes,
  ]
  const relatedExhibitions = uniqBy(take(arry, 3), "id")

  const jsonLdStreetAddress =
    locations[0]?.location?.address?.split(",")[0] || ""
  const jsonLdAddressLocality =
    locations[0]?.location?.address?.split(",")[1] || ""

  const jsonLd = {
    "@context": "https://www.schema.org",
    "@type": "Event",
    name: title,
    url: isBrowser && window.location.toString(),
    description: seoMetaTags.tags[3]?.attributes?.content || "",
    startDate: startDate,
    endDate: endDate,
    location: {
      "@type": "Place",
      name: locations[0]?.location?.title || "",
      sameAs: isBrowser && window.location.toString(),
      address: {
        "@type": "PostalAddress",
        streetAddress: jsonLdStreetAddress,
        addressLocality: jsonLdAddressLocality,
        addressRegion: "NSW",
        postalCode: "2000",
        addressCountry: "AU",
      },
    },
  }

  return (
    <Layout theme="white" featureColor={featureColour}>
      <HelmetDatoCms title={title} seo={seoMetaTags}>
        <script type="application/ld+json" data-rh="true">
          {`${JSON.stringify(jsonLd)}`}
        </script>
      </HelmetDatoCms>
      <div className="container-fluid exhibition">
        <div className="page-grid page-top mb-3 lg:mb-6">
          <div className="md:col-span-3 md:col-start-9">
            <div className="heading-3 text-silver-chalice">Exhibition</div>
          </div>
        </div>
        <div className="page-grid heading-gap xl:pb-4">
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
            reverse={true}
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
                    alt={headerImage.alt || formattedTitle}
                    className="w-full feature-header-image"
                  />
                </div>
              </Tween>
            </Timeline>
          </Scene>
        </Controller>
      </div>
      <div className="container-fluid exhibition">
        <div className="page-grid">
          <div className="order-1 lg:order-2 mb-12 lg:mb-0 col-span-12 lg:col-span-4 lg:col-start-9 2xl:col-span-3 2xl:col-start-9 grid grid-cols-12 gap-x-5 md:gap-x-10 lg:block">
            <div className="when col-span-12 sm:col-span-6">
              <h4 className="heading-4 mb-4 text-silver-chalice">When</h4>
              <h4 className="heading-3-regular">
                {`${startDate}`}
                &nbsp;-
                <br />
                {`${endDate}`}
              </h4>
            </div>
            <div className="main-locations col-span-12 sm:col-span-6">
              <h4 className="heading-4 mb-4 text-silver-chalice mt-12 sm:mt-0 lg:mt-16 xl:mt-20">
                Location
              </h4>
              {locations.map(({ location, exhibitionDetails, id }) => (
                <div key={id} className="location mb-8 md:mb-10">
                  <h4 className="location-name heading-3-regular mb-4">
                    {location.title}
                  </h4>
                  <div className="location-details">
                    <p className="location-address body-sans my-4">
                      {location?.address}
                    </p>
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
          </div>
          <div className="order-2 lg:order-1 col-span-12 md:col-span-9 lg:col-start-2 lg:col-span-7 xl:col-span-6 xl:col-start-2">
            <div
              className="body-sans"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
            {curators.length > 0 && (
              <div className="curators body-sans">
                <h4 className="heading-4 mb-4 text-silver-chalice mt-12 lg:mt-16 xl:mt-20">
                  Curators
                </h4>
                <div className="curator-wrapper">
                  {curators.map(({ slug, name }, index: number) => (
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
            {exhibitionVideo && (
              <div className="player-wrapper mt-12 lg:mt-16 xl:mt-20">
                <ReactPlayer
                  url={exhibitionVideo.url}
                  width="100%"
                  height="100%"
                  className={"player"}
                  muted={false}
                  loop={false}
                  playing={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {imageGallery.length > 0 && (
        <div className="medium-gap medium-gap-top py-8 md:py-10 lg:py-12 xl:py-14">
          <SwiperGallery slides={imageGallery} />
        </div>
      )}
      <div className="container-fluid exhibition mt-12 lg:mt-16 xl:mt-20">
        <div className="page-grid">
          {events.length > 0 && (
            <div className="events body-sans order-3 col-span-12 lg:col-start-2 lg:col-span-10">
              <h4 className="heading-4 mb-5 md:mb-6 text-silver-chalice">
                Events
              </h4>
              <div className="events grid grid-cols-12 md:grid-cols-10 gap-x-5 md:gap-x-10 lg:gap-x-14 md:mb-12 lg:mb-16 xl:mb-20">
                {events.map(
                  ({
                    id,
                    formattedTitle,
                    locations,
                    excerpt,
                    eventType,
                    featureImageVideo,
                    slug,
                    eventDates,
                  }) => {
                    return (
                      <div
                        className="event col-span-12 md:col-span-5 mb-12 md:mb-0"
                        key={id}
                      >
                        <Link className="no-underline" to={`/events/${slug}`}>
                          <GatsbyImage
                            image={featureImageVideo.gatsbyImageData}
                            alt={featureImageVideo.alt || formattedTitle}
                          />
                        </Link>
                        <div>
                          <Link className="no-underline" to={`/events/${slug}`}>
                            <div
                              className="heading-3-regular my-4 md:my-5"
                              style={{ color: featureColour }}
                              dangerouslySetInnerHTML={{
                                __html: formattedTitle,
                              }}
                            />
                          </Link>
                          <p className="body-sans">
                            <b>{eventType?.eventType}</b>
                          </p>
                          {eventDates.length &&
                            eventDates.map(({ id, eventDateTime }) => (
                              <p className="body-sans" key={id}>
                                {dayjs(eventDateTime).format(
                                  "dddd, D MMMM YYYY, h:mma"
                                )}
                              </p>
                            ))}
                          <p className="body-sans">{locations.title}</p>
                          {excerpt !== "" && (
                            <div
                              className="body-sans content excerpt my-5 md:my-6"
                              dangerouslySetInnerHTML={{
                                __html: excerpt,
                              }}
                            />
                          )}
                          <Link className="read-more" to={`/events/${slug}`}>
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
          <div className="order-4 col-span-12 md:col-span-9 lg:col-start-2 lg:col-span-7 xl:col-span-6 xl:col-start-2 mb-12 lg:mb-16 xl:mb-20">
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
      {relatedExhibitions.length > 0 && (
        <div className="related-exhibitions bg-light-grey mt-6 md:mt-8">
          <div className="container-fluid page-grid py-12 md:py-16 lg:py-20">
            <h4 className="heading-3-4 col-span-12 mb-6 md:mb-8 text-silver-chalice">
              {" "}
              Related Exhibitions
            </h4>
            {relatedExhibitions.map((exhibition) => (
              <Link
                key={exhibition.id}
                className="no-underline col-span-6 md:col-span-4 mb-12 md:mb-4"
                to={`/exhibitions/${exhibition.slug}`}
              >
                <GatsbyImage
                  image={exhibition.featureImageVideo.gatsbyImageData}
                  alt={exhibition.featureImageVideo.alt || exhibition.title}
                  className=""
                />
                <h3
                  className="heading-3-4-regular text-torch-red my-4 md:my-5"
                  dangerouslySetInnerHTML={{
                    __html: exhibition.formattedTitle,
                  }}
                />
                <div className="details">
                  <p className="body-sans">
                    {exhibition.startDate} &#8211; {exhibition.endDate}
                  </p>
                  {exhibition.locations.map(({ location }) => (
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

export default Exhibition

export const query = graphql`
  query ExhibitionQuery(
    $slug: String!
    $artistNames: [String!]
    $curatorNames: [String!]
  ) {
    datoCmsExhibition(slug: { eq: $slug }) {
      id
      title
      slug
      description
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      featureColour {
        hex
      }
      startDate(formatString: "DD MMMM YYYY")
      endDate(formatString: "DD MMMM YYYY")
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
      logoBlock {
        alt
        gatsbyImageData(placeholder: NONE)
      }
      featureImageVideo {
        alt
        gatsbyImageData(
          placeholder: NONE
          imgixParams: { ar: "16:9", fit: "crop", crop: "focalpoint" }
        )
      }
      headerImage {
        alt
        gatsbyImageData(placeholder: NONE)
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
      exhibitionVideo {
        url
        title
        providerUid
      }
      artists {
        ... on DatoCmsCreative {
          slug
          name
        }
      }
      curators {
        ... on DatoCmsCreative {
          slug
          name
        }
      }
      credit
      creditLogos {
        alt
        gatsbyImageData(placeholder: NONE)
      }
      events {
        formattedTitle
        eventType {
          eventType
        }
        eventDates {
          ... on DatoCmsDate {
            id
            eventDateTime
          }
        }
        excerpt
        slug
        id
        locations {
          location {
            title
          }
        }
        featureImageVideo {
          alt
          gatsbyImageData(placeholder: NONE)
        }
      }
    }
    allDatoCmsExhibitionArtists: allDatoCmsExhibition(
      sort: { fields: [meta___publishedAt], order: DESC }
      filter: {
        meta: { isValid: { eq: true }, status: { eq: "published" } }
        artists: { elemMatch: { name: { in: $artistNames } } }
        slug: { ne: $slug }
      }
    ) {
      nodes {
        id
        title
        slug
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
    allDatoCmsExhibitionCurators: allDatoCmsExhibition(
      sort: { fields: [meta___publishedAt], order: DESC }
      filter: {
        meta: { isValid: { eq: true }, status: { eq: "published" } }
        curators: { elemMatch: { name: { in: $curatorNames } } }
        slug: { ne: $slug }
      }
    ) {
      nodes {
        id
        title
        slug
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
  }
`
