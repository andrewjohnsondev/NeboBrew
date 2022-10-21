import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';
import { Wrapper } from '../styles/utilities';
const StyledSubscriptionSteps = styled.div`
  background-color: hsl(var(--color-neutral-1000));
  padding-block: 1.5rem;
  display: flex;
  justify-content: center;
  padding-inline: 1.25rem;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    gap: 5rem;
    position: relative;

    &::after {
      content: '';
      background-color: hsl(var(--color-neutral-400));
      width: 100%;
      height: 2px;
      position: absolute;
      top: 50%;
    }
  }

  li {
    color: hsl(var(--color-neutral-500));
    position: relative;
    height: 100%;
    z-index: 1;
    cursor: pointer;

    &::after {
      content: '';
      border-radius: 100%;
      border: solid 2px hsl(var(--color-neutral-500));
      aspect-ratio: 1 / 1;
      padding: 1rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: hsl(var(--color-neutral-1000));
      z-index: -1;
    }
    @media (min-width: ${config.med}) {
      font-size: var(--text-3xl);
      &::after {
        padding: 1.5rem;
      }
    }
  }

  .completed {
    color: white;

    &::after {
      border-color: white;
    }
  }
`;

export default function SubscriptionSteps({ currentStep, setCurrentStep, dispatch }) {
  const steps = [1, 2, 3, 4];
  const handleClick = (step) => {
    currentStep > step && setCurrentStep(step);
    dispatch({ type: 'RESET-PLAN' });
  };

  return (
    <StyledSubscriptionSteps>
      <ul>
        {steps.map((step) => (
          <li onClick={() => handleClick(step)} key={step} className={step === currentStep || currentStep > step ? 'completed' : ''}>
            {step}
          </li>
        ))}
      </ul>
    </StyledSubscriptionSteps>
  );
}
