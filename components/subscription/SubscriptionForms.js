import styled from 'styled-components';
const StyledSubscriptionForm = styled.div``;
import ButtonForm from './forms/ButtonForm';
import SubscriptionSummary from './forms/SubscriptionSummary';

export default function SubscriptionsForm({ subscriptionPrice, subscriptionFormState, setSubscriptionFormState, currentStep, setCurrentStep }) {
  return (
    <StyledSubscriptionForm>
      {currentStep === 1 && (
        <ButtonForm
          step={1}
          setCurrentStep={setCurrentStep}
          values={['Whole Bean', 'Ground']}
          formKey='texture'
          subscriptionFormState={subscriptionFormState}
          setSubscriptionFormState={setSubscriptionFormState}
          title='Select Texture'
        />
      )}
      {currentStep === 2 && (
        <ButtonForm
          step={2}
          setCurrentStep={setCurrentStep}
          values={['Light', 'Medium', 'Dark']}
          formKey='roast'
          subscriptionFormState={subscriptionFormState}
          setSubscriptionFormState={setSubscriptionFormState}
          title='Select Roast'
        />
      )}
      {currentStep === 3 && (
        <ButtonForm
          step={3}
          setCurrentStep={setCurrentStep}
          values={['1 Bag', '2 Bags', '3 Bags']}
          formKey='quantity'
          subscriptionFormState={subscriptionFormState}
          setSubscriptionFormState={setSubscriptionFormState}
          title='Select Quantity'
        />
      )}
      {currentStep === 4 && (
        <ButtonForm
          step={4}
          setCurrentStep={setCurrentStep}
          values={['Bi-Weekly', 'Monthly']}
          formKey='frequency'
          subscriptionFormState={subscriptionFormState}
          setSubscriptionFormState={setSubscriptionFormState}
          title='Select Frequency'
        />
      )}
      {currentStep === 5 && <SubscriptionSummary subscriptionPrice={subscriptionPrice} subscriptionFormState={subscriptionFormState} />}
    </StyledSubscriptionForm>
  );
}
