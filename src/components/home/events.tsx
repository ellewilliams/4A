import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)

export const Events = ({ featuredEvents, events, heading }: {
  featuredEvents: any;
  events: any;
  heading: any;
}) => ( 
  <div className="events col-span-12 page-grid section-gap container-fluid">
    <h3 className="col-span-12 heading-3 text-silver-chalice mb-6 md:mb-8">
      {heading}
    </h3>
		
    {featuredEvents ? (
		<>
			{featuredEvents.map((featuredEvent) => (
				<div
				key={featuredEvent.id}
				className="event col-span-12 sm:col-span-6 lg:col-span-4 medium-gap"
			>
				<Link to={`/events/${featuredEvent.slug}`}>
					<GatsbyImage
						image={featuredEvent.featureImageVideo.gatsbyImageData}
						alt={featuredEvent.featureImageVideo.alt || featuredEvent.title}
					/>
					<h3 className="heading-3-regular text-torch-red my-4 md:my-5">
						{featuredEvent.title}
					</h3>
					<div className="details">
						<p className="body-sans">
							<b>{featuredEvent.eventType?.eventType}</b>
						</p>
						{featuredEvent.dateTextOverride ? (
							<p className="body-sans">
								{featuredEvent.dateTextOverride}
							</p>
						) : featuredEvent.eventDates.length ? (
							featuredEvent.eventDates.map(({ eventDateTime }, index) => (
								<p key={index} className="body-sans">
									{dayjs(eventDateTime).format("dddd, D MMMM YYYY, h:mma")}
								</p>
							))
						) : null}
						{featuredEvent.locations.map(({ location }, index) => (
							<p key={index} className="body-sans">
								{location.title}
							</p>
						))}
					</div>
				</Link>
			</div>
			))}
		</>
	) : (
		events.nodes.map((event) => {
			const endDate = new Date(event.endDate);
			var now = dayjs();
			var today = now.format("YYYY-MM-DD");
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
								{event.dateTextOverride ? (
									<p className="body-sans">
										{event.dateTextOverride}
									</p>
								) : event.eventDates.length ? (
									event.eventDates.map(({ eventDateTime }, index) => (
										<p key={index} className="body-sans">
											{dayjs(eventDateTime).format("dddd, D MMMM YYYY, h:mma")}
										</p>
									))
								) : null}
								{event.locations.map(({ location }, index) => (
									<p key={index} className="body-sans">
										{location.title}
									</p>
								))}
							</div>
						</Link>
					</div>
				);
			} else {
				return null; 
			}
		})
	)}

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
