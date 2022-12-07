import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)

export const Events = ({ events, heading }) => (
  <div className="events col-span-12 page-grid section-gap container-fluid">
    <h3 className="col-span-12 heading-3 text-silver-chalice mb-6 md:mb-8">
      {heading}
    </h3>
    {events.nodes.map((event) => {
      const endDate = new Date(event.endDate)
			var now = dayjs()
			var today = now.format("YYYY-MM-DD")
      if (endDate >= new Date(today)) {
        return (
          <div
            key={event.id}
            className="event col-span-12 sm:col-span-6 lg:col-span-4 medium-gap"
          >
            <Link to={`/events/${event.slug}`}>
              <GatsbyImage
                image={event.featureImageVideo.gatsbyImageData}
                alt={event.featureImageVideo.alt || event.title}
              />
              <h3 className="heading-3-regular text-torch-red my-4 md:my-5">
                {event.title}
              </h3>
              <div className="details">
                <p className="body-sans">
                  <b>{event.eventType?.eventType}</b>
                </p>
                {event.eventDates.length &&
                  event.eventDates.map(({ eventDateTime }, index: number) => (
                    <p key={index} className="body-sans">
                      {dayjs(eventDateTime).format("dddd, D MMMM YYYY, h:mma")}
                    </p>
                  ))}
                {event.locations.map(({ location }, index: number) => (
                  <p key={index} className="body-sans">
                    {location.title}
                  </p>
                ))}
              </div>
            </Link>
          </div>
        )
      }
    })}
    <div className="col-span-12 page-grid section-gap see-all-events">
      <div className="col-span-10 col-start-3 md:col-span-3 md:col-start-9">
        <Link
          to="/whats-on#events"
          className="heading-4 underline text-torch-red"
          aria-label="See all Events"
        >
          See all events
        </Link>
      </div>
    </div>
  </div>
)
