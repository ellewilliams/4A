import * as React from "react"
import Layout from "../components/layout"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { graphql } from "gatsby"
import { SideBar } from "../components/sideBar"

const Paper = ({ data, pageContext }) => {
  const { featureColour } = pageContext
  const { title, publishedMonth, featureImage, paperArticles, seoMetaTags } =
    data.datoCmsPaper

  return (
    <Layout theme="pampas">
      <HelmetDatoCms title={`${title}, ${publishedMonth}`} seo={seoMetaTags} />
      <div className="lg:h-screen w-full" style={{ marginTop: -110 }}>
        <div className="lg:h-screen lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16 mx-auto lg:pl-11">
          <div className="vh-mobile lg:h-screen lg:col-span-8">
            <div
              className="mix-blend-color absolute z-10 w-full lg:w-10/12 vh-mobile lg:h-screen lg:-ml-24 xl:-ml-28"
              style={{ background: featureColour }}
            />
            <img
              src={featureImage.url}
              alt={featureImage.alt}
              className="vh-mobile lg:h-screen absolute w-full lg:w-9/12 left-0 object-cover"
            />
          </div>
          <div className="block w-full col-start-0 lg:col-span-4 lg:col-start-9">
            <SideBar
              backgroundColor="#f4f4ee"
              featureColour={featureColour}
              publishedMonth={publishedMonth}
              articles={paperArticles}
              title={title}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Paper

export const query = graphql`
  query PaperQuery($slug: String!) {
    datoCmsPaper(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      featureImage {
        gatsbyImageData(placeholder: NONE)
        url
        alt
      }
      id
      summary
      title
      publishedMonth(formatString: "MMMM YYYY")
      paperArticles {
        id
        title
        author {
          name
        }
        slug
        letterFromTheEditor
      }
    }
  }
`
