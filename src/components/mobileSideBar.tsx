import React, { useState, useRef, useEffect } from "react"
import { Link } from "gatsby"

interface MobileSideBarProps {
  backgroundColor: string
  featureColour: string
  publishedMonth?: string
  articles: any
  title: string
  slug: string
}

export const MobileSideBar = (props: MobileSideBarProps) => {
  const { backgroundColor, featureColour, articles, title, slug } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${!isOpen && "bottom-0"
          } left-0 px-5 md:px-10 lg:hidden w-full body-serif text-left text-white py-2 transition-bottom duration-500 z-20`}
        style={{
          backgroundColor: featureColour,
          bottom: isOpen && "calc(100% - 42px",
        }}
      >
        {title}
        <svg
          width="22"
          height="14"
          viewBox="0 0 22 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`float-right my-1.5 ${!isOpen && "transform rotate-180"}`}
        >
          <path d="M2 2L11 11L20 2" stroke="white" strokeWidth="3" />
        </svg>
      </button>
      <div
        className={`mobile-menu w-full auto-rows-min grid grid-cols-12 gap-x-5 h-full lg:hidden overflow-y-scroll overscroll-x-hidden fixed left-0 transition-top duration-500 pr-5 pl-5 z-20 ${!isOpen && "top-full"
          }`}
        style={{
          top: isOpen && 42,
          backgroundColor: backgroundColor,
        }}
      >
        <p className="mt-12 col-span-12 sm:col-span-9 md:col-span-7 lg:mt-14 mb-2 text-silver-chalice body-serif font-medium">
          4A Papers
        </p>
        <h2
          className="heading-1 col-span-12 sm:col-span-9 md:col-span-7 mb-8 lg:mb-12"
          style={{ color: featureColour }}
        >
          {title}
        </h2>
        {articles.map(({ id, title, author, slug, letterFromTheEditor }) => (
          <a
            href={`/articles/${slug}`}
            key={id}
            className={`col-span-12 sm:col-span-9 md:col-span-7 text-black`}
            aria-label={
              letterFromTheEditor
                ? "Navigate to Letter from the Editor"
                : `Navigate to ${title}`
            }
          >
            {letterFromTheEditor ? (
              <p className="mb-6 lg:mb-7">
                <span className="antialiased body-serif hover:underline">
                  Letter from the Editor
                </span>{" "}
                <br></br>
                <span>{author[0].name}</span>
              </p>
            ) : (
              <p className="mb-6 lg:mb-7 body-serif hover:underline">
                <span className="font-medium">{title}</span> <br></br>
                <span>{author[0].name}</span>
              </p>
            )}
          </a>
        ))}
        <Link
          to={`/papers/${slug}`}
          aria-label={`Back to ${title}`}
          className="underline block mt-10 mb-20 body-serif col-span-12 sm:col-span-9 md:col-span-7 text-black inline-block"
        >
          Back to {title}
        </Link>
      </div>
    </>
  )
}
