import React, { useState, useRef } from "react"
import useOnClickOutside from "use-onclickoutside"
import { Link } from "gatsby"
import { Icon } from "../components/icon"
import { useLocation } from "@reach/router"

export const Navigation = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showWhatsOn, setShowWhatsOn] = useState<boolean>(false)
  const [showWhatsOnText, setShowWhatsOnText] = useState<boolean>(false)
  const [showAbout, setShowAbout] = useState<boolean>(false)
  const [showAboutText, setShowAboutText] = useState<boolean>(false)
  const { pathname } = useLocation()
  const papers = pathname.includes("papers/issue")
  const safepassage = pathname.includes("safe-passage")

  const handleDelayWhatsOn = (delay: number) => {
    setTimeout(() => {
      setShowWhatsOnText(!showWhatsOnText)
    }, delay)

    return () => {
      clearTimeout(delay)
    }
  }

  const handleDelayAbout = (delay: number) => {
    setTimeout(() => {
      setShowAboutText(!showAboutText)
    }, delay)

    return () => {
      clearTimeout(delay)
    }
  }

  const handleDelayCloseMenu = (delay?: number) => {
    setTimeout(() => {
      setShowAboutText(false)
      setShowAbout(false)
      setShowWhatsOn(false)
      setShowWhatsOnText(false)
    }, delay)

    return () => {
      clearTimeout(delay)
    }
  }

  const handleClickOutsideCloseMenu = () => {
    setShowMenu(false)
  }

  const navRef = useRef(null)
  useOnClickOutside(navRef, handleClickOutsideCloseMenu)

  return (
    <div>
      <div className="menu-open fixed">
        <button
          className={`${
            papers || safepassage
              ? "text-white stroke-white"
              : "text-silver-chalice"
          } heading-4 cursor-pointer`}
          onClick={(e) => {
            e.preventDefault()
            setShowMenu(!showMenu)
          }}
          aria-label="Open Navigation"
          aria-expanded={showMenu}
        >
          <svg
            className="inline-block align-top"
            width="26"
            height="18"
            viewBox="0 0 26 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H26" stroke="#959494" strokeWidth="2" />
            <path d="M0 9H26" stroke="#959494" strokeWidth="2" />
            <path d="M0 17H26" stroke="#959494" strokeWidth="2" />
          </svg>
          <span className="hidden md:inline-block md:align-top md:-mt-2 md:ml-4">
            Menu
          </span>
        </button>
      </div>
      <nav
        ref={navRef}
        style={{ transform: `translateX(${showMenu ? 0 : "-100%"})` }}
        className={`${showWhatsOn ? "whats-on" : ""} ${
          showWhatsOnText ? "whats-on-text" : ""
        } ${showAbout ? "about" : ""} ${
          showAboutText ? "about-text" : ""
        } menu body-sans text-black fixed overflow-hidden`}
      >
        <button
          className="close-menu cursor-pointer"
          aria-label="Close Navigation"
          type="button"
          onClick={(e) => {
            e.preventDefault()
            setShowMenu(!showMenu)
            handleDelayCloseMenu(500)
          }}
        >
          <p className="visually-hidden">Close</p>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.746094 1L18.7461 19" stroke="black" strokeWidth="2" />
            <path d="M18.7461 1L0.746095 19" stroke="black" strokeWidth="2" />
          </svg>
        </button>
        <ul>
          <li>
            <Link to="../..">Home</Link>
          </li>
          <li>
            <div className="about has-submenu">
              <button
                className="font-medium"
                aria-expanded={showAbout}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setShowAbout(!showAbout)
                  setShowAboutText(!showAboutText)
                }}
              >
                About
                <svg
                  width="11"
                  height="17"
                  viewBox="0 0 11 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 1L9 8.5L1 16" stroke="black" strokeWidth="2" />
                </svg>
              </button>
              <ul className="about-submenu submenu">
                <li>
                  <Link to="/about">About 4A</Link>
                </li>
                <li>
                  <Link to="/about#history">History</Link>
                </li>
                <li>
                  <Link to="/people">People</Link>
                </li>
                <li>
                  <button
                    className="back cursor-pointer pt-2"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowAbout(!showAbout)
                      handleDelayAbout(400)
                    }}
                  >
                    ← Back
                  </button>
                </li>
              </ul>
            </div>
          </li>
					<li>
            <Link to="/whats-on" aria-label="See What's On">What's On</Link>
          </li>
					<li>
            <Link to="/archive" aria-label="See our Exhibition and Event Archive">Explore our Archive</Link>
          </li>
          <li>
            <Link to="/papers" aria-label="See 4A Papers">4A Papers</Link>
          </li>
          <li>
            <Link to="/digital" aria-label="See 4A Digital">4A Digital</Link>
          </li>
          <li>
            <Link to="/kids" aria-label="See 4A Kids">4A Kids</Link>
          </li>
          <li>
            <Link to="/talks" aria-label="See 4A Talks">4A Talks</Link>
          </li>
          <li>
            <Link to="/news" aria-label="See News">News</Link>
          </li>
          <li>
            <Link to="/visit-us" aria-label="See Visit Us">Visit Us</Link>
          </li>
          <li className="button">
            <Link to="/donate" aria-label="See Donate">Donate</Link>
          </li>
        </ul>
        <div className="w-full absolute left-0 bottom-0 logo">
          <Icon className="logo" variant="spot" fill="#FFFFFF" />
        </div>
      </nav>
    </div>
  )
}
