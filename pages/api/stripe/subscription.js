const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
        metadata: {
          texture: req.body.subscriptionDetails.texture,
          roast: req.body.subscriptionDetails.roast,
          quantity: req.body.subscriptionDetails.quantity,
        },
        success_url: `${req.headers.origin}/checkout/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };

      if (req.body.user) {
        params.customer_email = req.body.email;
      }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json('happended here');
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
