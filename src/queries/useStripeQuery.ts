import { useStaticQuery, graphql } from "gatsby"

export function useStripeQuery() {
  const data = useStaticQuery(graphql`
    query {
      allStripePrice(
        filter: { active: { eq: true } }
        sort: { fields: [unit_amount] }
      ) {
        nodes {
          unit_amount
          id
          currency
        }
      }
    }
  `)

  return data
}
