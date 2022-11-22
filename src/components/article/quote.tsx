import * as React from "react"

export const Quote = ({ block, featureColour, darkMode }) => (
  <div className="block-grid">
    <div className="col-span-12 md:col-span-10 md:col-start-3 lg:col-span-6 lg:col-start-3 3xl:col-span-5 3xl:col-start-3">
      <blockquote
        className="antialiased font-display text-2.5xl lg:text-3xl xl:text-4xl whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: block.quote }}
        style={{ color: darkMode ? "#fff" : featureColour }}
      />
    </div>
  </div>
)
