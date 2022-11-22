import * as React from "react"
import Layout from "../components/layout"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { useKidsQuery } from "../queries/useKidsQuery"
import { GatsbyImage } from "gatsby-plugin-image"

const KidsPage = () => {
  const { datoCmsKidsPage, allDatoCmsKidsProject } = useKidsQuery()

  return (
    <Layout theme="white">
      <HelmetDatoCms
        title={datoCmsKidsPage.title}
        seo={datoCmsKidsPage.seoMetaTag}
      />
      <div className="container-fluid kids">
        <div className="border"></div>
        <div className="kids-intro medium-gap page-grid lg:mt-6">
          <GatsbyImage
            image={datoCmsKidsPage.titleImage.gatsbyImageData}
            alt={datoCmsKidsPage.title}
            className="col-span-8 col-start-3 md:col-span-6 md:col-start-4 medium-gap mt-10 lg:mt-14"
          />
          {datoCmsKidsPage.description && (
            <div
              className="body-sans text-block col-span-12 md:col-span-8 md:col-start-3 xl:col-span-6 xl:col-start-4"
              dangerouslySetInnerHTML={{
                __html: datoCmsKidsPage.description,
              }}
            />
          )}
        </div>
        <section aria-labelledby="Kids Projects" className="all">
          <div className="page-grid medium-gap">
            {allDatoCmsKidsProject.nodes.length > 0 &&
              allDatoCmsKidsProject.nodes.map((project, index: number) => (
                <div
                  key={index}
                  className="kids-project col-span-10 col-start-2 sm:col-span-6 sm:col-start-1 md:col-span-4 text-center medium-gap"
                >
                  <a
                    href={project.file.url}
                    className="underline"
                    download
                    target="_blank"
                  >
                    <GatsbyImage
                      image={project.image.gatsbyImageData}
                      alt={project.image.alt || project.title}
                      className="sm:w-9/12 sm:ml-auto sm:mr-auto rounded-full"
                    />
                    <h3 className="heading-3 mt-5 md:mt-6 mb-2 md:mb-3">
                      {project.title}
                    </h3>
                    <p className="body-sans underline">Download activity</p>
                  </a>
                </div>
              ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default KidsPage
