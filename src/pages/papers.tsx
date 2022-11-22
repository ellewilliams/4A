import * as React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { usePaperQuery } from "../queries/usePaperQuery"

const PapersPage = () => {
  const { allDatoCmsPaper, datoCmsPapersPage } = usePaperQuery()
  const { featureColour } = datoCmsPapersPage

  return (
    <Layout theme="pampas" featureColor={featureColour.hex}>
      <HelmetDatoCms title="Papers" />
      <div className="container-fluid papers page-top">
        <h2
          className="heading-feature heading-gap"
          style={{
            color: featureColour.hex,
          }}
        >
          4A Papers
        </h2>
        {datoCmsPapersPage.papersDescription && (
          <div className="papers-description page-grid">
            <div
              className="text-block body-sans medium-gap col-span-12 md:col-span-8 md:col-start-2 xl:col-span-6 xl:col-start-2"
              dangerouslySetInnerHTML={{
                __html: datoCmsPapersPage.papersDescription,
              }}
            />
            <br />
          </div>
        )}
        <div className="page-grid section-gap-padding">
          {allDatoCmsPaper.nodes.map((paper: any) => {
            const { id, featureImage, title, featureColour, summary, slug } =
              paper
            return (
              <div
                key={id}
                className="issue col-span-12 md:col-span-6 medium-gap"
              >
                <Link to={`/papers/${slug}`}>
                  <div className="relative paper-image-wrapper">
                    <div
                      className="colour-overlay mix-blend-color h-full w-full absolute z-10"
                      style={{
                        backgroundColor: featureColour.hex,
                      }}
                    />
                    <img
                      src={featureImage.url}
                      alt={featureImage.alt}
                      style={{ backgroundColor: featureColour.hex }}
                      className="absolute h-full w-full left-0 object-cover"
                    />
                  </div>
                  <h3
                    className="heading-2-regular my-5 md:my-6"
                    style={{ color: featureColour.hex }}
                  >
                    {`${title}`}
                  </h3>
                  <p className="body-sans">{summary}</p>
                </Link>
              </div>
            )
          })}
        </div>
        {datoCmsPapersPage.credits && (
          <div className="papers-credits page-grid section-gap-padding">
            <div
              className="body-sans col-span-12 md:col-span-8 md:col-start-2 xl:col-span-6 xl:col-start-2 small-gap"
              dangerouslySetInnerHTML={{
                __html: datoCmsPapersPage.credits,
              }}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default PapersPage
