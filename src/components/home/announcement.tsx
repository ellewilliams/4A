import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Controller, Scene } from "react-scrollmagic"
import { Tween, Timeline } from "react-gsap"

export const Announcement = ({ block }) => (
  <div className="announcement h-64 sm:h-72 relative section-gap overflow-hidden">
    <div className="page-grid section-gap container-fluid text-center absolute top-1/2 w-full z-10 left-0 right-0">
      {block.subHeading && (
        <Link to={`${block.link}`} className="col-span-12 heading-3 text-white">
          <h3>{block.subHeading}</h3>
        </Link>
      )}
      <Link
        to={`${block.link}`}
        className="col-span-12 heading-1-regular text-white my-3 md:my-4"
      >
        <h2>{block.heading}</h2>
      </Link>
      {block.callToAction && (
        <Link
          to={`${block.link}`}
          className="col-span-12 text-white body-sans mt-2 underline"
        >
          <p className="">{block.callToAction}</p>
        </Link>
      )}
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
              yPercent: -20,
            }}
            to={{
              yPercent: 20,
            }}
            ease="none"
          >
            <div className="image-wrapper">
              <GatsbyImage
                image={block.backgroundImage.gatsbyImageData}
                alt={block.backgroundImage.alt || block.callToAction}
                className="w-full object-cover absolute top-0 h-full"
              />
            </div>
          </Tween>
        </Timeline>
      </Scene>
    </Controller>
  </div>
)
