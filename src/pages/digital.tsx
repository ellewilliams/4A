import * as React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { useDigitalProjectQuery } from "../queries/useDigitalQuery"
import { GatsbyImage } from "gatsby-plugin-image"
import Tilt from "react-vanilla-tilt"

const DigitalPage = () => {
  const { datoCmsDigital, allDatoCmsDigitalProject, latestDigitalProjects } =
    useDigitalProjectQuery()
  const featureColour = datoCmsDigital.featureColour.hex

  return (
    <Layout theme="codgray" featureColor={featureColour}>
      <HelmetDatoCms
        title={datoCmsDigital.title}
        seo={datoCmsDigital.seoMetaTag}
      />
      <div className="page-top container-fluid digital">
        <h2
          className="heading-feature heading-gap"
          style={{ color: featureColour }}
        >
          {datoCmsDigital.title}
        </h2>
        {datoCmsDigital.digitalDescription && (
          <div className="digital-description page-grid text-block">
            <div
              className="body-sans medium-gap col-span-12 md:col-span-8 md:col-start-2 xl:col-span-6 xl:col-start-2 text-white"
              dangerouslySetInnerHTML={{
                __html: datoCmsDigital.digitalDescription,
              }}
            />
            <br />
          </div>
        )}
        <section aria-labelledby="Latest Digital Projects" className="latest latest-digital">
          <div className="page-grid">
            {latestDigitalProjects.nodes.length > 0 &&
              latestDigitalProjects.nodes.map((project) => (
                <Link to={`/digital/${project.slug}`} key={project.id}>
                  <div>
                    <Tilt
                      className="tilt"
                      options={{ scale: 1, max: 15, speed: 900 }}
                    >
                      <GatsbyImage
                        image={project.featureImage.gatsbyImageData}
                        alt={project.featureImage.alt || project.title}
                      />
                    </Tilt>
                    <div className="my-4 md:my-5">
                      <h3 style={{ color: featureColour }}>{project.title}</h3>
                      <h4 style={{ color: featureColour }} className="artist-name">
												{project.artist.map(({ name }, index: number) => (
													<span key={index}>{name}</span>
												))}
                      </h4>
											<p className="small-copy mt-2 md:mt-3" style={{ color: featureColour }}>
                        Published {project.publicationDate}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
        <section aria-labelledby="Digital Projects" className="all">
          <div className="page-grid small-gap">
            {allDatoCmsDigitalProject.nodes.length > 0 &&
              allDatoCmsDigitalProject.nodes.map((project) => (
                <Link
                  to={`/digital/${project.slug}`}
                  key={project.id}
                  className="col-span-6 lg:col-span-4 medium-gap"
                >
                  <div>
                    <Tilt
                      className="tilt"
                      options={{ scale: 1, max: 15, speed: 900 }}
                    >
                      <GatsbyImage
                        image={project.featureImage.gatsbyImageData}
                        alt={project.featureImage.alt || project.title}
                      />
                    </Tilt>
                    <div className="my-4 md:my-5">
                      <h3
                        className="heading-3"
                        style={{ color: featureColour }}
                      >
                        {project.title}
                      </h3>
                      <h4 className="heading-3-regular artist-name">
                        <p style={{ color: featureColour }}>
                          {project.artist.map(({ name }, index: number) => (
                            <span key={index}>{name}</span>
                          ))}
                        </p>
                      </h4>
											<p className="small-copy mt-2" style={{ color: featureColour }}>
                        Published {project.publicationDate}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
        {datoCmsDigital.credits && (
          <div className="papers-credits page-grid section-gap-padding">
            <p
              className="body-sans col-span-12 md:col-span-8 md:col-start-2 xl:col-span-6 xl:col-start-2 text-white small-gap"
              dangerouslySetInnerHTML={{
                __html: datoCmsDigital.credits,
              }}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default DigitalPage
