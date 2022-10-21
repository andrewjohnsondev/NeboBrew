import { useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import styled from 'styled-components';
import formatMoney from '../../lib/helpers/formatMoney';
import useZustandStore from '../../store/zustandStore';
import PrimaryButton from '../atoms/buttons/PrimaryButton';
import CartEmpty from './CartEmpty';
import CartItem from './CartItem';
import getStripe from '../../lib/getStripe';
import axios from 'axios';
import { useAuth } from '../context/Auth';

const StyledCart = styled.aside`
  background-color: white;
  position: fixed;
  z-index: 100000;
  top: 0;
  bottom: 0;
  right: 0;
  width: 90%;
  max-width: 25rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  transform: translateX(100%);
  transition: transform 300ms ease-in-out;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  .cart-items {
    padding: 0;
    margin: 0;
    padding-inline: 1rem;

    & > * {
      margin-top: 1.5rem;
    }
  }

  .total-wrapper {
    margin-top: auto;
    background-color: hsl(var(--color-neutral-100));
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .total {
    display: flex;
    justify-content: space-between;
    font-weight: var(--fw-bold);
    font-size: var(--text-xl);
  }

  .cart__header {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    font-size: 2rem;
    padding: 1rem;
    border-bottom: solid 1px hsl(var(--color-neutral-300));
    background-color: white;
    z-index: 9999;

    h2 {
      font-size: var(--text-2xl);
    }

    .close {
      font-size: 2rem;
      text-align: right;
      background: none;
      border: none;
      margin-left: auto;
      padding: 0;
      padding-inline: 1rem;
      cursor: pointer;
    }
  }
`;

export default function Cart() {
  const { isEmpty, totalItems, items } = useCart();
  const isCartOpen = useZustandStore((state) => state.isCartOpen);
  const toggleCartState = useZustandStore((state) => state.toggleCartState);
  const [checkCart, setCheckCart] = useState(false);
  const [total, setTotal] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (isEmpty) return;
    const value = items.reduce((prevVal, currentVal) => {
      return prevVal + currentVal.price * currentVal.quantity;
    }, 0);

    setTotal(value);
  }, [items, isEmpty]);

  useEffect(() => {
    if (isEmpty) return setCheckCart(false);
    if (!isEmpty) return setCheckCart(true);
  }, [isEmpty, setCheckCart]);

  useEffect(() => {
    const escListener = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        toggleCartState();
      }
    };

    document.addEventListener('keydown', escListener);

    return () => {
      document.removeEventListener('keydown', escListener);
    };
  });

  const handleCheckout = async () => {
    const stripe = await getStripe();
    let response;

    if (user) {
      response = await axios.post('/api/stripe', {
        cartItems: items,
        user,
      });
    } else {
      response = await axios.post('/api/stripe', {
        cartItems: items,
      });
    }

    if (response.statusCode === 500) return;

    const { data } = response;

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  if (!checkCart) {
    return (
      <StyledCart id='cart' aria-hidden={isCartOpen ? true : false} className={isCartOpen ? 'open' : ''}>
        <div className='cart__header'>
          <h2>Your Cart</h2>
          <button onClick={() => toggleCartState()} className='close'>
            x
          </button>
        </div>
        <CartEmpty />
      </StyledCart>
    );
  }

  return (
    <StyledCart id='cart' aria-hidden={isCartOpen ? true : false} className={isCartOpen ? 'open' : ''}>
      <div className='cart__header'>
        <h2>Your Cart ({totalItems})</h2>
        <button onClick={() => toggleCartState()} className='close'>
          x
        </button>
      </div>

      <ul className='cart-items'>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className='total-wrapper'>
        <p className='total'>
          Subtotal: <span>{formatMoney(total)}</span>
        </p>
        <PrimaryButton onClick={handleCheckout}>Checkout</PrimaryButton>
      </div>
    </StyledCart>
  );
}
