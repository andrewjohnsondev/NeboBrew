import Stripe from 'stripe';
import { buffer } from 'micro';
import { format } from 'date-fns';
import neboAxios from '../../config/axios';
import axios from 'axios';
const orderid = require('order-id')('key');

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

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Note that you'll need to add an async prefix to this route handler

      if (event.data.object.mode !== 'subscription') {
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

              return { name: product.description, quantity: product.quantity, id: data.result[0]._id, texture };
            })
          );

          neboAxios.post('/', {
            mutations: [
              {
                create: {
                  _type: 'orders',
                  email: `${customer_email}`,
                  name: `${customer_details.name}`,
                  orderNumber: `${orderid.generate()}`,
                  orderCreated: `${format(new Date(created * 1000), 'yyyy-MM-dd')}`,
                  stripeDate: created,
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
      }

      if (event.data.object.mode === 'subscription') {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

        const { amount_subtotal, created, customer, customer_email, customer_details, metadata, subscription, total_details } = event.data.object;
        const { current_period_end } = await stripe.subscriptions.retrieve(subscription);

        try {
          neboAxios.post('/', {
            mutations: [
              {
                create: {
                  _type: 'subscriptions',
                  email: `${customer_email}`,
                  name: `${customer_details.name}`,
                  orderNumber: `${orderid.generate()}`,
                  subscriptionCreated: `${format(new Date(created * 1000), 'yyyy-MM-dd')}`,
                  stripeDate: created,
                  subscriptionPrice: `${amount_subtotal}`,
                  stripeUser: `${customer}`,
                  subscriptionId: `${subscription}`,
                  shippingAddress: `${customer_details.address.line1} ${customer_details.address.city}, ${customer_details.address.state} ${customer_details.address.postal_code}`,
                  texture: `${metadata.texture}`,
                  quantity: `${metadata.quantity}`,
                  roast: `${metadata.roast}`,
                  active: true,
                  nextCharge: `${format(new Date(current_period_end * 1000), 'yyyy-MM-dd')}`,
                },
              },
            ],
          });
        } catch (error) {
          console.log(error.message);
        }
      }

      res.status(200).send();
    }

    if (event.type === 'customer.subscription.deleted') {
      const id = event.data.object.id;
      try {
        const { data } = await axios.get(
          `https://10dvmugv.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20'subscriptions'%20%26%26%20subscriptionId%20%3D%3D%20'${id}'%5D%7B%0A%20_id%0A%20%20%7D%20%20`
        );

        const subscriptionId = data.result[0]._id;

        await neboAxios.post('/', {
          mutations: [
            {
              patch: {
                id: subscriptionId,
                set: {
                  active: false,
                },
              },
            },
          ],
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    res.status(200).send();
  }
}
