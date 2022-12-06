import React, { Fragment } from "react"
import Layout from "../components/layout"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { useVisitUsQuery } from "../queries/useVisitUsQuery"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { Controller, Scene } from "react-scrollmagic"
import { Tween, Timeline } from "react-gsap"

const VisitUsPage = () => {
  const { datoCmsVisit } = useVisitUsQuery()
  const { seoMetaTag, title, headerImage, description, locations } =
    datoCmsVisit

  return (
    <Layout theme="white">
      <HelmetDatoCms title="Visit Us" seo={seoMetaTag} />
      <div className="visit-us">
        <div className="heading-image-wrapper mb-12 md:mb-16 lg:mb-20">
          <div className="image-overlay"></div>
          <div className="container-fluid">
            <h2 className="heading-feature">{title}</h2>
          </div>
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
                    yPercent: -30,
                  }}
                  to={{
                    yPercent: 10,
                  }}
                  ease="none"
                >
                  <div className="image-wrapper">
                    <GatsbyImage
                      image={headerImage.gatsbyImageData}
                      alt={headerImage.alt || title}
                      className="w-full feature-header-image"
                    />
                  </div>
                </Tween>
              </Timeline>
            </Scene>
          </Controller>
        </div>
        <div className="container-fluid page-grid">
          <section
            aria-labelledby="Description"
            className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-2 xl:col-span-6 xl:col-start-2 section-gap"
          >
            {description && (
              <div
                className="body-sans text-block"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}
          </section>
          <div
            aria-labelledby="Page navigation"
            className="page-navigation hidden lg:block lg:col-span-4 lg:col-start-10 xl:col-span-3 xl:col-start-9 heading-4 text-silver-chalice text-right"
          >
            {locations.map(({ name }, index: number) => (
              <Fragment key={index}>
                <Link aria-labelledby={`Scroll to ${name}`} to={`#${name}`}>
                  {name}{" "}
                  <svg
                    width="22"
                    height="13"
                    viewBox="0 0 22 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L11 11L21 1"
                      stroke="#9C9C9C"
                      strokeWidth="2"
                    />
                  </svg>
                </Link>
              </Fragment>
            ))}
          </div>
          <section
            aria-labelledby="Locations"
            className="col-span-12 section-gap"
          >
            {locations.map(
              (
                { name, information, image, googleMapsLink, address },
                index: number
              ) => (
                <div
                  className="location section-gap page-grid"
                  id={name}
                  key={index}
                >
                  <h2 className="heading-feature text-torch-red col-span-12 md:col-span-10 lg:col-span-8 heading-gap">
                    {name}
                  </h2>
                  <GatsbyImage
                    image={image.gatsbyImageData}
                    alt={image.alt || name}
                    className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-2 xl:col-span-6 xl:col-start-2 heading-gap"
                  />
                  {address && (
                    <div className="address col-span-12 md:col-span-10 md:col-start-2 lg:col-span-4 lg:col-start-9 xl:col-span-3 xl:col-start-9 lg:h-0 heading-gap">
                      <div
                        className="body-sans text-block"
                        dangerouslySetInnerHTML={{
                          __html: address,
                        }}
                      />
                      <a
                        href={googleMapsLink}
                        target="_blank"
                        aria-label="Navigate via Google Maps"
                        className="body-sans underline block my-5 md:my-6"
                      >
                        Navigate via Google Maps
                      </a>
                    </div>
                  )}
                  {information && (
                    <div
                      className="body-sans text-block col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-2 xl:col-span-6 xl:col-start-2"
                      dangerouslySetInnerHTML={{
                        __html: information,
                      }}
                    />
                  )}
                </div>
              )
            )}
          </section>
          {headerImage.title && (
            <div className="page-grid col-span-12">
              <p className="small-sans section-gap col-span-12 sm:col-span-6 sm:col-start-7 lg:col-span-3 lg:col-start-9 text-silver-chalice">
                Top image: {headerImage.title}
                {locations.map(({ image, name }, index: number) => (
                  <span className="block" id={name} key={index}>
                    {name} image: {image.title}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default VisitUsPage
