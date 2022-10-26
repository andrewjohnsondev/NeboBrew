import { useEffect } from 'react';
import styled from 'styled-components';
import formatMoney from '../../../lib/helpers/formatMoney';
import { config } from '../../styles/GlobalStyles';
import { Wrapper } from '../../styles/utilities';

const StyledButtonForm = styled.div`
  h2 {
    text-align: center;
    font-size: var(--text-3xl);
    font-weight: var(--fw-black);
    letter-spacing: 1px;
  }

  .button-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 3rem;
  }
  button {
    background-color: hsl(var(--color-primary-300), 60%);
    border: none;
    font-size: var(--text-xl);
    padding: 0.5em 1.25em;
    width: 100%;
    font-weight: var(--fw-bold);
    border: 3px solid transparent;
    border-radius: var(--br);
    cursor: pointer;
    transition: all 200ms ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    .discount {
      content: '';
      background-color: hsl(var(--color-neutral-1000));
      height: 100px;
      right: -50px;
      position: absolute;
      top: -50px;
      width: 100px;
      transform: rotate(-45deg);
      border-radius: var(--br);
    }

    .discount {
      color: white;

      &__inner {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 100%;

        span {
          color: white;
          position: absolute;
          font-size: 12px;
          left: 4px;
          transform: rotate(45deg);
          top: 50%;
          z-index: 1000;
        }

        span:first-child {
          top: 25%;
          font-size: 16px;
        }
      }
    }

    .price {
      font-weight: normal;
      font-size: var(--text-lg);
    }

    &:hover {
      border-color: hsl(var(--color-primary));
    }
  }

  .active {
    border-color: hsl(var(--color-primary));
  }

  .active.remove {
    border-color: transparent;
  }

  @media (min-width: ${config.med}) {
    h2 {
      font-size: var(--text-4xl);
    }

    .button-wrapper {
      flex-direction: row;
      justify-content: center;
      gap: 2rem;
    }

    button {
      font-size: var(--text-2xl);
      max-width: 13rem;
    }
  }
`;

export default function ButtonForm({ title, step, setCurrentStep, dispatch, subscriptionState, formKey, subscriptionPlans }) {
  const onFormButtonClick = (e) => {
    dispatch({ type: 'PRICE', payload: e.target.dataset.price });
    dispatch({ type: 'QUANTITY', payload: e.target.value });
  };

  useEffect(() => {
    if (subscriptionState.price && subscriptionState.quantity) {
      setCurrentStep((step) => step + 1);
    }
  }, [subscriptionState, setCurrentStep]);

  subscriptionPlans.sort((a, b) => (a.quantity < b.quantity ? -1 : 1));
  return (
    <StyledButtonForm>
      <Wrapper>
        <h2>{title}:</h2>
        <div className='button-wrapper'>
          {subscriptionPlans.map((val) => {
            const price = (val.price / 100) * val.quantity;
            const isDiscount = val.discount ? true : false;
            const discount = val.discount / 100;
            const discountedPrice = price - price * discount;

            return (
              <button
                className={subscriptionState[formKey] === val.quantity ? 'active' : ''}
                data-price={formatMoney(discountedPrice * 100)}
                key={val.name}
                value={val.quantity}
                onClick={onFormButtonClick}
              >
                {val.quantity} {val.quantity > 1 ? 'Bags' : 'Bag'}
                <span className='price'>{isDiscount ? formatMoney(discountedPrice * 100) : formatMoney(val.price)}</span>
                {isDiscount && (
                  <div className='discount'>
                    <div className='discount__inner'>
                      <span>{val.discount}%</span>
                      <span>OFF</span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Wrapper>
    </StyledButtonForm>
  );
}
