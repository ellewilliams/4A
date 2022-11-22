import * as React from "react"

export const Note = ({ block, featureColour, darkMode }) => {
  const { notes } = block
  return (
    <div className="block-grid mt-14 lg:mt-16 mb-6 lg:mb-7">
      <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-2 3xl:col-span-5 3xl:col-start-2">
        <h3
          className="heading-4 mb-4 lg:mb-6"
          style={{ color: darkMode ? "#fff" : featureColour }}
        >
          Notes
        </h3>
        <div
          className="notes list-none p-0 small-serif"
          dangerouslySetInnerHTML={{
            __html: notes,
          }}
        />
      </div>
    </div>
  )
}
