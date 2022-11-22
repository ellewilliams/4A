import React, { useEffect, useRef, useState } from "react"
import SwiperCore, { Autoplay, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

SwiperCore.use([Navigation])

export const SwiperGallery = ({ slides }) => {
  const [swiperIndex, setSwiperIndex] = useState<number>(0)
  const [swiperCaption, setSwiperCaption] = useState<string>("")
  const swiperRef = useRef<Swiper>(null)

  useEffect(() => {
    setSwiperCaption(slides[swiperIndex]?.title || "")
  }, [swiperIndex])

  return (
    <>
      <Swiper
        // @ts-ignore
        ref={swiperRef}
        spaceBetween={0}
        speed={0}
        slidesPerView={1}
				autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
				navigation={false}
        onActiveIndexChange={(swiper) => setSwiperIndex(swiper.activeIndex)}
				modules={[Autoplay, Navigation]}
				className="pointer-events-none"
      >
        {slides.map((slide: any, index: number) => (
          <SwiperSlide key={index}>
						<img
              src={slide.url}
              alt={slide.alt || slide.title || `Gallery Image ${index}`}
							className="w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
