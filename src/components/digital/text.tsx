import * as React from "react"

export const Text = ({ block }) => {
  return (
    <div key={1} className="text-block page-grid block">
      <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-3 3xl:col-span-6 3xl:col-start-4">
        <div
          className="body-sans"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      </div>
    </div>
  )
}
