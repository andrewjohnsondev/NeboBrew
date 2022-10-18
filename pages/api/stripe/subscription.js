const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import axios from 'axios';

const baseURL = 'https://10dvmugv.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22subscriptionPrices%22%5D%5B0%5D%7B%0A%20%20%20%20basePrice%0A%20%20%7D%20%20';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const price =
        parseFloat(
          req.body.subscriptionDetails.price
            .split('')
            .filter((char) => char !== '$')
            .join('')
        ) * 100;
      console.log(price);
      const params = {
        mode: 'subscription',
        currency: 'usd',
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        line_items: [
          {
            price_data: {
              currency: 'usd',

              product_data: {
                name: 'NeboBrew',
              },
              unit_amount: price,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/checkout/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };

      if (req.body.user) {
        params.customer_email = req.body.user.email;
      }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
