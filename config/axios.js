import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SANITY_URL,
  headers: { Authorization: `Bearer ${process.env.SANITY_AUTH_TOKEN}` },
});

export default instance;
