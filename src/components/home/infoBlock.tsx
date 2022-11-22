import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Controller, Scene } from "react-scrollmagic"
import { Tween, Timeline } from "react-gsap"

export const Info = ({ block }) => (
  <div className="info-block bg-light-grey col-span-12 md:grid md:grid-cols-2 md:gap-x-10 lg:gap-x-14 section-gap">
    <div className="info-image-wrapper w-full md:order-2 md:col-span-1 md:col-start-2 overflow-hidden md:overflow-visible">
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
                yPercent: 0,
              }}
              ease="none"
            >
              <div className="image-wrapper">
                <GatsbyImage
                  image={block.image.gatsbyImageData}
                  alt={block.image.alt || block.title}
                  className="w-full h-48 sm:h-72 md:h-full object-cover"
                />
              </div>
            </Tween>
          </Timeline>
        </Scene>
      </Controller>
    </div>
    <div className="text-column medium-gap-top md:order-1 md:col-span-1">
      <div className="info-block-text-wrapper px-5 md:pl-10 md:pr-0 lg:pl-11">
        <div className="text-wrapper col-span-12 grid grid-cols-12 md:grid-cols-6 gap-x-5 md:gap-x-10 lg:gap-x-14">
          <h3 className="heading-3 text-torch-red mb-5 md:mb-6 col-span-12 md:col-span-6 xl:col-span-5">
            {block.title}
          </h3>
          <div
            className="col-span-12 md:col-span-6 xl:col-span-5 text-block"
            dangerouslySetInnerHTML={{ __html: block.description }}
          />
          <Link
            to={`${block.link}`}
            className="body-sans underline col-span-10 col-start-3 md:col-span-4 md:col-start-3 mt-5 md:mt-6 medium-gap"
          >
            {block.callToAction}
          </Link>
        </div>
      </div>
    </div>
  </div>
)
