import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import FormArrow from "../images/form-arrow.inline.svg"

export const MailchimpInput = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()

    addToMailchimp(email)
      .then((data: any) => {
        setMessage(data.msg)
      })
      .catch((error) => {
				console.error(error);
				setMessage("Something has gone wrong, please try again");
			});
  }

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value)
  }

  return (
    <form
			className="mb-10"
      onSubmit={(e) => {
        handleSubmit(e)
      }}
    >
      <div className="flex mb-2">
        <input
          className="mr-3 flex-grow h-10 pl-3 pr-3 border-gray-300 border-2 text-sm bg-transparent antialiased"
          style={{ border: "2px solid #C6C6C6" }}
          placeholder="Email address"
          name="email"
          type="email"
          aria-label="email"
          onChange={(e) => {
            handleEmailChange(e)
          }}
        />
        <button
          type="submit"
          name="subscribe"
          aria-label="Subscribe"
          id="mc-embedded-subscribe"
        >
          <FormArrow />
        </button>
      </div>
      <div
        className="errors"
        dangerouslySetInnerHTML={{
          __html: message,
        }}
      />
    </form>
  )
}
