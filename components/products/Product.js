import ProductImage from './ProductImage';
import styled from 'styled-components';
import Price from '../atoms/Price';
import SecondaryButton from '../atoms/buttons/SecondaryButton';
import { config } from '../styles/GlobalStyles';
import PrimaryButton from '../atoms/buttons/PrimaryButton';
import { useRouter } from 'next/router';
import useZustandStore from '../../store/zustandStore';
const StyledProduct = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: ${config.lg}) {
    .quick-shop {
      display: none;
    }
  }
`;

const StyledProductImage = styled.div`
  border-radius: var(--br);
  background-color: hsl(var(--color-neutral-200));
  filter: drop-shadow(3px 3px 4px #dfdfdf);
  min-height: 14.56rem;
  position: relative;

  .product-buttons {
    display: none;
  }

  @media (min-width: ${config.lg}) {
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(3px);
      z-index: 9999;
      opacity: 0;
      transition: opacity 200ms ease;
    }

    &:hover::before {
      opacity: 1;
    }

    .product-buttons {
      display: grid;
      opacity: 0;
      place-content: center;
      gap: 1rem;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99999;
      width: 100%;
      height: 100%;
      transition: opacity 500ms ease;
    }

    &:hover {
      .product-buttons {
        opacity: 1;
      }
    }
  }
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-block: 0.35rem;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .product-name {
    font-size: var(--text-lg);
    font-weight: var(--fw-bold);
  }

  .roast {
    font-size: var(--text-base);
  }
`;

export default function Product({ product, priority }) {
  const { name, price, roast, image, slug_regular_custom_input } = product;
  const setModalOpen = useZustandStore((state) => state.setModalOpen);
  const setQuickShopProduct = useZustandStore((state) => state.setQuickShopProduct);
  const router = useRouter();

  const handleNavigation = (e) => {
    if (e.target.id !== 'quick-shop') router.push(`/coffee/${slug_regular_custom_input.current}`);
  };

  const handleQuickShopClick = () => {
    setQuickShopProduct(product);
    setModalOpen(true);
  };

  return (
    <div role='link' tabIndex='0' onClick={handleNavigation}>
      <StyledProduct>
        {product && (
          <>
            <StyledProductImage>
              <ProductImage priority={priority} alt={image.alt} url={image.image.secure_url} />
              <div className='product-buttons'>
                <SecondaryButton className='btn-md'>View Details</SecondaryButton>
                <PrimaryButton onClick={handleQuickShopClick} id='quick-shop' className='btn-md'>
                  Quick Shop
                </PrimaryButton>
              </div>
            </StyledProductImage>

            <ProductContent>
              <div className='header'>
                <h3 className='product-name'>{name}</h3>
                <Price price={price} />
              </div>
              <p className='roast'>{roast}</p>
            </ProductContent>
            <SecondaryButton onClick={handleQuickShopClick} id='quick-shop' className='btn-sm quick-shop'>
              Quick Shop
            </SecondaryButton>
          </>
        )}
      </StyledProduct>
    </div>
  );
}
