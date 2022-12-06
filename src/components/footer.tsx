import React, { useContext, useEffect } from "react"
import ThemeContext from "../context/ThemeContext"
import { MailchimpInput } from "../components/mailchimpInput"
import { useFooterQuery } from "../queries/useFooterQuery"
import { GatsbyImage } from "gatsby-plugin-image"
import { useLocation } from "@reach/router"
import { LocalBusinessJsonLd } from "gatsby-plugin-next-seo"

import FacebookIcon from "../images/facebook-icon.inline.svg"
import InstagramIcon from "../images/instagram-icon.inline.svg"
import TwitterIcon from "../images/twitter-icon.inline.svg"

enum FOOTER_PATHS {
  WHATS_ON = "whats-on",
  PAPERS = "papers",
  ARTICLES = "articles",
  CREATIVES = "creatives",
  VISIT_US = "visit-us",
  ABOUT = "about",
  NEWS = "news",
  DONATE = "donate",
  PEOPLE = "people",
  TALKS = "talks",
  ARCHIVE = "archive",
  DIGITAL = "digital",
  DONATIONCONFIRM = "donation-confirmation",
  EXHIBITION = "exhibitions",
  EVENTS = "events",
	OPPORTUNITIES = "opportunities",
}

function pathnameIncludes(pathname: string, path: string): boolean {
  return pathname.includes(path)
}

