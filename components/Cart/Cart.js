import { useState, useEffect, useRef } from 'react';
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
import useMenuInit from '../../lib/hooks/useMenuInit';
import useEventListener from '../../lib/hooks/useEventListener';
import useClickOutside from '../../lib/hooks/useClickOutside';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';

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
  display: ${({ initMenu }) => (initMenu ? 'flex' : 'none')};
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
  const closeCartState = useZustandStore((state) => state.closeCartState);
  const [checkCart, setCheckCart] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [initMenu] = useMenuInit();
  const cartRef = useRef();
  useClickOutside(cartRef, (e) => {
    if (e.target.id === 'cartIcon') return;
    closeCartState();
  });
  useEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartState();
    }
  });

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

  const handleCheckout = async () => {
    setLoading(true);
    try {
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
    } catch (errror) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  if (!checkCart) {
    return (
      <StyledCart ref={cartRef} initMenu={initMenu} id='cart' aria-hidden={isCartOpen ? true : false} className={isCartOpen ? 'open' : ''}>
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
    <StyledCart ref={cartRef} initMenu={initMenu} id='cart' aria-hidden={isCartOpen ? true : false} className={isCartOpen ? 'open' : ''}>
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
        <PrimaryButton disabled={loading ? true : false} onClick={handleCheckout}>
          {loading ? <TailSpin height={18} width={18} color='#fff' /> : 'Checkout'}
        </PrimaryButton>
      </div>
    </StyledCart>
  );
}
