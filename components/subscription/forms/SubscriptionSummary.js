import styled from 'styled-components';
import { config } from '../../styles/GlobalStyles';
import { Wrapper } from '../../styles/utilities';

const StyledSummary = styled.section`
  padding-block: 3rem;

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
    font-size: var(--text-xl);
    padding: 0.5em 1.25em;
    width: 100%;
    font-weight: var(--fw-bold);
    border: 3px solid hsl(var(--color-primary));
    border-radius: var(--br);
    cursor: pointer;
    transition: all 200ms ease-in-out;
    text-align: center;

    &:hover {
      border-color: hsl(var(--color-primary));
    }
  }

  @media (min-width: ${config.med}) {
    padding-block: 5rem;
  }
`;

function SubscriptionSummary({ subscriptionFormState, subscriptionPrice }) {
  const summaryData = Object.entries(subscriptionFormState);
  return (
    <StyledSummary>
      <Wrapper>
        <h2>Subscription Summary</h2>
        <ul>
          {summaryData.map(([key, val]) => {
            return (
              <li key={key}>
                <span>{key}:</span>
                {val}
              </li>
            );
          })}
        </ul>
      </Wrapper>
    </StyledSummary>
  );
}

export default SubscriptionSummary;
