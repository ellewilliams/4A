import React, { useState, useRef, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"
import dayjs from "dayjs"

import {
  defaultFilterValue,
  filterItemByLocation,
  filterItemByYear,
  getUniqueYearList,
  getUniqueLocationNameList,
  useFilters,
  loadMoreVisibility,
  handleLoadMore,
} from '../helpers/filtering.js';
import FilterArrow from '../images/filter-arrow.inline.svg';


export const EventsArchive = () => {
	const data = useStaticQuery(graphql`
	query EventsArchiveQuery {
		allDatoCmsEvent(
			filter: { 
			meta: { isValid: { eq: true }, status: { ne: "draft" } }}
			sort: { fields: eventDates___eventDateTime, order: DESC }
		) {
			nodes {
				eventDates {
					eventDateTime
					id
				}
				id
				endDate
				slug
				eventStatus
				eventType {
					eventType
				}
				locations {
					id
					location {
						title
					}
				}
				featureImageVideo {
					alt
					gatsbyImageData
					video {
						streamingUrl
					}
				}
				title
				model {
					name
				}
			}
		}
	}
`);

  const items  = data.allDatoCmsEvent.nodes;
  const increment = 12;
  const years = getUniqueYearList(items);
  const yearRef = useRef(null);
  const galleries = getUniqueLocationNameList(items);
  const galleryRef = useRef(null);

  const [activeItems, setActiveItems] = useState(items);
  const [visibleLimit, setVisibleLimit] = useState(increment);

  const [filters, setFilters] = useState({ gallery: defaultFilterValue, year: defaultFilterValue });

  const handleFilterItems = (exhibitions) => {
    const filteredExhibitions = exhibitions
      .filter((exhibition) => filterItemByLocation(filters.gallery, exhibition))
      .filter((exhibition) => filterItemByYear(filters.year, exhibition));
    setVisibleLimit(increment);
    setActiveItems(filteredExhibitions);
  };

  const handleFilters = () => {
    setFilters({
      year: yearRef.current.value || defaultFilterValue,
      gallery: galleryRef.current.value || defaultFilterValue,
    });
  };

  useFilters(filters, handleFilterItems, items);

  useEffect(() => {
    handleFilters();
  }, []);

  return (
    <>
      {items.length > 0 && (
				<section aria-label="Past Events" className="page-grid section-gap">
					<h3 className="heading-3 col-span-12 md:col-span-6 xl:col-span-4 text-silver-chalice mb-6 md:mb-8">
						Events
					</h3>
					<div className="col-span-12 md:col-span-6 xl:col-span-8 text-silver-chalice mb-12 md:mb-16 body-sans lg:flex place-content-end">
						{years.length > 0 && (
							<div>
								<label
									className="filter flex md:ml-8"
									htmlFor="past-year-filter"
								>
									<span className="filter-text inline-block">
										Year:
									</span>
									<div className="custom-filter-select inline-block">
										<span className="font-medium">{filters.year}</span>
										<select
											ref={yearRef}
											name="year"
											id="past-year-filter"
											onChange={() => { handleFilters(); }}
										>
											<option value={defaultFilterValue}>{defaultFilterValue}</option>
											{years.map((yearValue) => (
												<option key={yearValue} value={yearValue}>{yearValue}</option>
											))}
										</select>
										<FilterArrow />
									</div>
								</label>
							</div>
						)}
						{galleries.length > 0 && (
							<div>
								<label
									className="filter flex md:ml-8"
									htmlFor="past-gallery-filter"
								>
									<div className="filter-text inline-block">
										Location:
									</div>
									<div className="custom-filter-select inline-block">
										<span className="filter-selected font-medium">{filters.gallery}</span>
										<select
											ref={galleryRef}
											id="past-gallery-filter"
											onChange={() => { handleFilters(); }}
										>
											<option value={defaultFilterValue}>{defaultFilterValue}</option>
											{galleries.map((val) => (
												<option key={val} value={val}>{val}</option>
											))}
										</select>
										<FilterArrow />
									</div>
								</label>
							</div>
						)}
					</div>
          <div className="col-span-12 page-grid">
            {activeItems.map((item, i) => {
								const {
									id,
									slug,
									title,
									eventDates,
									eventType,
									formattedTitle,
									locations,
									featureImageVideo,
								} = item
								const endDate = new Date(item.endDate)
							var now = dayjs()
							var today = now.format("YYYY-MM-DD")
							if (endDate < new Date(today))
								return (
									<div
									className="event col-span-6 lg:col-span-4 mb-12 md:mb-16"
									key={id}
									style={{ display: `${loadMoreVisibility(i, visibleLimit)}` }}
								>
									<Link to={`/events/${slug}`}>
										<GatsbyImage
											image={featureImageVideo.gatsbyImageData}
											alt={featureImageVideo.alt || formattedTitle || ""}
										/>
										<h3 className="heading-3-2col-regular text-torch-red my-4 md:my-5">
											{title}
										</h3>
										<div className="details">
											<p className="body-sans">
												<b>{eventType?.eventType}</b>
											</p>
											{eventDates.length &&
												eventDates.map(({ eventDateTime }) => (
													<p className="body-sans">
														{dayjs(eventDateTime).format(
															"dddd, D MMMM YYYY, h:mma"
														)}
													</p>
												))}
											{locations.map(({ location }) => (
												<p key={location.title} className="body-sans">
													{location.title}
												</p>
											))}
										</div>
									</Link>
								</div>
            )})}
          </div>
          <div className="page-grid col-span-12">
            <div className="md:pt-4 mb-16 md:mb-0 col-span-10 col-start-2 md:col-start-3 md:col-span-4">
              {activeItems.length > visibleLimit && <button onClick={() => { handleLoadMore(setVisibleLimit, visibleLimit, increment); }} type="button" aria-label="Load more events" className="heading-4 underline text-torch-red">Load more events</button>}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
