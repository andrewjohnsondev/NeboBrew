import { useEffect } from 'react';
import { useCart } from 'react-use-cart';
import styled from 'styled-components';
import PrimaryButton from '../../components/atoms/buttons/PrimaryButton';
import runFireworks from '../../lib/utils/fireworks';
import checkmark from '../../public/assets/checkmark.svg';
import { config } from '../../components/styles/GlobalStyles';
import Head from 'next/head';

const StyledSuccess = styled.section`
  background-color: hsl(var(--color-neutral-1000));
  padding-block: 4rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;

  h1 {
    font-size: 5rem;
    -webkit-text-stroke: 3px;
    -webkit-text-stroke-color: white;

    text-align: center;
  }

  .confirmation {
    background-color: white;
    border-radius: var(--br);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    text-align: center;

    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    h2 {
      font-size: var(--text-3xl);
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-weight: var(--fw-black);
    }

    .support {
      font-size: var(--text-sm);

      &-email {
        color: hsl(var(--color-primary));
      }
    }

    .checkmark {
      width: 2rem;
    }
  }
  @media (min-width: ${config.med}) {
    padding-block: 8rem;

    h1 {
      font-size: 7rem;
    }

    h2 {
      font-size: var(--text-4xl);
    }

    .checkmark {
      width: 3rem;
    }
  }

  @media (min-width: ${config.lg}) {
    h1 {
      font-size: 10rem;
    }
  }
`;

export default function Success() {
  const { emptyCart } = useCart();

  useEffect(() => {
    runFireworks();
    emptyCart();
  }, []);
  return (
    <>
      <Head>
        <title>Coffee | Thank You{product.name}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <StyledSuccess className='bg-pattern'>
        <h1>THANK YOU!</h1>
        <div className='confirmation'>
          <div className='header'>
            <h2>
              <span>
                <img className='checkmark' src='/assets/checkmarkSuccess.svg' alt='' />
              </span>
              Order Complete!
            </h2>
            <p>Please check your email for your receipt and order details.</p>
          </div>
          <PrimaryButton isLink href='/coffee'>
            Continue Shopping
          </PrimaryButton>
          <p className='support'>
            If you have any questions, please email <span className='support-email'>order@nebobrew.com</span>
          </p>
        </div>
      </StyledSuccess>
    </>
  );
}
