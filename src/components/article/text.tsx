import * as React from "react"

function renderText(text: string) {
  return (
    <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-2 3xl:col-span-5 3xl:col-start-2">
      <div className="body-serif" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  )
}

export const Text = ({ block, safePassage }) => {
  if (safePassage) {
    return (
      <div key={0} className="z-10 relative text-block block-grid">
        {renderText(block.text)}
      </div>
    )
  }

  return (
    <div key={1} className="text-block block-grid">
      {renderText(block.text)}
    </div>
  )
}
