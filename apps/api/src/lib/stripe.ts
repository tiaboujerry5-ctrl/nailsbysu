// Stripe is disabled in local dev mode.
// This is a no-op stub so imports don't break.
export const stripe = {
  checkout: { sessions: { create: async () => ({ url: null }) } },
  webhooks: { constructEvent: () => { throw new Error('Stripe not configured') } },
}