export const Footer = () => {
  const { datoCmsSiteSetting } = useFooterQuery()
  const { footerColor, handleFooterColor } = useContext(ThemeContext)
  const { pathname } = useLocation()

  useEffect(() => {
    switch (true) {
      case pathnameIncludes(pathname, FOOTER_PATHS.EXHIBITION):
      case pathnameIncludes(pathname, FOOTER_PATHS.EVENTS):
      default:
        return handleFooterColor("#ffffff")
      case pathnameIncludes(pathname, FOOTER_PATHS.WHATS_ON):
      case pathnameIncludes(pathname, FOOTER_PATHS.VISIT_US):
      case pathnameIncludes(pathname, FOOTER_PATHS.CREATIVES):
      case pathnameIncludes(pathname, FOOTER_PATHS.ABOUT):
      case pathnameIncludes(pathname, FOOTER_PATHS.NEWS):
      case pathnameIncludes(pathname, FOOTER_PATHS.DONATE):
      case pathnameIncludes(pathname, FOOTER_PATHS.PEOPLE):
      case pathnameIncludes(pathname, FOOTER_PATHS.TALKS):
      case pathnameIncludes(pathname, FOOTER_PATHS.ARCHIVE):
      case pathnameIncludes(pathname, FOOTER_PATHS.DONATIONCONFIRM):
				case pathnameIncludes(pathname, FOOTER_PATHS.OPPORTUNITIES):
        return handleFooterColor("#ededed")
      case pathnameIncludes(pathname, FOOTER_PATHS.PAPERS):
      case pathnameIncludes(pathname, FOOTER_PATHS.ARTICLES):
        return handleFooterColor("#EEEEE7")
      case pathnameIncludes(pathname, FOOTER_PATHS.DIGITAL):
        return handleFooterColor("#151515")
    }
  }, [pathname, footerColor])

  return (
    <>
      <LocalBusinessJsonLd
        type="ArtGallery"
        id="https://4a.com.au/"
        name={datoCmsSiteSetting.title}
        description={datoCmsSiteSetting.description}
        url="https://www.google.com/maps/dir//181-187+Hay+St,+Haymarket+NSW+2000/@-33.8845308,151.2017637,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x6b12ae236d48483b:0xd3912a95b4bd0ee5!2m2!1d151.2058365!2d-33.8799832"
        telephone={datoCmsSiteSetting.telephone.replace(/\s/g, "")}
        address={{
          streetAddress: "181-187 Hay St",
          addressLocality: "Haymarket",
          addressRegion: "NSW",
          postalCode: "2000",
          addressCountry: "AU",
        }}
        geo={{
          latitude: "-33.879430",
          longitude: "151.203860",
        }}
        images={[
          "https://www.datocms-assets.com/53320/1635916407-sea-pearl-white-cloud-2016-2.jpg?auto=format&w=3543",
        ]}
      />
      <footer
        style={{ backgroundColor: footerColor }}
        className={
          pathnameIncludes(pathname, FOOTER_PATHS.DIGITAL) ? "digital" : ""
        }
      >
        <div className="container-fluid">
          <div className="page-grid pt-12 md:pt-16 lg:pt-20 pb-10">
            <div className="col-span-12 md:col-span-5">
              <p
                className="text-xl-tight md:text-2xl lg:text-2.5xl font-display antialiased"
                dangerouslySetInnerHTML={{
                  __html: datoCmsSiteSetting.acknowledgement,
                }}
              />
            </div>
            <div className="col-span-12 md:col-start-7 md:col-span-5 mt-8 md:mt-0 mb-14">
              <h4 className="heading-4 mb-6">Subscribe to our newsletter</h4>
              <MailchimpInput />
              <div className="grid grid-cols-6">
                <div className="col-span-12 xl:col-span-3">
                  <h4 className="heading-4 mb-5">Visit Us</h4>
                  <p
                    className="small-sans"
                    dangerouslySetInnerHTML={{
                      __html: datoCmsSiteSetting.address,
                    }}
                  />
                </div>
                <div className="col-span-12 xl:col-span-2 xl:col-start-5 mt-8 md:mt-10 xl:mt-0">
                  <h4 className="heading-4 mb-5">Get in Touch</h4>
                  <p className="small-sans">
                    T{" "}
                    <a href={`tel:${datoCmsSiteSetting.telephone}`}>
                      {datoCmsSiteSetting.telephone}
                    </a>
                  </p>
                  <p className="small-sans mb-5">
                    E{" "}
                    <a href={`mailto:${datoCmsSiteSetting.email}`}>
                      {datoCmsSiteSetting.email}
                    </a>
                  </p>
                  <p className="small-sans font-medium">Postal address</p>
                  <div
                    className="small-sans mb-5"
                    dangerouslySetInnerHTML={{
                      __html: datoCmsSiteSetting.postalAddress,
                    }}
                  />
                  <div className="flex">
                    <a
                      className="mr-1"
                      href={datoCmsSiteSetting.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Navigate to Facebook"
                    >
                      <FacebookIcon />
                    </a>
                    <a
                      className="mr-1"
                      href={datoCmsSiteSetting.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Navigate to Instagram"
                    >
                      <InstagramIcon />
                    </a>
                    <a
                      className="mr-1"
                      href={datoCmsSiteSetting.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Navigate to Twitter"
                    >
                      <TwitterIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-full col-span-12 mb-12 xl:mb-14"
              style={{ borderBottom: "2px solid #C6C6C6" }}
            />
            <div className="col-span-12 md:col-span-6 mb-8 xl:col-span-5">
              <div
                id="partner-logos"
                className="grid grid-cols-4 gap-3 xl:grid-cols-5 xl:gap-4"
              >
                {datoCmsSiteSetting.partnerLogos.map(
                  ({ link, logo }, index: number) => (
                    <a href={link} target="_blank" key={index}>
                      <GatsbyImage
                        image={logo.gatsbyImageData}
                        alt={logo.alt}
                        className="h-14 col-span-1 opacity-50"
                      />
                    </a>
                  )
                )}
              </div>
            </div>
            <div className="md:col-start-7 col-span-12 md:col-span-5 mb-8">
              <div
                className="text-xs font-sans antialiased opacity-50 mb-6"
                dangerouslySetInnerHTML={{
                  __html: datoCmsSiteSetting.partnerAcknowledgement,
                }}
              />
              <p className="text-xs font-sans antialiased opacity-50">
                © {new Date().getFullYear()} {datoCmsSiteSetting.title}
                <br />
                Website by{" "}
                <a
                  href="https://ellewilliams.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Elle Williams Studio
                </a>{" "}
                &amp;{" "}
                <a
                  href="https://srrycmpny.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sorry Company
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
