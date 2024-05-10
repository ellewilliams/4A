import React, { ReactNode } from "react"
import SEO from "./seo"
import { Header } from "../components/header"
import { Footer } from "./footer"
import { useThemeColor } from "../hooks/useThemeColor"
import { useLocation } from "@reach/router"

import "../styles/index.scss"
import "slick-carousel/slick/slick.css"

interface LayoutProps {
  children: ReactNode
  theme: string
  darkMode?: boolean
  featureColor?: string
}

export default function Layout(props: LayoutProps) {
  const { children, theme, darkMode, featureColor } = props
  const { color } = useThemeColor(theme)
  const { pathname } = useLocation()
  const safePassage = pathname.includes("safe-passage")
  const papers = pathname.includes("papers/issue")
	const article = pathname.includes("articles/")

  return (
    <>
      <SEO lang="en-US" />
      <div
        className={`${safePassage ? "relative z-10" : ""} ${darkMode ? "theme-dark" : "theme-light"
          } ${safePassage ? "safe-passage" : ""} ${papers ? "papers-issue" : ""} ${article ? `${pathname.split('/').filter(x => x).join('-')}` : ""}`}
        style={{ backgroundColor: color }}
      >
        <Header featureColour={featureColor} type="4a" />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
