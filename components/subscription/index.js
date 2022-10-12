import { useState } from 'react';
import SubscriptionsForm from './SubscriptionForms';
import SubscriptionSteps from './SubscriptionSteps';

export default function Subscription({ subscriptionPrice }) {
  const [subscriptionFormState, setSubscriptionFormState] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <section>
      <SubscriptionSteps subscriptionFormState={subscriptionFormState} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <SubscriptionsForm
        subscriptionPrice={subscriptionPrice}
        subscriptionFormState={subscriptionFormState}
        setSubscriptionFormState={setSubscriptionFormState}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </section>
  );
}
