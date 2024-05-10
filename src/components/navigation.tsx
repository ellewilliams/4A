import React, { useState, useRef } from "react"
import useOnClickOutside from "use-onclickoutside"
import { Link } from "gatsby"
import { Icon } from "../components/icon"
import { useLocation } from "@reach/router"
import { useMenuQuery } from "../queries/useMenuQuery"

export const Navigation = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const { pathname } = useLocation()
  const papers = pathname.includes("papers/issue")
  const safepassage = pathname.includes("safe-passage")
  const { datoCmsMenu } = useMenuQuery()
  const { menuItems } = datoCmsMenu

  const [showSubmenus, setShowSubmenus] = useState<{ [key: string]: boolean }>({})
  const [showSubmenuTexts, setShowSubmenuTexts] = useState<{ [key: string]: boolean }>({})

  const handleDelayCloseMenu = (delay?: number) => {
    setTimeout(() => {
      setShowMenu(false)
    }, delay)

    return () => {
      clearTimeout(delay)
    }
  }

  const handleClickOutsideCloseMenu = () => {
    setShowMenu(false)
  }

  const toggleSubmenu = (linkName: string) => {
    setShowSubmenus((prevState) => ({
      ...prevState,
      [linkName]: !prevState[linkName]
    }))
    setShowSubmenuTexts((prevState) => ({
      ...prevState,
      [linkName]: !prevState[linkName]
    }))
  }

  const navRef = useRef(null)
  useOnClickOutside(navRef, handleClickOutsideCloseMenu)

  // Function to check if any submenu is open
  const isAnySubmenuOpen = Object.values(showSubmenus).some((value) => value)

  return (
    <div className="menu-container">
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
        className={`menu body-sans text-black fixed overflow-hidden ${isAnySubmenuOpen ? 'submenu-open' : ''}`}
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
        <ul className="main">
          {menuItems.map(({ link, linkName, externalLink, subMenu }, index: number) => (
            <li key={index} className={linkName}>
              {subMenu && subMenu.length > 0 ? (
                <div className="has-submenu">
                  <button
                    className="font-medium"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      toggleSubmenu(linkName)
                    }}
                    aria-expanded={showSubmenus[linkName]}
                  >
                    {linkName}
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
									<ul
										className={`${linkName}-submenu submenu`}
										aria-expanded={showSubmenus[linkName]}
									>
                    {subMenu.map(({ link, linkName, externalLink }, index: number) => (
                      <li key={index} className={linkName}>
                        <a
                          href={link ? link : undefined}
                          aria-label={`Go to ${linkName}`}
                          {...(externalLink ? { target: "_blank" } : {})}
                        >
                          {linkName}
                        </a>
                      </li>
                    ))}
										<li>
												<button
													className="back cursor-pointer pt-2"
													onClick={(e) => {
														e.preventDefault()
														toggleSubmenu(linkName)
													}}
												>
													← Back
												</button>
											</li>
                  </ul>
                </div>
              ) : (
                <a
                  href={link ? link : undefined}
                  aria-label={`Go to ${linkName}`}
                  {...(externalLink ? { target: "_blank" } : {})}
                >
                  {linkName}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
