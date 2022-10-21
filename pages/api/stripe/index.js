const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        shipping_options: [{ shipping_rate: 'shr_1LtEG2Jh4NQ6dY9Ql7bnDHDs' }],
        line_items: req.body.cartItems.map((item) => {
          const img = item.image.image.secure_url;

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${item.name} - ${item.texture}`,
                images: [img],
                description: item._id,
              },

              unit_amount: item.price,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
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
