import neboAxios from '../../config/axios';
import axios from 'axios';

async function deleteSubscription(stripeObject) {
  const id = stripeObject.id;
  try {
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
  } catch (err) {
    console.log(err.message);
  }
}

export default deleteSubscription;
