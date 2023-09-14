
import Stripe from "stripe";

const stripe = Stripe(process.env.SECRETE_KEY)

 export const createCheckout = async (linedata) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: { allowed_countries: ['RW', 'TZ', 'KE', 'BJ', 'UG'] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: process.env.CURRENCY },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 1500, currency: process.env.CURRENCY },
            display_name: 'Next day with air',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 1 },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items: linedata,
      mode: 'payment',
      success_url: `${process.env.STRIPECHECKOUT_SUCCESS}?paymentId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.STRIPECHECKOUT_SUCCESS}`
    });
    return session;
  };
