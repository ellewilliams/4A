import * as React from "react"
import Layout from "../components/layout"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { usePeopleQuery } from "../queries/usePeopleQuery"
import { GatsbyImage } from "gatsby-plugin-image"
import { Audio } from "../components/audio"

const PeoplePage = () => {
  const { datoCmsPeoplePage } = usePeopleQuery()
  const { title, staff, board, alumni } = datoCmsPeoplePage

  return (
    <Layout theme="white">
      <HelmetDatoCms title="People" />
      <div className="container-fluid people page-top">
        <section aria-labelledby="People" className="page-grid section-gap">
          <h2 className="heading-1 col-span-12 text-torch-red heading-gap">
            {title}
          </h2>
          <div className="col-span-12 page-grid mb-5 md:mb-8 lg:mb-10">
            <div className="md:col-span-3 md:col-start-9">
              <div className="heading-3 text-silver-chalice">Staff</div>
            </div>
          </div>
          {staff.map(
            (
              { name, peoplePosition, bio, image, pronounciation, pronouns },
              index: number
            ) => (
              <div
                key={index}
                className="person col-span-12 medium-gap page-grid"
              >
                <GatsbyImage
                  image={image.gatsbyImageData}
                  alt={image.alt || name}
                  className="col-span-8 md:order-2 md:col-span-4 md:col-start-9"
                />
                <div className="text-wrapper col-span-12 md:order-1 md:col-span-8 lg:col-span-7">
                  <h3 className="my-5 md:mb-6 md:mt-0">
                    <span className="heading-3 text-torch-red">{name}</span>
                    <br />
                    <span className="heading-3-regular">{peoplePosition}</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 mb-5 md:mb-6">
                    {pronouns && (
                      <p className="body-sans text-silver-chalice col-span-1">
                        {pronouns}
                      </p>
                    )}
                    {pronounciation && (
                      <div className="audio-wrapper flex col-span-1">
                        <Audio src={pronounciation.url} />
                        <span className="body-sans text-silver-chalice ml-4">
                          Pronunciation
                        </span>
                      </div>
                    )}
                  </div>
                  <div
                    className="body-sans text-block"
                    dangerouslySetInnerHTML={{
                      __html: bio,
                    }}
                  />
                </div>
              </div>
            )
          )}
        </section>
        <section aria-labelledby="Board" className="page-grid medium-gap">
          <div className="col-span-12 page-grid mb-3 md:mb-8 lg:mb-10">
            <div className="md:col-span-3 md:col-start-9">
              <div className="heading-3 text-silver-chalice">Board</div>
            </div>
          </div>
          {board.map(({ name, peoplePosition, bio, image }, index: number) => (
            <div
              key={index}
              className="person col-span-12 medium-gap page-grid"
            >
              <GatsbyImage
                image={image.gatsbyImageData}
                alt={image.alt || name}
                className="col-span-8 md:order-2 md:col-span-4 md:col-start-9"
              />
              <div className="text-wrapper col-span-12 md:order-1 md:col-span-8 lg:col-span-7">
                <h3 className="my-5 md:mb-6 md:mt-0">
                  <span className="heading-3 text-torch-red">{name}</span>
                  <br />
                  <span className="heading-3-regular">{peoplePosition}</span>
                </h3>
                <div
                  className="body-sans text-block"
                  dangerouslySetInnerHTML={{
                    __html: bio,
                  }}
                />
              </div>
            </div>
          ))}
        </section>
        <section aria-labelledby="Alumni" className="page-grid page-gap">
          <h2 className="heading-feature text-torch-red col-span-12 md:col-span-10 lg:col-span-8 heading-gap">
            Alumni
          </h2>
          {alumni.map(({ title, names }, index: number) => (
            <div key={index} className="alumni-group col-span-12 medium-gap">
              <h3 className="heading-3 text-silver-chalice my-6 md:mb-8 md:mt-0">
                {title}
              </h3>
              <div
                className="body-sans text-block"
                dangerouslySetInnerHTML={{
                  __html: names,
                }}
              />
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default PeoplePage
