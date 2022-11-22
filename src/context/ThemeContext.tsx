import React, { ReactNode, createContext, useEffect, useState } from "react"

interface DefaultStateProps {
  themeDark: boolean
  toggleDark: (isDark: boolean) => void
  accentColor: string
  handleAccentColor: (color: string) => void
  footerColor: string
  handleFooterColor: (color: string) => void
  headerLogo: string
  handleHeaderLogo: (variant: string) => void
}

const defaultState = {
  themeDark: false,
  toggleDark: (isDark: boolean) => {},
  accentColor: "#fff",
  handleAccentColor: (color: string) => {},
  footerColor: "#fff",
  handleFooterColor: (color: string) => {},
  headerLogo: "stripe",
  handleHeaderLogo: (variant: string) => {},
}

const ThemeContext = createContext<DefaultStateProps>(defaultState)
// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
// const supportsDarkMode = () =>
//   window.matchMedia("(prefers-color-scheme: dark)").matches === true

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props
  const [themeDark, setThemeDark] = useState<boolean>(false)
  const [accentColor, setAccentColor] = useState<string>("#FF8039")
  const [footerColor, setFooterColor] = useState<string>("#fff")
  const [headerLogo, setHeaderLogo] = useState<string>("stripe")

  const toggleDark = (isDark: boolean) => {
    setThemeDark(isDark)
  }

  const handleAccentColor = (color: string): string => {
    setAccentColor(color)
    return accentColor
  }

  const handleFooterColor = (color: string): string => {
    setFooterColor(color)
    return footerColor
  }

  const handleHeaderLogo = (variant: string): string => {
    setHeaderLogo(variant)
    return headerLogo
  }

  return (
    <ThemeContext.Provider
      value={{
        themeDark,
        accentColor,
        footerColor,
        headerLogo,
        handleAccentColor: handleAccentColor,
        toggleDark: toggleDark,
        handleFooterColor: handleFooterColor,
        handleHeaderLogo: handleHeaderLogo,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext

export { ThemeProvider }
