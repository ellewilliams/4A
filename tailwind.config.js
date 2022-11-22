module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Sohne"],
      serif: ["Tiempos"],
      display: ["Fabrik"],
    },
    fontSize: {
      xs: [
        ".75rem",
        {
          lineHeight: "130%",
        },
      ],
      "xs-tight": [
        ".75rem",
        {
          lineHeight: "120%",
        },
      ],
      sm: [
        ".875rem",
        {
          lineHeight: "135%",
        },
      ],
      "sm-tight": [
        ".875rem",
        {
          lineHeight: "120%",
        },
      ],
      md: [
        "1rem",
        {
          lineHeight: "125%",
        },
      ],
      base: [
        "1.03rem",
        {
          lineHeight: "140%",
        },
      ],
      basesans: [
        "1.1rem",
        {
          lineHeight: "130%",
        },
      ],
      lg: [
        "1.2rem",
        {
          lineHeight: "140%",
          letterSpacing: "-0.01em",
        },
      ],
      lgsans: [
        "1.28rem",
        {
          lineHeight: "130%",
          letterSpacing: "-0.01em",
        },
      ],
      xl: [
        "1.3rem",
        {
          lineHeight: "140%",
          letterSpacing: "-0.01em",
        },
      ],
      xlsans: [
        "1.4rem",
        {
          lineHeight: "130%",
          letterSpacing: "-0.01em",
        },
      ],
      "xl-tight": [
        "1.4rem",
        {
          lineHeight: "120%",
          letterSpacing: "-0.01em",
        },
      ],
      "2xl": [
        "1.5rem",
        {
          lineHeight: "115%",
        },
      ],
      "2.5xl": [
        "1.625rem",
        {
          lineHeight: "115%",
          letterSpacing: "-0.01em",
        },
      ],
      "3xl": [
        "1.875rem",
        {
          lineHeight: "110%",
          letterSpacing: "-0.01em",
        },
      ],
      "4xl": [
        "2.2rem",
        {
          lineHeight: "110%",
          letterSpacing: "-0.02em",
        },
      ],
      "4.5xl": [
        "2.625rem",
        {
          lineHeight: "110%",
          letterSpacing: "-0.02em",
        },
      ],
      "5xl": [
        "3rem",
        {
          lineHeight: "105%",
          letterSpacing: "-0.02em",
        },
      ],
      "5.5xl": [
        "3.5rem",
        {
          lineHeight: "105%",
          letterSpacing: "-0.02em",
        },
      ],
      "6xl": [
        "4.35rem",
        {
          lineHeight: "105%",
          letterSpacing: "-0.02em",
        },
      ],
      "6.5xl": [
        "4.7rem",
        {
          lineHeight: "105%",
          letterSpacing: "-0.02em",
        },
      ],
      "7xl": [
        "5rem",
        {
          lineHeight: "105%",
          letterSpacing: "-0.03em",
        },
      ],
      "8xl": [
        "6rem",
        {
          lineHeight: "100%",
          letterSpacing: "-0.03em",
        },
      ],
      "9xl": [
        "7.5rem",
        {
          lineHeight: "100%",
          letterSpacing: "-0.03em",
        },
      ],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1800px",
    },
    extend: {
      colors: {
        "torch-red": "#FF8039",
        "silver-chalice": "#959494",
        "mountain-meadow": "#17a45e",
        "light-grey": "#ebebeb",
        "dark-grey": "#1c1c1c",
        "donate-options": "#202020",
        "transparent-grey": "rgba(155,155,155,0.1)",
      },
      spacing: {
        2.5: "0.625rem",
      },
      maxHeight: {
        maxHeightSlider: "32.938rem",
      },
    },
    container: {
      center: true,
    },
    borderWidth: {
      3: "3px",
      2: "2px",
      1: "1px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
