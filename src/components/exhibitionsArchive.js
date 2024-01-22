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


export const ExhibitionsArchive = () => {
	const data = useStaticQuery(graphql`
	query ExhibitionsArchiveQuery {
		allDatoCmsExhibition(
			filter: {  
			meta: { isValid: { eq: true }, status: { ne: "draft" } }}
			sort: { fields: startDate, order: DESC }
		) {
			nodes {
				id
				slug
				exhibitionStatus
				startDate
				endDate
				dateTextOverride
				featureImageVideo {
					alt
					gatsbyImageData(placeholder: NONE)
					video {
						streamingUrl
					}
				}
				formattedTitle
				locations {
					id
					location {
						title
					}
				}
				model {
					name
				}
			}
		}
	}
`);

  const items  = data.allDatoCmsExhibition.nodes;
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
				<section aria-label="Past Exhibitions" className="page-grid section-gap">
					<h3 className="heading-3 col-span-12 md:col-span-6 xl:col-span-4 text-silver-chalice mb-6 md:mb-8">
						Exhibitions
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
									startDate,
									formattedTitle,
									locations,
									featureImageVideo,
									dateTextOverride,
								} = item
								const endDate = new Date(item.endDate)
              if (endDate < new Date(Date.now()))
								return (
              <div
							className="exhibition col-span-6 lg:col-span-4 mb-12 md:mb-16"
							key={id} 
							style={{ display: `${loadMoreVisibility(i, visibleLimit)}` }}
						>
							<Link to={`/exhibitions/${slug}`}>
								<GatsbyImage
									image={featureImageVideo.gatsbyImageData}
									alt={featureImageVideo.alt || formattedTitle || ""}
								/>
								<h3
									className="heading-3-2col-regular text-torch-red my-4 md:my-5"
									dangerouslySetInnerHTML={{ __html: formattedTitle }}
								/>
								<div className="details">
									<p className="body-sans">
										{dateTextOverride ? (
											<>{dateTextOverride}</>
										) : (
											<>
												{dayjs(startDate).format("D MMMM")} – {dayjs(endDate).format("D MMMM YYYY")}
											</>
										)}
									</p>
									{locations[0] && (
										<p key={item.locations[0].location.title} className="body-sans">
											{item.locations[0].location.title}
										</p>
									)}
								</div>
							</Link>
						</div>
            )})}
          </div>
          <div className="page-grid col-span-12">
            <div className="md:pt-4 mb-16 md:mb-0 col-span-10 col-start-2 md:col-span-4 md:col-start-3">
              {activeItems.length > visibleLimit && <button onClick={() => { handleLoadMore(setVisibleLimit, visibleLimit, increment); }} type="button" aria-label="Load more exhibitions" className="heading-4 underline text-torch-red">Load more exhibitions</button>}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
