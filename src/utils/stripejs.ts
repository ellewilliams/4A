/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { loadStripe } from "@stripe/stripe-js"
const { GATSBY_STRIPE_PUBLISHABLE_KEY } = process.env

let stripePromise: any
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(GATSBY_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

export default getStripe
