import React, { Fragment } from "react"
import Layout from "../components/layout"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { useOpportunitiesQuery } from "../queries/useOpportunitiesQuery"
import { GatsbyImage } from "gatsby-plugin-image"
import { Controller, Scene } from "react-scrollmagic"
import { Tween, Timeline } from "react-gsap"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)

const OpportunitiesPage = () => {
  const { datoCmsOpportunitiesPage } = useOpportunitiesQuery()
  const { seoMetaTag, title, headerImage, opportunities } =
    datoCmsOpportunitiesPage

  return (
    <Layout theme="white">
      <HelmetDatoCms title="Opportunities" seo={seoMetaTag} />
      <div className="opportunities">
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
            aria-labelledby="Opportunities"
            className="col-span-12"
          >
            {opportunities.map(
              (
                { title, organisation, description, image, closingDateTime, additionalInfo },
                index: number
              ) => (
                <div
                  className="opportunity section-gap page-grid"
                  id={title}
                  key={index}
                >
									<div
                  className="text-wrapper col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-2 xl:col-span-6 xl:col-start-2">
										<h2 className="heading-3">
											{title}
										</h2>
										<h3 className="heading-3-regular mb-4 md:mb-5">
											{organisation}
										</h3>
										<h4 className="heading-4 mb-6 md:mb-7 text-torch-red">
											Applications close {dayjs(closingDateTime).format("D MMMM YYYY, h:mma")}
										</h4>
										{description && (
											<div
												className="body-sans text-block mb-6 md:mb-7"
												dangerouslySetInnerHTML={{
													__html: description,
												}}
											/>
										)}
										{additionalInfo && (
											<a href={additionalInfo.url} target="_blank" download className="heading-4 underline">
												Info / Apply here
											</a>
										)}
									</div>
									{image && (
                    <div className="image hidden md:block md:col-span-3 md:col-start-9 md:mt-8 lg:mt-0 lg:col-span-3 lg:col-start-9 xl:col-span-2 xl:col-start-10 heading-gap">
											<GatsbyImage
											image={image.gatsbyImageData}
											alt={image.alt || title}
											className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-2 xl:col-span-6 xl:col-start-2 heading-gap"
											/>
                    </div>
                  )}
                </div>
              )
            )}
          </section>
          {headerImage.title && (
            <div className="page-grid col-span-12">
              <p className="small-sans section-gap col-span-12 sm:col-span-6 sm:col-start-7 lg:col-span-3 lg:col-start-9 text-silver-chalice">
                Top image: {headerImage.title}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default OpportunitiesPage
