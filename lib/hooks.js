import { useState } from 'react';
import useZustandStore from '../store/zustandStore';

export function useCartStorage() {
  const cartItems = useZustandStore((state) => state.cartItems);
  const setCartItems = useZustandStore((state) => state.setCartItems);

  return [stringCartItems, setCartItems];
}
