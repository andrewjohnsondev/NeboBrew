import neboAxios from '../../config/axios';
import { format } from 'date-fns';
const orderid = require('order-id')('key');

async function createSubscription(stripeEvent, stripe) {
  const { amount_subtotal, created, customer, customer_details, metadata, subscription } = stripeEvent;
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
  } catch (error) {
    console.log(error.message);
    console.log(error);
  }
}
export default createSubscription;
