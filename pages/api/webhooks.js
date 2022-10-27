import Stripe from 'stripe';
import { buffer } from 'micro';
import neboAxios from '../../config/axios';
import { format } from 'date-fns';
const orderid = require('order-id')('key');
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function webhookHandler(req, res) {
  try {
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

      const eventObject = event.data.object;

      if (event.type === 'checkout.session.completed') {
        if (eventObject.subscription) {
          const { amount_subtotal, created, customer, customer_details, metadata, subscription } = eventObject;
          const { current_period_end } = await stripe.subscriptions.retrieve(subscription);

          try {
            await neboAxios.post('/', {
              mutations: [
                {
                  create: {
                    _type: 'subscriptions',
                    email: `${customer_details.email}`,
                    name: `${customer_details.name}`,
                    orderNumber: `${orderid.generate()}`,
                    subscriptionCreated: `${format(new Date(created * 1000), 'yyyy-MM-dd')}`,
                    stripeDate: `${created}`,
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
            res.status(200).send();
          } catch (error) {
            console.log(error.message);
          }
        }

        if (!eventObject.subscription) {
          axios.post('/api/stripe/createOrder', {
            createOrder: eventObject,
          });
          res.status(200).send();
        }
      }
      if (event.type === 'customer.subscription.deleted') {
        res.status(200).send();
        const id = eventObject.id;
        const { data } = await axios.get(`${process.env.SANITY_URL}?query=*%5B_type%20%3D%3D%20'subscriptions'%20%26%26%20subscriptionId%20%3D%3D%20'${id}'%5D%7B%0A%20_id%0A%20%20%7D%20%20`);

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
      }
    }

    res.status(200).send();
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
}
