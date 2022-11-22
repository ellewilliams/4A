import { useEffect, useState } from "react"

enum THEME_COLORS {
  PAMPAS = "pampas",
  CODGRAY = "codgray",
}

export function useThemeColor(theme: string): { color: string } {
  const [color, setColor] = useState(theme)

  useEffect(() => {
    switch (theme) {
      case THEME_COLORS.PAMPAS:
        return setColor("#F4F4EE")
      case THEME_COLORS.CODGRAY:
        return setColor("#151515")
    }
  }, [color, theme])

  return { color }
}
