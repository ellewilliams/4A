import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { GatsbyImage } from "gatsby-plugin-image"

const Creative = ({ data }) => {
  const { name, biography, profileImage, pronouns, seoMetaTags } =
    data.datoCmsCreative
  const featuredInArticles = data.allDatoCmsArticle.nodes
  const featuredInExhibitions = [
    ...data.allDatoCmsExhibitionArtists.nodes,
    ...data.allDatoCmsExhibitionCurators.nodes,
  ]
  const featuredInEvents = data.allDatoCmsEvent.nodes
	const featuredInSpecialEvents = data.allDatoCmsSpecialEvent.nodes
  const featuredInDigitalProjects = data.allDatoCmsDigitalProject.nodes

  return (
    <Layout theme="white">
      <HelmetDatoCms seo={seoMetaTags} />
      <div className="container-fluid page-gap">
        <div className="page-grid page-top mb-3 lg:mb-6">
          <div className="md:col-span-3 md:col-start-9">
            <div className="heading-3 text-silver-chalice">Creative</div>
          </div>
        </div>
        <div className="page-grid mb-6 md:mb-8 lg:mb-10">
          <div className="col-span-12 md:col-span-7">
            <h2 className="heading-1-regular text-torch-red">{name}</h2>
            {pronouns && (
              <p className="body-sans text-silver-chalice mt-3">{pronouns}</p>
            )}
          </div>
        </div>
        <div className="page-grid mb-20 md:mb-24 lg:mb-28">
          <div className="order-2 md:order-1 col-span-12 md:col-span-7 xl:col-span-6">
            {biography && (
              <div
                className="whitespace-pre-line body-sans"
                dangerouslySetInnerHTML={{
                  __html: biography,
                }}
              />
            )}
          </div>
          <div className="order-1 md:order-2 mb-6 md:mb-0 col-span-9 sm:col-span-6 md:col-span-4 md:col-start-9">
            <img
              src={profileImage.url}
              alt={profileImage.alt || name}
              className="align-middle"
            />
            {profileImage.title && (
              <p className="antialiased font-sans text-xs lg:text-sm-tight mt-1 text-silver-chalice">
                {profileImage.title}
              </p>
            )}
          </div>
        </div>
        <div className="page-grid mb-5 lg:mb-6">
          <div className="col-span-4">
            <div className="heading-4 text-silver-chalice">Featured in</div>
          </div>
        </div>
        <div className="page-grid mb-6">
          {featuredInArticles.length > 0 &&
            featuredInArticles.map((article: any) => (
              <div
                className="col-span-6 md:col-span-4 xl:col-span-3 mb-8 md:mb-12"
                key={article.id}
              >
                <Link to={`/articles/${article.slug}`}>
                  <GatsbyImage
                    image={article.featureImage.gatsbyImageData}
                    alt={article.featureImage.alt || name}
                  />
                  <div
                    className="heading-4-regular mt-3 mb-2 md:mt-4 text-torch-red"
                    dangerouslySetInnerHTML={{
                      __html: article.title,
                    }}
                  />
									{article.paper.title && (
										<div className="body-sans">
											4A Papers: {article.paper.title}
										</div>
									)}
                </Link>
              </div>
            ))}
          {featuredInExhibitions.length > 0 &&
            featuredInExhibitions.map((exhibition: any) => (
              <div
                className="col-span-6 md:col-span-4 xl:col-span-3 mb-8 md:mb-12"
                key={exhibition.id}
              >
                <Link to={`/exhibitions/${exhibition.slug}`}>
                  <GatsbyImage
                    image={exhibition.featureImageVideo.gatsbyImageData}
                    alt={exhibition.featureImageVideo.alt || name}
                  />
                  <h4
                    className="heading-4-regular mt-3 mb-2 md:mt-4 text-torch-red"
                    dangerouslySetInnerHTML={{
                      __html: exhibition.formattedTitle,
                    }}
                  />
                  <div className="details">
                    <p className="body-sans">
                      {exhibition.startDate} &#8211; {exhibition.endDate}
                    </p>
                    {exhibition.locations.map(({ location }) => (
                      <p key={location} className="body-sans">
                        {location.title}
                      </p>
                    ))}
                  </div>
                </Link>
              </div>
            ))}
          {featuredInEvents.length > 0 &&
            featuredInEvents.map((event: any) => (
              <div
                className="col-span-6 md:col-span-4 xl:col-span-3 mb-8 md:mb-12"
                key={event.id}
              >
                <Link to={`/events/${event.slug}`}>
                  <GatsbyImage
                    image={event.featureImageVideo.gatsbyImageData}
                    alt={event.featureImageVideo.alt || name}
                  />
                  <h4
                    className="heading-4-regular mt-3 mb-2 md:mt-4 text-torch-red"
                    dangerouslySetInnerHTML={{
                      __html: event.formattedTitle,
                    }}
                  />
                  <div className="details">
                    <p className="body-sans">
                      <b>{event.eventType?.eventType}</b>
                    </p>
                    {event.eventDates.length &&
                      event.eventDates.map(({ eventDateTime }) => (
                        <p key={eventDateTime} className="body-sans">
                          {eventDateTime}
                        </p>
                      ))}
                    {event.locations.map(({ location }) => (
                      <p key={location} className="body-sans">
                        {location.title}
                      </p>
                    ))}
                  </div>
                </Link>
              </div>
            ))}
          {featuredInDigitalProjects.length > 0 &&
            featuredInDigitalProjects.map((project: any) => (
              <div
                className="col-span-6 md:col-span-4 xl:col-span-3 mb-8 md:mb-12"
                key={project.id}
              >
                <Link to={`/digital/${project.slug}`}>
                  <GatsbyImage
                    image={project.featureImage.gatsbyImageData}
                    alt={project.featureImage.alt}
                  />
                  <h4 className="heading-4-regular mt-3 md:mt-4 text-torch-red">
                    {project.title}
                  </h4>
                  <div className="heading-4-regular">
                    {project.artist[0].name}
                  </div>
                </Link>
              </div>
            ))}
						{featuredInSpecialEvents.length > 0 &&
            featuredInSpecialEvents.map((event: any) => (
              <div
                className="col-span-6 md:col-span-4 xl:col-span-3 mb-8 md:mb-12"
                key={event.id}
              >
                <Link to={`/events/${event.slug}`}>
                  <GatsbyImage
                    image={event.featureImage.gatsbyImageData}
                    alt={event.featureImage.alt || name}
                  />
                  <h4
                    className="heading-4-regular mt-3 mb-2 md:mt-4 text-torch-red"
                    dangerouslySetInnerHTML={{
                      __html: event.formattedTitle,
                    }}
                  />
                  <div className="details">
                    <p className="body-sans">
                      <b>Special Event</b>
                    </p>
                    {event.startDate && (
                        <p className="body-sans">
                          {event.startDate} – {event.endDate}
                        </p>
                      )}
                    {event.locations.map(({ location }) => (
                      <p key={location} className="body-sans">
                        {location.title}
                      </p>
                    ))}
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default Creative

export const query = graphql`
  query CreativeQuery($slug: String!, $name: String!) {
    datoCmsCreative(
      slug: { eq: $slug }
      meta: { status: { eq: "published" }, isValid: { eq: true } }
    ) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      biography
      name
      id
      profileImage {
        alt
        gatsbyImageData(placeholder: NONE, aspectRatio: 1)
        url(
          imgixParams: { w: "800", h: "800", fit: "crop", crop: "focalpoint" }
        )
        title
      }
      pronouns
    }
    allDatoCmsArticle(
      filter: { author: { elemMatch: { name: { eq: $name } } } 
			meta: { isValid: { eq: true }, status: { eq: "published" } } }
    ) {
      nodes {
        id
        title
        slug
        author {
          name
        }
        featureImage {
          gatsbyImageData(placeholder: NONE, aspectRatio: 1)
          alt
          title
        }
        paper {
          publishedMonth
          title
        }
      }
    }
    allDatoCmsExhibitionArtists: allDatoCmsExhibition(
      sort: { fields: [meta___publishedAt], order: DESC }
      filter: {
        meta: { isValid: { eq: true }, status: { eq: "published" } }
        artists: { elemMatch: { name: { eq: $name } } }
      }
    ) {
      nodes {
        id
        title
        slug
        artists {
          name
        }
        curators {
          name
        }
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
        curators: { elemMatch: { name: { eq: $name } } }
      }
    ) {
      nodes {
        id
        title
        slug
        artists {
          name
        }
        curators {
          name
        }
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
      sort: { fields: [meta___publishedAt], order: DESC }
      filter: {
        meta: { isValid: { eq: true }, status: { eq: "published" } }
        artists: { elemMatch: { name: { eq: $name } } }
      }
    ) {
      nodes {
        id
        title
        slug
        artists {
          name
        }
        formattedTitle
        eventType {
          eventType
        }
        eventDates {
          eventDateTime(formatString: "DD MMMM YYYY")
          id
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
    allDatoCmsDigitalProject(
      filter: {
        meta: { isValid: { eq: true }, status: { eq: "published" } }
        artist: { elemMatch: { name: { eq: $name } } }
      }
      sort: { fields: publicationDate, order: DESC }
    ) {
      nodes {
        id
        slug
        title
        featureImage {
          alt
          gatsbyImageData(placeholder: NONE)
        }
        id
        artist {
          name
        }
      }
    }
		allDatoCmsSpecialEvent(
      sort: { fields: [meta___publishedAt], order: DESC }
      filter: {
        meta: { isValid: { eq: true }, status: { eq: "published" } }
        artists: { elemMatch: { name: { eq: $name } } }
      }
    ) {
      nodes {
        id
        title
        slug
        artists {
          name
        }
        formattedTitle
        startDate(formatString: "DD MMMM YYYY")
				endDate(formatString: "DD MMMM YYYY")
        locations {
          id
          location {
            title
          }
        }
        featureImage {
          alt
          gatsbyImageData
        }
        title
      }
    }
  }
`
