const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import neboAxios from '../../../config/axios';
import { format } from 'date-fns';
const orderid = require('order-id')('key');
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      if (req.body.createOrder) {
        const eventObject = req.body.createOrder;
        const lineItems = await stripe.checkout.sessions.listLineItems(eventObject.id);
        const fetchProduct = async (name) => {
          const { data } = await axios.get(
            `${process.env.SANITY_URL}?query=*%5B_type%20%3D%3D%20%22product%22%20%26%26%20name%20%3D%3D%20'${name}'%5D%7B%0A%20%20%20%20_id%0A%20%20%0A%20%20%7D%20%20`
          );

          return data;
        };

        const { amount_subtotal, created, customer, payment_intent, customer_details } = eventObject;
        async function getProductData() {
          const data = await Promise.all(
            lineItems.data.map(async (product) => {
              const [name, texture] = product.description.split('-');
              const data = await fetchProduct(name.replace(/\s/g, ''));

              return { name: product.description, quantity: product.quantity, id: data.result[0]._id, texture };
            })
          );

          await neboAxios.post('/', {
            mutations: [
              {
                create: {
                  _type: 'orders',
                  email: `${customer_details.email}`,
                  name: `${customer_details.name}`,
                  orderNumber: `${orderid.generate()}`,
                  orderCreated: `${format(new Date(created * 1000), 'yyyy-MM-dd')}`,
                  stripeDate: `${created}`,
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
        await getProductData();
        res.status(200).send();
      }
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
