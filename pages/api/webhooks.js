import Stripe from 'stripe';
import { buffer } from 'micro';
import createSubscription from '../../lib/webhook/createSubscription';
import createOrder from '../../lib/webhook/createOrder';
import deleteSubscription from '../../lib/webhook/deleteSubscription';

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

    const eventObject = event.data.object;

    if (event.type === 'checkout.session.completed') {
      if (eventObject.subscription) {
        res.status(200).send();
        await createSubscription(eventObject, stripe);
      }

      if (!eventObject.subscription) {
        console.log('subscription created order');
        res.status(200).send();
        await createOrder(eventObject, stripe);
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      res.status(200).send();
      await deleteSubscription(eventObject);
    }
  }

  res.status(200).send();
}
