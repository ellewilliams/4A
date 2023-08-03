import { useStaticQuery, graphql } from "gatsby"

export function useDonateQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsDonate(meta: {isValid: {eq: true}, status: {eq: "published"}}) {
        title
        slug
        id
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        headerImageVideo {
          gatsbyImageData
          alt
          title
        }
        description
        onlineDonationIntroduction
        donationOptions {
          title
          description
        }
        titleSupporters
        supporterTiers {
          title
          names
        }
      }
    }
  `)

  return data
}
