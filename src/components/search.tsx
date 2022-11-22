import React, { useState, useRef, useEffect } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { GatsbyImage } from "gatsby-plugin-image"
import { useFlexSearch } from "react-use-flexsearch"

export const Search = () => {
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false)

  const data = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
    }
  `)
  const { index, store } = data.localSearchPages
  const [query, setQuery] = useState(null)
  const [inputText, setInputText] = useState("")
  const inputRef = useRef(null)
  const resultsRef = useRef(null)
  const search = useFlexSearch(query, index, store)
  const resultsPluralized = (results) =>
    results.length === 1 ? "result" : "results"
  const initialMsg = "Looking for something?"
  const resetMsg = "Try another search?"
  const resultsMsg = `Showing ${search.length} ${resultsPluralized(search)} for`
  const noResultsMsg = "No results for"
  const [accessibleStatusMsg, setAccessibleStatusMsg] = useState("")
  const [statusMsg, setStatusMsg] = useState(initialMsg)

  const handleSearch = (e) => {
    e.preventDefault()
    setQuery(inputText)
  }

  const clearSearch = () => {
    setInputText("")
    setQuery("")
    setStatusMsg(initialMsg)
    setAccessibleStatusMsg("")
    inputRef.current.value = ""
    inputRef.current.focus()
  }

  const handleKeyup = (e) => {
    if (e.key === "Backspace") {
      setStatusMsg(initialMsg)
      setAccessibleStatusMsg("")
    }

    if (e.key === "Escape") {
      clearSearch()
      setAccessibleStatusMsg("")
    }
  }

  useEffect(() => {
    const hasQuery = query ? Boolean(query.length) : false
    const hasResults = Boolean(search.length)

    if (hasQuery && hasResults) {
      setStatusMsg(resultsMsg)
      setAccessibleStatusMsg(
        `${resultsMsg} ${query}, ${search.length} ${resultsPluralized(search)}`
      )
      resultsRef.current.focus()
    }

    if (hasQuery && !hasResults) {
      setStatusMsg(noResultsMsg)
      setAccessibleStatusMsg(`${noResultsMsg} ${query}`)
    }
  }, [search])

  const handleClickThrough = (type: string, slug: string) => {
    const modelTypeName = type.replace("Single ", "").replace("Studio ", "")
    const slugPrefix = modelTypeName.replace(/\s+/g, "-").toLowerCase()

    // Guard clause
    if (slugPrefix === "digital-project") return `/digital/${slug}`
		if (slugPrefix === "special-event") return `/events/${slug}`
		if (slugPrefix === "event-series") return `/${slug}`

    // Pluralize slug prefix and return path
    return `/${slugPrefix}s/${slug}`
  }

  const removeSingle = (text: string) => text.replace("Single ", "")

  return (
    <div className="page-grid block">
      <div className="absolute left-16 md:left-44 md:-ml-2 top-5 md:top-9">
        <button
          className="search-icon fill-silver-chalice"
          onClick={() => {
            setShowSearchModal(true)
            document.getElementsByTagName("html")[0].style.overflow = "hidden"
            document.getElementsByTagName("header")[0].style.zIndex = "100"
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.9872 14.0638C17.0596 12.6 17.7021 10.8 17.7021 8.85106C17.7021 3.97021 13.7319 0 8.85106 0C3.97021 0 0 3.97021 0 8.85106C0 13.7319 3.97021 17.7021 8.85106 17.7021C10.8 17.7021 12.6 17.0596 14.0638 15.9872L20.0766 22L22 20.0766C22 20.0723 15.9872 14.0638 15.9872 14.0638ZM8.85106 14.9787C5.47234 14.9787 2.7234 12.2298 2.7234 8.85106C2.7234 5.47234 5.47234 2.7234 8.85106 2.7234C12.2298 2.7234 14.9787 5.47234 14.9787 8.85106C14.9787 12.2298 12.2298 14.9787 8.85106 14.9787Z"
              fill="#9C9C9C"
            />
          </svg>
        </button>
      </div>
      {showSearchModal && (
        <div className="search-popup fixed z-40 bg-light-grey w-full h-full left-0 right-0 p-5 pt-14 md:p-14 top-0 overflow-y-auto">
          <button
            className="close-menu cursor-pointer fixed top-5 right-5 z-50"
            onClick={() => {
              setShowSearchModal(false)
              document.getElementsByTagName("html")[0].style.overflow = "auto"
              document.getElementsByTagName("header")[0].style.zIndex = "20"
              clearSearch()
            }}
          >
            <p className="visually-hidden">Close</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.746094 1L22.7461 23" stroke="black" strokeWidth="2" />
              <path d="M22.7461 1L0.746095 23" stroke="black" strokeWidth="2" />
            </svg>
          </button>

          <HelmetDatoCms title="Search" />
          <div className="search-top mt-10 md:mt-14 lg:mt-18 container-fluid">
            <p className="search-status body-sans small-gap">
              <span role="region" aria-live="polite" className="hidden">
                {accessibleStatusMsg}
              </span>
              <span>{statusMsg}</span>
            </p>
          </div>
          <div className="search-bar container-fluid">
            <div className="form-wrap col-sm-12 col">
              <form
                className="search-form"
                action="."
                onSubmit={(e) => {
                  handleSearch(e)
                }}
              >
                <label htmlFor="searchInput" className="hidden">
                  Search website
                </label>
                <input
                  type="text"
                  name="search"
                  autoComplete="off"
                  autoFocus
                  id="searchInput"
                  className="search-input heading-1 bg-transparent overflow-visible text-silver-chalice small-gap"
                  placeholder="Search"
                  ref={inputRef}
                  onKeyUp={(e) => handleKeyup(e)}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button
                  type="submit"
                  aria-label="submit search"
                  className="search-button"
                />
                <button
                  type="button"
                  aria-label="clear search"
                  className={`${
                    inputText.length ? "on" : "off"
                  } btn clear-search`}
                  onClick={clearSearch}
                />
              </form>
            </div>
          </div>
          <section
            ref={resultsRef}
            aria-label="search results"
            className="search-results container-fluid"
            style={{ display: query && query.length > 0 ? "block" : "none" }}
          >
            <div className="col-sm-12 offset-sm-2">
              <div className="results-detail col">
                <button
                  type="button"
                  aria-label="clear search"
                  className="btn clear-search"
                  onClick={clearSearch}
                >
                  <div className="small-sans heading-gap underline">
                    {resetMsg}
                  </div>
                </button>
              </div>
              <ul className="page-grid">
                {search.length > 0 &&
                  search.map((result: any) => (
                    <li
                      key={result.id}
                      className="col-span-6 lg:col-span-4 mb-12 md:mb-16"
                    >
                      <Link
                        to={handleClickThrough(result.type, result.slug)}
                        aria-labelledby={result.id}
												onClick={() => {
													setShowSearchModal(false)
													document.getElementsByTagName("html")[0].style.overflow = "auto"
													document.getElementsByTagName("header")[0].style.zIndex = "20"
													clearSearch()
												}}
                      >
                        {result.image && result.image.gatsbyImageData && (
                          <GatsbyImage
                            className="tile-image"
                            image={result.image.gatsbyImageData}
                            alt={result.image.alt}
                          />
                        )}
                        <div className="tile-text-wrap no-underline my-4 md:my-5">
                          <p className="tile-category body-sans mb-1">
                            {removeSingle(result.type)}
                          </p>
                          <span
                            id={result.id}
                            className="heading-3 text-torch-red result-title"
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: result.title,
                            }}
                          />
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
