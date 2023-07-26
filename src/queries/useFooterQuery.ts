import { useStaticQuery, graphql } from "gatsby"

export function useFooterQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsSiteSetting {
        acknowledgement
        instagram
        facebook
        email
        mailchimpEndpoint
        partnerAcknowledgement
				partnerLogoCategories {
					... on DatoCmsPartnerLogoCategory {
						categoryName
						width
						logos {
							... on DatoCmsPartnerLogo {
								logo {
									alt
									gatsbyImageData(placeholder: NONE)
								}
								link
							}
						}
					}
				}
        postalAddress
        telephone
        title
        description
        twitter
        address
      }
    }
  `)

  return data
}
