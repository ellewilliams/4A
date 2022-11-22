import React, { Fragment } from "react"
import Layout from "../components/layout"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { useAboutQuery } from "../queries/useAboutQuery"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { Controller, Scene } from "react-scrollmagic"
import { Tween, Timeline } from "react-gsap"

const AboutPage = () => {
  const { datoCmsAbout } = useAboutQuery()
  const {
    seoMetaTag,
    title,
    headerImage,
    description,
    additionalInfo,
    historyTitle,
    headerImageHistory,
    descriptionHistory,
  } = datoCmsAbout

  return (
    <Layout theme="white">
      <HelmetDatoCms title="About" seo={seoMetaTag} />
      <div className="about">
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
            className="description col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-2 xl:col-span-6 xl:col-start-2 section-gap"
          >
            {description && (
              <div
                className="body-sans text-block medium-gap"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}
            {additionalInfo.map(({ title, description }, index: number) => (
              <div
                key={index}
                id={title}
                className="additional-info medium-gap"
              >
                <h3 className="heading-3 text-torch-red my-5 md:my-6">
                  {title}
                </h3>
                {description && (
                  <div
                    className="body-sans text-block"
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                )}
              </div>
            ))}
          </section>
          <div
            aria-labelledby="Page navigation"
            className="page-navigation hidden lg:block lg:col-span-4 lg:col-start-10 xl:col-span-3 xl:col-start-9 heading-4 text-silver-chalice text-right"
          >
            {additionalInfo.map(({ title }, index: number) => (
              <Fragment key={index}>
                <Link aria-labelledby={`Scroll to ${title}`} to={`#${title}`}>
                  {title}{" "}
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
            <Link aria-labelledby="Scroll to History" to={"#history"}>
              History{" "}
              <svg
                width="22"
                height="13"
                viewBox="0 0 22 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L11 11L21 1" stroke="#9C9C9C" strokeWidth="2" />
              </svg>
            </Link>
          </div>
          <section
            aria-labelledby="History"
            id="history"
            className="col-span-12 medium-gap"
          >
            <div className="history page-grid">
              <h2 className="heading-feature text-torch-red col-span-12 md:col-span-10 lg:col-span-8 heading-gap">
                {historyTitle}
              </h2>
              <GatsbyImage
                image={headerImageHistory.gatsbyImageData}
                alt={headerImageHistory.alt || historyTitle}
                className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-2 xl:col-span-6 xl:col-start-2 heading-gap"
              />
              {descriptionHistory && (
                <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-2 xl:col-span-6 xl:col-start-2">
                  <div
                    className="body-sans text-block"
                    dangerouslySetInnerHTML={{
                      __html: descriptionHistory,
                    }}
                  />
                </div>
              )}
            </div>
          </section>
          <div className="page-grid col-span-12">
            <p className="small-sans page-gap col-span-12 sm:col-span-6 sm:col-start-7 lg:col-span-3 lg:col-start-9 text-silver-chalice">
              Images:
              <br />
              {headerImage.title && (
                <span>
                  Top: {headerImage.title}
                  <br />
                </span>
              )}
              {headerImageHistory.title && (
                <span>History: {headerImageHistory.title}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
