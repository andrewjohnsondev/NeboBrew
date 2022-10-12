import { useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import styled from 'styled-components';
import useZustandStore from '../../store/zustandStore';
import CartEmpty from './CartEmpty';
import CartItem from './CartItem';

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
  padding-inline: 1rem;
  transform: translateX(100%);
  transition: transform 300ms ease-in-out;
  overflow-y: auto;

  .cart-items {
    padding: 0;
    margin: 0;

    & > * {
      margin-top: 1.5rem;
    }
  }

  .cart__header {
    display: flex;
    align-items: center;
    font-size: 2rem;
    padding-block: 1rem;
    border-bottom: solid 1px hsl(var(--color-neutral-300));

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
  const { isEmpty, totalItems, items, updateItemQuantity, removeItem } = useCart();
  const isCartOpen = useZustandStore((state) => state.isCartOpen);
  const toggleCartState = useZustandStore((state) => state.toggleCartState);
  const [checkCart, setCheckCart] = useState(false);
  useEffect(() => {
    if (isEmpty) return setCheckCart(false);
    if (!isEmpty) return setCheckCart(true);
  }, [isEmpty, setCheckCart]);

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
    </StyledCart>
  );
}
