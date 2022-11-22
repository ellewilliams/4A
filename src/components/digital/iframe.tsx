import React, { useState } from "react"

export const Iframe = ({ block, featureColour, title }) => {
  const [showIframe, setShowIframe] = useState<boolean>(false)

  return (
    <div key={block.id} className="text-block page-grid block">
      <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-3 3xl:col-span-6 3xl:col-start-4">
        <button
          className="heading-4 underline"
          dangerouslySetInnerHTML={{ __html: block.linkText }}
          style={{ color: featureColour }}
          onClick={() => setShowIframe(true)}
        />
      </div>
      {showIframe && (
        <div className="popup fixed z-50 bg-black w-full h-full left-0 right-0 p-5 pt-14 md:p-14 top-0">
          <button
            className="close-menu cursor-pointer fixed top-5 right-5 z-50"
            onClick={() => setShowIframe(false)}
          >
            <p className="visually-hidden">Close</p>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.746094 1L18.7461 19" stroke="white" strokeWidth="2" />
              <path d="M18.7461 1L0.746095 19" stroke="white" strokeWidth="2" />
            </svg>
          </button>
          <iframe
            width="100%"
            height="100%"
            src={block.hyperlink}
            title={title}
          ></iframe>
        </div>
      )}
    </div>
  )
}
