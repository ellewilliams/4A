import * as React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { useDonationConfirmationQuery } from "../queries/useDonationConfirmationQuery"

const DonationConfirmationPage = () => {
  const { datoCmsDonationConfirmation } = useDonationConfirmationQuery()
  const { heading, description } = datoCmsDonationConfirmation

  return (
    <Layout theme="white">
      <HelmetDatoCms title="Donation Confirmation" />
      <div className="container-fluid donate-confirm page-top">
        <section aria-labelledby="People" className="page-grid section-gap">
          <h2 className="heading-1 col-span-12 text-torch-red heading-gap">
            {heading}
          </h2>
          <div className="col-span-12 md:col-span-8 md:col-start-2 xl:col-span-6 xl:col-start-2">
            {description && (
              <div
                className="body-sans text-block"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}
            <Link
              to="../.."
              aria-label="Navigate Home"
              className="body-sans underline mt-5 md:mt-6 block"
            >
              Back to home page
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default DonationConfirmationPage
