import ProductImage from '../atoms/ProductImage';
import styled from 'styled-components';
import Link from 'next/link';
import formatMoney from '../../lib/helpers/formatMoney';
import wait from 'waait';

const StyledSearchItem = styled.a`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  grid-template-columns: 3fr 1fr;
  gap: 3rem;
  border: 2px solid hsl(var(--color-neutral-900));
  border-radius: var(--br);
  padding: 0.5rem;

  .image-container {
    border-radius: var(--br);
    background-color: hsl(var(--color-neutral-200));
    height: 5rem;
    position: relative;
  }

  .price-wrapper {
    display: flex;
    align-items: center;
    justify-content: right;
    padding-right: 1rem;
  }

  .price {
    font-size: var(--text-xl);
  }

  .name-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    align-items: center;
  }

  .name {
    font-weight: var(--fw-bold);
    font-size: var(--text-xl);
  }
`;

function SearchItem({ product, setIsSearchOpen }) {
  const handlePageLoad = async () => {
    await wait(350);
    setIsSearchOpen(false);
  };
  return (
    <Link href={`/coffee/${product.slug_regular_custom_input.current}`}>
      <StyledSearchItem onClick={handlePageLoad}>
        <div className='name-wrapper'>
          <div className='image-container'>
            <ProductImage url={product.image.image.secure_url} alt={product.image.alt} />{' '}
          </div>
          <div>
            <p className='name'>{product.name}</p>
            <p>{product.roast}</p>
          </div>
        </div>
        <div className='price-wrapper'>
          <p className='price'>{formatMoney(product.price)}</p>
        </div>
      </StyledSearchItem>
    </Link>
  );
}
export default SearchItem;
