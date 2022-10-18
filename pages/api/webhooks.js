import Stripe from 'stripe';
import { buffer } from 'micro';
import { format } from 'date-fns';
import neboAxios from '../../config/axios';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function webhookHandler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;
    let event;

    try {
      if (!sig || !webhookSecret) return;
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (error) {
      console.log(`Webhook error: ${error.message}`);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }
    // Create order
    // event.type === 'checkout.session.completed'
    // grab email
    // grab customer
    // grab payment_intent
    // amount_total
    //

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Note that you'll need to add an async prefix to this route handler

      if (event.request.id === null) {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

        // !todo create order
        const fetchProduct = async (name) => {
          const { data } = await axios.get(
            `https://10dvmugv.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22product%22%20%26%26%20name%20%3D%3D%20'${name}'%5D%7B%0A%20%20%20%20_id%0A%20%20%0A%20%20%7D%20%20`
          );
          return data;
        };

        const { amount_subtotal, created, customer, customer_email, payment_intent, customer_details, shipping_rate, shipping_options } = event.data.object;

        async function getProductData() {
          const data = await Promise.all(
            lineItems.data.map(async (product) => {
              const [name, texture] = product.description.split('-');
              const data = await fetchProduct(name.replace(/\s/g, ''));
              console.log(data);
              return { name: product.description, quantity: product.quantity, id: data.result[0]._id, texture };
            })
          );

          console.log(data);

          neboAxios.post('/', {
            mutations: [
              {
                create: {
                  _type: 'orders',
                  email: `${customer_email}`,
                  name: `${customer_details.name}`,
                  orderCreated: `${format(new Date(created * 1000), 'yyyy-MM-dd')}`,
                  orderPrice: `${amount_subtotal}`,
                  stripeUser: `${customer}`,
                  stripeOrderID: `${payment_intent}`,
                  shippingAddress: `${customer_details.address.line1} ${customer_details.address.city}, ${customer_details.address.state} ${customer_details.address.postal_code}`,
                  orderItems: data.map((item) => {
                    return {
                      _key: item.id,
                      quantity: item.quantity,
                      product: { _ref: item.id },
                      texture: item.texture,
                    };
                  }),
                },
              },
            ],
          });
        }

        getProductData();

        // TODO add order with order items

        //here i want to increment the product's buy counter by 1 in the database but stripe only gives name and price, which are not unique, so i need the product id
      }

      console.log('event', event);

      res.status(200).send();
    }
  }
}
