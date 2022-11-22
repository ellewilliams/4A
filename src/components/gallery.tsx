import React, { useState, useRef, Fragment } from "react"
import Slider from "react-slick"
import { GatsbyImage } from "gatsby-plugin-image"

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  controls: false,
  swipeToSlide: true,
  arrows: false,
}

function handleGallerySize(size: string): string {
  switch (size) {
    case "SMALL":
      return "col-span-12 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-3 3xl:col-span-3 3xl:col-start-3"
    case "MEDIUM":
      return "col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-2 3xl:col-span-5 3xl:col-start-2"
    default:
      return "col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-2 3xl:col-span-5 3xl:col-start-2"
  }
}

export const Gallery = ({ block }) => {
  const sliderRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState<any>(1)
  const sliderLength = block.gallery.length

  const handleSliderControls = () => {
    const prevSlideCount: number | void =
      currentSlide === 0 ? setCurrentSlide(sliderLength) : currentSlide - 1
    const nextSlideCount: number | void =
      currentSlide > sliderLength ? setCurrentSlide(1) : currentSlide + 1

    return (
      <div className="text-right">
        <button
          type="button"
          className="antialiased slider-control-prev mr-1 font-sans text-lg"
          aria-label="Previous"
          onClick={() => {
            sliderRef.current.slickPrev()
            setCurrentSlide(prevSlideCount)
          }}
        />
        <span className="antialiased font-sans text-lg">{currentSlide}</span>
        <span className="antialiased font-sans text-lg">/</span>
        <span className="antialiased font-sans text-lg">{sliderLength}</span>
        <button
          type="button"
          className="antialiased slider-control-next ml-1 font-sans text-lg"
          aria-label="Next"
          onClick={() => {
            sliderRef.current.slickNext()
            setCurrentSlide(nextSlideCount)
          }}
        />
      </div>
    )
  }

  return (
    <div key={block.id} className="block-grid">
      <div className={handleGallerySize(block.imageSize)}>
        <Slider {...settings} ref={sliderRef}>
          {block.gallery.map((image: any, index: number) => (
            <Fragment key={index}>
              <GatsbyImage
                image={image.gatsbyImageData}
                alt={image.alt}
                className="mb-1"
              />
              <div className="grid grid-cols-12">
                <div className="col-span-9 small-sans text-silver-chalice">
                  {image.title}
                </div>
                <div className="col-span-3 text-base md:text-l lg:text-xl">
                  {sliderLength > 1 && handleSliderControls()}
                </div>
              </div>
            </Fragment>
          ))}
        </Slider>
      </div>
    </div>
  )
}
