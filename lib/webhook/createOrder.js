import { format } from 'date-fns';
import neboAxios from '../../config/axios';
import axios from 'axios';
const orderid = require('order-id')('key');

async function createOrder(stripeObject, stripe) {
  const lineItems = await stripe.checkout.sessions.listLineItems(stripeObject.id);

  const fetchProduct = async (name) => {
    const { data } = await axios.get(`${process.env.SANITY_URL}?query=*%5B_type%20%3D%3D%20%22product%22%20%26%26%20name%20%3D%3D%20'${name}'%5D%7B%0A%20%20%20%20_id%0A%20%20%0A%20%20%7D%20%20`);

    return data;
  };

  const { amount_subtotal, created, customer, payment_intent, customer_details } = stripeObject;

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
  try {
    getProductData();
  } catch (error) {
    console.log(error);
  }
}
export default createOrder;
