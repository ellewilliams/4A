import React, { useState } from "react"
import Layout from "../components/layout"
import getStripe from "../utils/stripejs"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { useDonateQuery } from "../queries/useDonateQuery"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { Controller, Scene } from "react-scrollmagic"
import { Tween, Timeline } from "react-gsap"

const DonatePage = () => {
  const { datoCmsDonate } = useDonateQuery()
  const {
    seoMetaTag,
    title,
    headerImageVideo,
    description,
    donationOptions,
    titlePatrons,
    descriptionPatrons,
    titleSupporters,
    supporterTiers,
    onlineDonationIntroduction,
  } = datoCmsDonate

  return (
    <Layout theme="white">
      <HelmetDatoCms title="Donate" seo={seoMetaTag} />
      <div className="donate">
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
                      image={headerImageVideo.gatsbyImageData}
                      alt={headerImageVideo.alt || title}
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
            className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-2 xl:col-span-6 xl:col-start-2 medium-gap"
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
            <Link
              aria-labelledby="Scroll to Online Donations form"
              to={"#online-donations"}
            >
              Online donations{" "}
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
            <Link
              aria-labelledby="Scroll to Patron's Program"
              to={"#patrons-program"}
            >
              Patron's program{" "}
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
            <Link
              aria-labelledby="Scroll to Our Supporters"
              to={"#our-supporters"}
            >
              Our supporters{" "}
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
        </div>
        {/* {allStripePrice.nodes.length > 0 && ( */}
        <div id="online-donations" className="donate-section bg-light-grey">
          <div className="container-fluid page-grid">
            <section
              aria-labelledby="Donate Online"
              className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-2 xl:col-span-6 xl:col-start-2 medium-gap mt-12 md:mt-14 lg:mt-20"
            >
              <h3 className="heading-3 text-torch-red small-gap">
                Donate Online
              </h3>
              {onlineDonationIntroduction && (
                <div
                  className="body-sans text-block small-gap"
                  dangerouslySetInnerHTML={{
                    __html: onlineDonationIntroduction,
                  }}
                />
              )}
              <div className="relative mb-6 md:mb-8 bg-donate-options grid grid-cols-3 text-white text-center heading-4 lg:w-3/4">
                <a
                  href="https://buy.stripe.com/14keYc0tt7fLf5u4gg"
                  target="_blank"
                  className="price-option relative border p-3 md:p-4 cursor-pointer md:pl-4 md:pr-6 focus:outline-none amount-option transition duration-300 hover:bg-torch-red"
                >
                  $25
                </a>
                <a
                  href="https://buy.stripe.com/6oEaHWccb7fLe1q145"
                  target="_blank"
                  className="price-option relative border p-3 md:p-4 cursor-pointer md:pl-4 md:pr-6 focus:outline-none amount-option transition duration-300 hover:bg-torch-red"
                >
                  $250
                </a>
                <a
                  href="https://buy.stripe.com/28oeYcdgfeIde1q6oq"
                  target="_blank"
                  className="price-option relative border p-3 md:p-4 cursor-pointer md:pl-4 md:pr-6 focus:outline-none amount-option transition duration-300 hover:bg-torch-red"
                >
                  $2,500
                </a>
                <a
                  href="https://buy.stripe.com/6oEaHWgsreId8H66os"
                  target="_blank"
                  className="price-option relative border p-3 md:p-4 cursor-pointer md:pl-4 md:pr-6 focus:outline-none amount-option transition duration-300 hover:bg-torch-red"
                >
                  $88
                </a>
                <a
                  href="https://buy.stripe.com/28o03iekj7fLf5uaEJ"
                  target="_blank"
                  className="price-option relative border p-3 md:p-4 cursor-pointer md:pl-4 md:pr-6 focus:outline-none amount-option transition duration-300 hover:bg-torch-red"
                >
                  $888
                </a>
                <a
                  href="https://buy.stripe.com/3cs8zOfon9nT1eE6ov"
                  target="_blank"
                  className="price-option relative border p-3 md:p-4 cursor-pointer md:pl-4 md:pr-6 focus:outline-none amount-option transition duration-300 hover:bg-torch-red"
                >
                  $2,888
                </a>
              </div>
            </section>
          </div>
        </div>
        {/* )} */}
        <div className="container-fluid page-grid">
          <section
            aria-labelledby="Donation Options"
            className="donate-options col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-2 xl:col-span-6 xl:col-start-2 section-gap"
          >
            {donationOptions.map(({ title, description }) => (
              <div
                key={title}
                className="donation-option mt-12 md:mt-14 lg:mt-20 medium-gap"
              >
                <h3 className="heading-3 text-torch-red mb-5 md:mb-6">
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
          <section
            aria-labelledby="Patrons Program"
            id="patrons-program"
            className="col-span-12 page-grid section-gap"
          >
            <h3 className="heading-feature text-torch-red col-span-12 heading-gap">
              {titlePatrons}
            </h3>
            {descriptionPatrons && (
              <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-2 xl:col-span-6 xl:col-start-2">
                <div
                  className="body-sans text-block"
                  dangerouslySetInnerHTML={{
                    __html: descriptionPatrons,
                  }}
                />
              </div>
            )}
          </section>
          <section
            aria-labelledby="Our Supporters"
            id="our-supporters"
            className="col-span-12 page-grid medium-gap"
          >
            <h3 className="heading-feature text-torch-red col-span-12 heading-gap">
              {titleSupporters}
            </h3>
            {supporterTiers.map(({ title, names }) => (
              <div
                key={title}
                className="supporter-tier heading-gap col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-2 xl:col-span-6 xl:col-start-2"
              >
                <h3 className="heading-3 text-silver-chalice mb-5 md:mb-6">
                  {title}
                </h3>
                {names && (
                  <div
                    className="body-sans text-block"
                    dangerouslySetInnerHTML={{
                      __html: names,
                    }}
                  />
                )}
              </div>
            ))}
          </section>
          {headerImageVideo.title && (
            <div className="page-grid col-span-12">
              <p className="small-sans section-gap col-span-12 sm:col-span-6 sm:col-start-7 lg:col-span-3 lg:col-start-9 text-silver-chalice">
                Top image: {headerImageVideo.title}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default DonatePage
