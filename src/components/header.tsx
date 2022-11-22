import React, { useContext, useEffect } from "react"
import ThemeContext from "../context/ThemeContext"
import { Link } from "gatsby"
import { Icon } from "../components/icon"
import { Navigation } from "./navigation"
import { useLocation } from "@reach/router"
import { useHomeQuery } from "../queries/useHomeQuery"
import { LogoJsonLd } from "gatsby-plugin-next-seo"
import { Search } from "./search"

enum HEADER_PATHS {
  PAPERS = "papers",
  ARTICLES = "articles",
  DIGITAL = "digital",
  KIDS = "kids",
}

function pathnameIncludes(pathname: string, path: string): boolean {
  return pathname.includes(path)
}

export const Header = ({ featureColour }) => {
  const { headerLogo, handleHeaderLogo } = useContext(ThemeContext)
  const { pathname } = useLocation()

  useEffect(() => {
    switch (true) {
      case pathnameIncludes(pathname, HEADER_PATHS.PAPERS):
      case pathnameIncludes(pathname, HEADER_PATHS.ARTICLES):
      case pathnameIncludes(pathname, HEADER_PATHS.DIGITAL):
        return handleHeaderLogo("spot")
      case pathnameIncludes(pathname, HEADER_PATHS.KIDS):
        return handleHeaderLogo("none")
      default:
        return handleHeaderLogo("stripe")
    }
  }, [pathname, headerLogo])

  const home = pathname === "/"

  const { datoCmsHome } = useHomeQuery()

  return (
    <>
      <LogoJsonLd
        logo="https://www.datocms-assets.com/53320/1627883556-4afavicon.png"
        url="https://4a.com.au/"
      />
      <header
        className={`header pt-5 md:pt-10 container-fluid page-grid overflow-x-hidden ${
          home ? "home" : ""
        }`}
      >
        {home && (
          <div className="col-span-12 container-fluid home page-grid md:absolute top-0 left-0 right-0 opening-times">
            <h1 className="visually-hidden">
              4A Centre for Contemporary Asian Art
            </h1>
            {datoCmsHome.openingHours && (
              <div
                className="hidden md:block col-span-12 text-center text-white bg-silver-chalice p-3 pb-4 md:p-0 md:text-left md:col-start-7 md:col-span-4 small-sans-medium text-block md:text-silver-chalice md:bg-transparent"
                dangerouslySetInnerHTML={{
                  __html: datoCmsHome.openingHours,
                }}
              />
            )}
          </div>
        )}
        <Navigation />
        <div className="logo col-span-6 col-start-7">
          <Link
            to="../.."
            aria-label="Navigate Home"
            className="w-12 md:w-20 z-20 block ml-auto"
          >
            <Icon
              className="logo"
              variant={headerLogo}
              fill={featureColour || "#FF8039"}
            />
          </Link>
        </div>
        <Search />
      </header>
    </>
  )
}
