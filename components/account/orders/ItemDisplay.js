import ProductImage from '../../products/ProductImage';
import styled from 'styled-components';
import formatMoney from '../../../lib/helpers/formatMoney';
import { config } from '../../styles/GlobalStyles';

const StyledItemDisplay = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;

  .image-container {
    border-radius: var(--br);
    background-color: hsl(var(--color-neutral-200));
    height: 4rem;
    aspect-ratio: 1 / 1;
    position: relative;
  }

  .price-wrapper {
    display: flex;
    align-items: flex-end;
    justify-content: right;
    padding-right: 1rem;
  }

  .texture {
    text-transform: capitalize;
  }

  .roast {
    font-size: var(--text-xs);
    display: flex;
    flex-direction: column;
  }

  .itemPrice,
  .quantity {
    font-size: var(--text-xs);
  }

  .name-wrapper {
    display: flex;
    gap: 1.2rem;
    align-items: center;
  }

  .name {
    font-weight: var(--fw-bold);
    font-size: var(--text-lg);
  }

  @media (min-width: ${config.med}) {
    .itemPrice,
    .quantity {
      font-size: var(--text-bas);
    }

    .roast {
      font-size: var(--text-sm);
      display: block;
    }
  }
`;

function ItemDisplay({ order }) {
  return (
    <StyledItemDisplay>
      <div className='name-wrapper'>
        <div className='image-container'>
          <ProductImage url={order.product.image.image.secure_url} alt={order.product.image.alt} />
        </div>
        <div>
          <p className='name'>{order.product.name}</p>
          <p className='roast'>
            {order.product.roast} /<span className='texture'>{order.texture}</span>
          </p>
        </div>
      </div>
      <p className='quantity'>{order.quantity}</p>
      <div className='price-wrapper'>
        <p className='itemPrice'>{formatMoney(order.product.price)}</p>
      </div>
    </StyledItemDisplay>
  );
}
export default ItemDisplay;
