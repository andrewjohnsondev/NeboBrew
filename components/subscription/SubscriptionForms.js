import styled from 'styled-components';
import ButtonForm from './forms/ButtonForm';
import SubscriptionSummary from './forms/SubscriptionSummary';
import SubscriptionPlans from './forms/SubscriptionPlans';
import { config } from '../styles/GlobalStyles';

const StyledSubscriptionForm = styled.section`
  padding-block: 3rem;

  @media (min-width: ${config.med}) {
    padding-block: 6rem;
  }
`;

export default function SubscriptionsForm({ subscriptionPlans, subscriptionState, dispatch, currentStep, setCurrentStep }) {
  return (
    <StyledSubscriptionForm>
      {currentStep === 1 && (
        <ButtonForm step={1} setCurrentStep={setCurrentStep} values={['Whole Bean', 'Ground']} formKey='texture' subscriptionState={subscriptionState} dispatch={dispatch} title='Select Texture' />
      )}
      {currentStep === 2 && (
        <ButtonForm
          step={2}
          setCurrentStep={setCurrentStep}
          values={['Light', 'Medium', 'Dark', 'Random']}
          formKey='roast'
          subscriptionState={subscriptionState}
          dispatch={dispatch}
          title='Select Roast'
        />
      )}
      {currentStep === 3 && (
        <SubscriptionPlans
          step={3}
          setCurrentStep={setCurrentStep}
          formKey='quantity'
          subscriptionState={subscriptionState}
          dispatch={dispatch}
          title='Select Quantity'
          subscriptionPlans={subscriptionPlans}
        />
      )}

      {currentStep === 4 && <SubscriptionSummary setCurrentStep={setCurrentStep} subscriptionState={subscriptionState} dispatch={dispatch} />}
    </StyledSubscriptionForm>
  );
}
