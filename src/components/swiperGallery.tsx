import React, { useEffect, useRef, useState } from "react"
import SwiperCore, { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useWindowSize } from "../hooks/useWindowSize"
import "swiper/css"

SwiperCore.use([Navigation])

export const SwiperGallery = ({ slides }) => {
  const [swiperIndex, setSwiperIndex] = useState<number>(0)
  const [swiperCaption, setSwiperCaption] = useState<string>("")
  const swiperRef = useRef<typeof Swiper>(null)

  useEffect(() => {
    setSwiperCaption(slides[swiperIndex]?.title || "")
  }, [swiperIndex])

  // const size: Size = useWindowSize();
  // if (size.width => 1024) { `do something` }

  return (
    <>
      <Swiper
        // @ts-ignore
        ref={swiperRef}
        spaceBetween={20}
        speed={500}
        slidesPerView="auto"
        onReachEnd={(swiper) => {
          setTimeout(() => {
            swiper.update()
            swiper.slideTo(0)
          }, 300)
        }}
        onActiveIndexChange={(swiper) => setSwiperIndex(swiper.activeIndex)}
      >
        {slides.map((slide: any, index: number) => (
          <SwiperSlide key={index}>
            <GatsbyImage
              image={slide.gatsbyImageData}
              alt={slide.alt || slide.title || `Gallery Image ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="container-fluid page-grid mt-4 md:mt-5">
        <div className="col-span-3 sm:col-span-2 lg:col-span-1">
          <button
            type="button"
            className="heading-4-regular"
            // @ts-ignore
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            ←<span className="sr-only">Next</span>
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            className="heading-4-regular"
            // @ts-ignore
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            →<span className="sr-only">Next</span>
          </button>
        </div>
        <div className="small-sans text-silver-chalice col-span-9 col-start-4 sm:col-span-8 sm:col-start-3 lg:col-span-7 lg:col-start-2">
          {swiperCaption}
        </div>
      </div>
    </>
  )
}
