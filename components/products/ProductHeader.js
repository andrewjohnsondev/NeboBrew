import styled from 'styled-components';
import formatMoney from '../../lib/helpers/formatMoney';
import DetailPrice from '../atoms/DetailPrice';
import ProductName from '../atoms/ProductName';
import ReviewStars from '../atoms/ReviewStars';
import Roast from '../atoms/Roast';
const StyledProductHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.95fr 0.95fr;

  .roast {
    grid-row: 1;
    grid-column: 1;
  }
  .name {
    grid-row: 2;
    grid-column: 1;
    align-self: end;
  }

  .price {
    justify-self: end;
    align-self: end;
  }
`;

export default function ProductHeader({ product }) {
  return (
    <StyledProductHeader>
      <Roast className='roast'>{product.roast[0]}</Roast>
      <ProductName className='name'>{product.name}</ProductName>
      <ReviewStars className='reviews' />
      <DetailPrice className='price'>{formatMoney(product.price)}</DetailPrice>
    </StyledProductHeader>
  );
}
