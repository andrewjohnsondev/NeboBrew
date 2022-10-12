import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://10dvmugv.api.sanity.io/v1/data/mutate/production',
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEBOBREW_API_KEY}` },
});

export default instance;
