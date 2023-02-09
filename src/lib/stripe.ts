import Stripe from 'stripe'

export function createStripe(useSecretApiKey?: boolean) {
  const stripeKey = !useSecretApiKey
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    : process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY

  const stripe = new Stripe(stripeKey, {
    apiVersion: '2022-11-15',
    appInfo: {
      name: 'Ignite Shop'
    }
  })

  return stripe
}