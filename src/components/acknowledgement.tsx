import React, { useState, useEffect } from "react"

interface AcknowledgementProps {
  text: string
}

export const Acknowledgement = (props: AcknowledgementProps) => {
  const { text } = props
  const [showAcknowledgement, setShowAcknowledgement] = useState<boolean>(true)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowAcknowledgement(false)
    }, 5000)

    return () => clearTimeout(timerId)
  }, [])

  if (text) {
    return (
      <div
        className={`aoc-short fixed bottom-0 w-full bg-torch-red text-white p-3 pb-4 text-center ${
          showAcknowledgement ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      >
        <p
          className="font-sans text-sm-tight antialiased lg:text-md xl:text-xlsans text-block"
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      </div>
    )
  }

  return null
}
