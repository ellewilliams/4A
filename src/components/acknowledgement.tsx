import React, { useState, useEffect } from "react"
import DownArrow from '../images/downarrow.svg';

interface AcknowledgementProps {
  text: string
}

export const Acknowledgement = (props: AcknowledgementProps) => {
  const { text } = props
  const [showAcknowledgement, setShowAcknowledgement] = useState<boolean>(false)

  useEffect(() => {
    const hasBeenShownToday = sessionStorage.getItem("acknowledgementShown") === "true";
    
    if (!hasBeenShownToday) {
      setShowAcknowledgement(true);
    } else {
      const timerId = setTimeout(() => {
        setShowAcknowledgement(false);
        sessionStorage.setItem("acknowledgementShown", "true");
      }, 5000);

      return () => clearTimeout(timerId);
    }
  }, [])

	const handleAcknowledgementClick = () => {
    setShowAcknowledgement(false);
  };

  if (text) {
    return (
      <div
        className={`aoc-short z-50 fixed bottom-0 w-full h-full bg-black text-white p-3 pb-4 text-center page-grid ${
          showAcknowledgement ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
				onClick={handleAcknowledgementClick} 
      >
				<div className="px-5 absolute top-1/2 transform -translate-y-1/2 text-center col-span-12 md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-3 3xl:col-span-6 3xl:col-start-4">
        <p
          className="body-sans-large antialiased text-block"
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
				 <img className="mx-auto left-0 right-0 mt-7 md:mt-10 lg:mt-12 xl:mt-16" src={DownArrow} alt="Down Arrow" />
				 </div>
      </div>
    )
  }

  return null
}
