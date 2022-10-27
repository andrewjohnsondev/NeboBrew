import styled from 'styled-components';
import formatMoney from '../../lib/helpers/formatMoney';
import { useCart } from 'react-use-cart';
import ProductImage from '../products/ProductImage';

const StyledCartItem = styled.li`
  display: grid;
  grid-template-columns: 1.5fr 3fr 1fr;
  gap: 2rem;
  min-height: 7.5rem;
  border-bottom: solid 1px hsl(var(--color-neutral-200));
  padding-bottom: 1.25rem;
  .name {
    font-weight: var(--fw-black);
    font-size: var(--text-xl);
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .texture {
    font-size: var(--text-xs);

    span {
      text-transform: capitalize;
    }
  }

  .image-container {
    border-radius: var(--br);
    background-color: hsl(var(--color-neutral-200));
    width: 100%;
    position: relative;
  }

  .price {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: right;

    span {
      display: block;
      position: relative;
      padding: 1rem;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      padding: 0;
      position: absolute;
      right: 0;
      top: -5px;
    }
  }

  .quantity--container {
    border: solid 1px hsl(var(--color-neutral-700));
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 0.25em;
    font-size: 0.9rem;
    max-width: 6rem;

    .quantity-btn {
      background: none;
      border: none;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

function CartItem({ item }) {
  const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } = useCart();
  return (
    <StyledCartItem key={item.id}>
      <div className='image-container'>
        <ProductImage url={item.image.image.secure_url} alt={item.image.alt} />
      </div>
      <div className='details'>
        <div>
          <p className='name'>{item.name}</p>
          <p className='texture'>
            Coffee Texture: <span>{item.texture}</span>
          </p>
        </div>
        <div className='quantity--container'>
          <button className='quantity-btn' onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
            &#x2212;
          </button>
          <span>{item.quantity}</span>
          <button className='quantity-btn' onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
            &#x2b;
          </button>
        </div>
      </div>
      <div className='price'>
        <span>
          <button onClick={() => removeItem(item.id)} className='close'>
            &times;
          </button>
        </span>
        <p>{formatMoney(item.price * item.quantity)}</p>
      </div>
    </StyledCartItem>
  );
}
export default CartItem;
