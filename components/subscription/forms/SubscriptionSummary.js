import styled from 'styled-components';
import PrimaryButton from '../../atoms/buttons/PrimaryButton';
import { config } from '../../styles/GlobalStyles';
import { Wrapper } from '../../styles/utilities';
import axios from 'axios';
import getStripe from '../../../lib/getStripe';
import { useAuth } from '../../context/Auth';

const StyledSummary = styled.section`
  h2 {
    font-size: var(--text-3xl);
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 3rem;
  }

  span {
    font-size: var(--text-base);
    font-weight: var(--fw-regular);
  }

  li {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-transform: capitalize;
    background-color: hsl(var(--color-primary-300), 60%);
    padding: 0.5em 1.25em;
    width: 100%;
    border: 3px solid hsl(var(--color-primary));
    border-radius: var(--br);
    cursor: pointer;
    transition: all 200ms ease-in-out;
    text-align: center;

    .value {
      font-weight: var(--fw-bold);
      font-size: var(--text-xl);
    }

    &:hover {
      border-color: hsl(var(--color-primary));
    }
  }
  .actions {
    display: flex;
    flex-direction: column;
    margin-top: 4rem;
    gap: 1rem;
    max-width: 30rem;
    margin-inline: auto;

    .reset {
      border: none;
      background: none;
      cursor: pointer;
    }
  }
`;

function SubscriptionSummary({ subscriptionState, dispatch, setCurrentStep }) {
  const summaryData = Object.entries(subscriptionState);
  const { user } = useAuth();

  const handleReset = () => {
    setCurrentStep(1);
    dispatch({ type: 'RESET' });
  };

  const handleSubscriptionCheckout = async () => {
    const stripe = await getStripe();
    let response;

    if (user) {
      response = await axios.post('/api/stripe/subscription', {
        subscriptionDetails: subscriptionState,
        user,
      });
    } else {
      response = await axios.post('/api/stripe/subscription', {
        subscriptionDetails: subscriptionState,
      });
    }

    if (response.statusCode === 500) return;

    const { data } = response;

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <StyledSummary>
      <Wrapper>
        <h2>Subscription Summary</h2>
        <ul>
          {summaryData.map(([key, val]) => {
            return (
              <li key={key}>
                <span>{key}:</span>
                <span className='value'>
                  {val} {key === 'price' && <span>/monthly</span>}
                </span>
              </li>
            );
          })}
        </ul>
        <div className='actions'>
          <PrimaryButton onClick={handleSubscriptionCheckout}>Subscribe</PrimaryButton>
          <button onClick={handleReset} className='reset'>
            Start Over
          </button>
        </div>
      </Wrapper>
    </StyledSummary>
  );
}

export default SubscriptionSummary;
