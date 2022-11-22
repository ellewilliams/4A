import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import ReactPlayer from "react-player"
import { Link } from "gatsby"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { useTalksQuery } from "../queries/useTalksQuery"
import { GatsbyImage } from "gatsby-plugin-image"

const TalksPage = () => {
  const { datoCmsTalksPage, allDatoCmsTalk } = useTalksQuery()

	const allTalks = allDatoCmsTalk.nodes
  const [list, setList] = useState([...allTalks.slice(0, 10)])
  const [loadMore, setLoadMore] = useState(false)
  const [hasMore, setHasMore] = useState(allTalks.length > 10)

	const handleLoadMore = () => {
    setLoadMore(true)
  }

  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allTalks.length
      const nextResults = isMore
        ? allTalks.slice(currentLength, currentLength + 10)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore])

  useEffect(() => {
    const isMore = list.length < allTalks.length
    setHasMore(isMore)
  }, [list])

  return (
    <Layout theme="white">
      <HelmetDatoCms title="Talks" seo={datoCmsTalksPage.seoMetaTag} />
      <div className="talks-page">
        <div className="heading-image-wrapper mb-12 md:mb-16 lg:mb-20">
          <div className="image-overlay"></div>
          <div className="container-fluid">
            <h2 className="heading-feature">{datoCmsTalksPage.title}</h2>
          </div>
          <GatsbyImage
            image={datoCmsTalksPage.headerImage.gatsbyImageData}
            alt={
              datoCmsTalksPage.headerImage.alt || datoCmsTalksPage.title || ""
            }
          />
        </div>
        <div className="container-fluid page-grid">
          <section
            aria-label="Description"
            className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-2 xl:col-span-6 xl:col-start-2 medium-gap"
          >
            {datoCmsTalksPage.description && (
              <div
                className="body-sans text-block"
                dangerouslySetInnerHTML={{
                  __html: datoCmsTalksPage.description,
                }}
              />
            )}
          </section>
          <section
            aria-label="Talks"
            className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2 xl:col-span-7 xl:col-start-2"
          >
            {list.length > 0 &&
              list.map((talk: any, index: number) => (
                <div key={index} className="talk medium-gap">
                  {talk.title && (
                    <h3
                      className="my-5 md:my-6 heading-3-regular text-torch-red"
                      dangerouslySetInnerHTML={{
                        __html: talk.title,
                      }}
                    />
                  )}
                  {talk.description && (
                    <div
                      className="body-sans text-block"
                      dangerouslySetInnerHTML={{
                        __html: talk.description,
                      }}
                    />
                  )}
                  {talk.audioPlayerEmbed && (
                    <div
                      className="player-embed mt-5 md:mt-7"
                      dangerouslySetInnerHTML={{
                        __html: talk.audioPlayerEmbed,
                      }}
                    />
                  )}
                  {talk.externalVideo && (
                    <div className="player-wrapper mt-5 md:mt-7">
                      <ReactPlayer
                        url={talk.externalVideo.url}
                        width="100%"
                        height="100%"
                        className={"player"}
                        muted={false}
                        loop={false}
                        playing={false}
                      />
                    </div>
                  )}
                  <p className="small-sans text-block text-silver-chalice mt-5 md:mt-6">
                    Recorded {talk.talkDate}
                  </p>
                  <div className="buttons mt-5 md:mt-7 medium-gap">
                    {talk.transcript && (
                      <div className="button body-sans inline-block bg-light-grey hover:bg-torch-red hover:text-white transition-all duration-300 align-middle px-4 py-1.5 mr-4">
                        <a href={talk.transcript.url} target="_blank" download>
                          Download transcript&nbsp;
                          <svg
                            width="17"
                            height="14"
                            viewBox="0 0 17 14"
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-block"
                          >
                            <g clipPath="url(#clip0_108:1094)">
                              <path d="M8.49989 14.3099C15.1388 14.3099 20.5208 13.8355 20.5208 13.2502C20.5208 12.6649 15.1388 12.1904 8.49989 12.1904C1.86094 12.1904 -3.521 12.6649 -3.521 13.2502C-3.521 13.8355 1.86094 14.3099 8.49989 14.3099Z" />
                              <path d="M7.70514 0H9.2918V7.78244L9.36207 7.81616L12.5316 4.68715L13.5985 5.79486L8.47882 10.8725L3.37354 5.82184L4.50083 4.69764L7.70438 7.82815L7.70514 0Z" />
                            </g>
                          </svg>
                        </a>
                      </div>
                    )}
                    {talk.associatedEvent && (
                      <div className="button body-sans inline-block bg-light-grey hover:bg-torch-red hover:text-white transition-all duration-300 align-middle px-4 py-1.5">
                        <Link
                          to={`../events/${talk.associatedEvent.slug}`}
                          target="_blank"
                          download
                        >
                          Go to event page
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
							<div className="page-grid">
								{hasMore ? (
									<div className="md:pt-4 mb-16 md:mb-0 col-span-10 col-start-2 md:col-span-4 md:col-start-3">
										<button
											onClick={handleLoadMore}
											type="button"
											aria-label="Load more"
											className="heading-4 underline text-torch-red"
										>
											Load more talks
										</button>
									</div>
								) : (
									<div />
								)}
							</div>
          </section>
          {datoCmsTalksPage.headerImage.title && (
            <div className="page-grid col-span-12">
              <p className="small-sans section-gap col-span-12 sm:col-span-6 sm:col-start-7 lg:col-span-3 lg:col-start-9 text-silver-chalice">
                Top image: {datoCmsTalksPage.headerImage.title}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default TalksPage
