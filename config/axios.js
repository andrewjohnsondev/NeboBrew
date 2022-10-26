import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://10dvmugv.api.sanity.io/v1/data/mutate/production',
  headers: { Authorization: `Bearer ${process.env.SANITY_AUTH_TOKEN}` },
});

export default instance;
