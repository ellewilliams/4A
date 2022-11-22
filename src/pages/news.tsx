import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { useNewsQuery } from "../queries/useNewsQuery"
import { GatsbyImage } from "gatsby-plugin-image"

const NewsPage = () => {
  const { datoCmsNews, allDatoCmsNewsPost, allDatoCmsMediaPost } = useNewsQuery()
  const { title, titleMedia, description, descriptionMedia } = datoCmsNews
  const news = allDatoCmsNewsPost.nodes
  const media = allDatoCmsMediaPost.nodes

	/*News*/

  const [list, setList] = useState([...news.slice(0, 6)])
  const [loadMore, setLoadMore] = useState(false)
  const [hasMore, setHasMore] = useState(news.length > 6)

	const handleLoadMore = () => {
    setLoadMore(true)
  }

  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < news.length
      const nextResults = isMore
        ? news.slice(currentLength, currentLength + 6)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore])

  useEffect(() => {
    const isMore = list.length < news.length
    setHasMore(isMore)
  }, [list])

	/*Media*/

	const [list2, setList2] = useState([...media.slice(0, 6)])
  const [loadMore2, setLoadMore2] = useState(false)
  const [hasMore2, setHasMore2] = useState(media.length > 6)

	const handleLoadMore2 = () => {
    setLoadMore2(true)
  }

	useEffect(() => {
    if (loadMore2 && hasMore2) {
      const currentLength2 = list2.length
      const isMore2 = currentLength2 < media.length
      const nextResults = isMore2
        ? media.slice(currentLength2, currentLength2 + 6)
        : []
      setList2([...list2, ...nextResults])
      setLoadMore2(false)
    }
  }, [loadMore2, 2])

  useEffect(() => {
    const isMore2 = list2.length < media.length
    setHasMore2(isMore2)
  }, [list2])

  return (
    <Layout theme="white">
      <HelmetDatoCms title="News" />
      <div className="container-fluid news page-top page-gap">
        <section aria-labelledby="News" className="page-grid section-gap">
          <h2 className="heading-1 col-span-12 text-torch-red heading-gap">
            {title}
          </h2>
          {description && (
            <div
              className="heading-3-regular text-block col-span-12 md:col-span-8 medium-gap"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          )}
          {list.map(({ title, image, link, datePosted }, index: number) => (
            <div
              key={index}
              className="news-item col-span-12 small-gap page-grid"
            >
              <a
                href={link}
                aria-label="Navigate to News"
                target="_blank"
                className="col-span-4 md:col-span-3 md:col-start-2 lg:col-span-2 lg:col-start-2 mb-4"
              >
                <GatsbyImage
                  image={image.gatsbyImageData}
                  alt={image.alt || title}
                />
              </a>
              <div className="text-wrapper col-span-12 md:col-span-5 lg:col-span-7 lg:col-start-4">
                <h3 className="heading-4 text-black mb-3 md:mb-4">
                  <a
                    href={link}
                    aria-label="Navigate to News"
                    target="_blank"
                    className="inline"
                  >
                    {title}
                  </a>
                </h3>
                <p className="small-sans text-silver-chalice mb-3">
                  <a
                    href={link}
                    aria-label="Navigate to News"
                    target="_blank"
                    className="inline"
                  >
                    Posted {datePosted}
                  </a>
                </p>
                <p className="body-sans underline mb-4">
                  <a
                    href={link}
                    aria-label="Navigate to News"
                    target="_blank"
                    className="inline"
                  >
                    Read more
                  </a>
                </p>
              </div>
            </div>
          ))}
					<div className="page-grid col-span-12">
						{hasMore ? (
							<div className="md:pt-8 mb-8 md:mb-0 col-span-10 col-start-2 md:col-span-4 md:col-start-3">
								<button
									onClick={handleLoadMore}
									type="button"
									aria-label="Load more news"
									className="heading-4 underline text-torch-red"
								>
									Load more news
								</button>
							</div>
						) : (
							<div />
						)}
					</div>
        </section>
        <section aria-labelledby="Media" className="page-grid">
          <h2 className="heading-1 col-span-12 text-torch-red heading-gap">
            {titleMedia}
          </h2>
          {allDatoCmsMediaPost && (
            <div
              className="heading-3-regular text-block col-span-12 md:col-span-8 medium-gap"
              dangerouslySetInnerHTML={{
                __html: descriptionMedia,
              }}
            />
          )}
          {list2.map(({ title, image, link, datePosted }, index: number) => (
            <div
              key={index}
              className="news-item col-span-12 small-gap page-grid"
            >
              <a
                href={link}
                aria-label="Navigate to News"
                target="_blank"
                className="col-span-4 md:col-span-3 md:col-start-2 lg:col-span-2 lg:col-start-2 mb-4"
              >
                <GatsbyImage
                  image={image.gatsbyImageData}
                  alt={image.alt || title}
                />
              </a>
              <div className="text-wrapper col-span-12 md:col-span-5 lg:col-span-7 lg:col-start-4">
                <h3 className="heading-4 text-black mb-3 md:mb-4">
                  <a
                    href={link}
                    aria-label="Navigate to News"
                    target="_blank"
                    className="inline"
                  >
                    {title}
                  </a>
                </h3>
                <p className="small-sans text-silver-chalice mb-3">
                  <a
                    href={link}
                    aria-label="Navigate to News"
                    target="_blank"
                    className="inline"
                  >
                    Posted {datePosted}
                  </a>
                </p>
                <p className="body-sans underline mb-4">
                  <a
                    href={link}
                    aria-label="Navigate to News"
                    target="_blank"
                    className="inline"
                  >
                    Read more
                  </a>
                </p>
              </div>
            </div>
          ))}
					<div className="page-grid col-span-12">
						{hasMore2 ? (
							<div className="md:pt-8 mb-8 md:mb-0 col-span-10 col-start-2 md:col-span-4 md:col-start-3">
								<button
									onClick={handleLoadMore2}
									type="button"
									aria-label="Load more media"
									className="heading-4 underline text-torch-red"
								>
									Load more media
								</button>
							</div>
						) : (
							<div />
						)}
					</div>
        </section>
      </div>
    </Layout>
  )
}

export default NewsPage
