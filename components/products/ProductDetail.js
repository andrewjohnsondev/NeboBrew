import Image from 'next/image';
import styled from 'styled-components';
import PrimaryButton from '../atoms/buttons/PrimaryButton';
import ProductHeader from './ProductHeader';
import TextureSelect from './TextureSelect';
import { config } from '../styles/GlobalStyles';
import { Section, Wrapper } from '../styles/utilities';
import { useState } from 'react';
import { useCart } from 'react-use-cart';
import useZustandStore from '../../store/zustandStore';

const StyledProductDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  .image-wrapper {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    border-radius: var(--br);
    background-color: hsl(var(--color-neutral-200));
    min-height: 14.56rem;
    position: relative;
  }

  .detail {
    & > * + * {
      margin-top: 2rem;
    }
  }

  .description {
    border-top: solid 2px hsl(var(--color-neutral-200));
    padding-top: 1rem;
    margin-top: 1rem;
    line-height: 2;
  }

  .full {
    width: 100%;
  }

  @media (min-width: ${config.med}) {
    grid-template-columns: 1fr 1fr;
    /* grid-auto-rows: 400px; */
    gap: 4rem;
  }
`;

export default function ProductDetail({ product }) {
  const { addItem } = useCart();
  console.log(product);
  const [texture, setTexture] = useState('ground');
  const openCart = useZustandStore((state) => state.toggleCartState);

  const addToCart = () => {
    addItem({ ...product, texture, id: product._id + texture }, 1);
    openCart();
  };
  return (
    <Section>
      <Wrapper>
        <StyledProductDetail>
          <div className='image-wrapper'>
            <Image src={product.image.image.secure_url} alt={product.image.alt} priority layout='fill' objectFit='contain' />
          </div>

          <div className='detail'>
            <ProductHeader product={product} />
            <p className='description'>{product.description}</p>
            <TextureSelect texture={texture} setTexture={setTexture} />
            <PrimaryButton onClick={addToCart} className='full'>
              Add To Cart
            </PrimaryButton>
          </div>
        </StyledProductDetail>
      </Wrapper>
    </Section>
  );
}
