import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.BE_URL,
});

export const getWishlist = () => {
  return instance
    .get('/api/wishlist')
    .then((res) => Promise.resolve(res?.data))
    .catch((err) => Promise.reject(err?.response));
};

export const createWishlist = (payload: any) => {
  return instance
    .post('/api/wishlist', payload)
    .then((res) => Promise.resolve(res.data))
    .catch((err) => Promise.reject(err.response));
};
