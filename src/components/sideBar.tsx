import React, { useContext, useEffect } from "react"
import { Link } from "gatsby"
import { Icon } from "../components/icon"
import ThemeContext from "../context/ThemeContext"
import { useLocation } from "@reach/router"

interface SideBarProps {
  backgroundColor: string
  featureColour: string
  publishedMonth: string
  articles: any
  title: string
  slug?: string
}

export const SideBar = (props: SideBarProps) => {
  const {
    backgroundColor,
    featureColour,
    publishedMonth,
    articles,
    title,
    slug,
  } = props
  const { pathname } = useLocation()
  const article = pathname.includes("articles")

  return (
    <div
      className={`${
        article ? "hidden lg:block" : ""
      } lg:sticky lg:top-0 z-30 relative papers-menu"`}
    >
      <div
        className="lg:-mt-28 lg:pb-20 px-5 md:px-10 lg:px-8 sidebar-box-shadow z-30 lg:h-screen overflow-scroll hide-scroll-bar lg:sticky top-0"
        style={{
          backgroundColor: backgroundColor,
          color: "#000",
        }}
      >
        <div className="overflow-y-auto">
          <div className="flex-row-reverse pt-10 hidden lg:flex lg:w-20 lg:ml-auto">
            <Link to="../.." aria-label="Navigate to Papers">
              <Icon variant="spot" fill={featureColour} />
            </Link>
          </div>
          <p className="mt-12 lg:mt-14 mb-2 text-silver-chalice body-serif font-medium">
            4A Papers
          </p>
          <h2
            className="heading-1-regular mb-8 lg:mb-12"
            style={{ color: featureColour }}
          >
            {title}
          </h2>
          {articles.map(({ id, title, author, slug, letterFromTheEditor }) => (
            <a
              href={`/articles/${slug}`}
              key={id}
              aria-label={
                letterFromTheEditor
                  ? "Navigate to Letter from the Editor"
                  : `Navigate to ${title}`
              }
            >
              <p className="body-serif mb-6 lg:mb-7 hover:underline">
                <span className="font-medium">
                  {letterFromTheEditor ? "Letter from the Editor" : title}{" "}
                </span>
                <br />
                <span>{author[0].name}</span>
              </p>
            </a>
          ))}
          <p className="mt-10 mb-10 text-silver-chalice small-sans">
            Published {publishedMonth}
          </p>
          {article ? (
            <Link
              to={`/papers/${slug}`}
              aria-label={`Back to ${title}`}
              style={{
                backgroundColor: featureColour,
              }}
              className="underline block mt-20 mb-10 lg:mb-2 lg:hidden body-serif"
            >
              Back to {title}
            </Link>
          ) : (
            <Link
              to="/papers"
              aria-label="Navigate back to 4A Papers"
              className="hidden underline mt-10 mb-20 body-serif lg:hidden inline-block"
            >
              Back to 4A Papers
            </Link>
          )}
        </div>
      </div>
      {article ? (
        <Link
          to={`/papers/${slug}`}
          aria-label={`Back to ${title}`}
          style={{
            backgroundColor: featureColour,
          }}
          className="hidden z-50 lg:block lg:sticky lg:bottom-0 lg:px-8 lg:py-3 lg:text-white lg:no-underline lg:w-full body-serif"
        >
          ← Back to {title}
        </Link>
      ) : (
        <Link
          to="/papers"
          aria-label="Navigate back to 4A Papers"
          style={{
            backgroundColor: featureColour,
          }}
          className="block body-serif antialiased px-5 py-2 w-full lg:sticky lg:bottom-0 lg:px-8 lg:py-3 text-white lg:no-underline z-30"
        >
          ← Back to 4A Papers
        </Link>
      )}
    </div>
  )
}
