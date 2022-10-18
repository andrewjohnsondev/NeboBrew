import { useEffect } from 'react';
import styled from 'styled-components';
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

export default function ButtonForm({ title, step, setCurrentStep, dispatch, subscriptionState, formKey, values }) {
  const onFormButtonClick = (e) => {
    if (formKey === 'texture') {
      dispatch({ type: 'TEXTURE', payload: e.target.value });
      setCurrentStep(step + 1);
      return;
    }
    if (formKey === 'roast') {
      dispatch({ type: 'ROAST', payload: e.target.value });
      setCurrentStep(step + 1);
      return;
    }
  };

  console.log(subscriptionState);
  return (
    <StyledButtonForm>
      <Wrapper>
        <h2>{title}:</h2>
        <div className='button-wrapper'>
          {values.map((val) => {
            return (
              <button className={subscriptionState[formKey] === val ? 'active' : ''} key={val} value={val} onClick={onFormButtonClick}>
                {val}
              </button>
            );
          })}
        </div>
      </Wrapper>
    </StyledButtonForm>
  );
}
