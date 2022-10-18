import { useReducer, useState } from 'react';
import SubscriptionsForm from './SubscriptionForms';
import SubscriptionSteps from './SubscriptionSteps';
import { useAuth } from '../context/Auth';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ROAST':
      return { ...state, roast: action.payload };
    case 'TEXTURE':
      return { ...state, texture: action.payload };
    case 'PRICE':
      return { ...state, price: action.payload };
    case 'QUANTITY':
      return { ...state, quantity: action.payload };
    case 'RESET':
      return { texture: null, roast: null, quantity: null, price: null };
    default:
      return { ...state };
  }
};

export default function Subscription({ subscriptionPlans }) {
  const [subscriptionState, dispatch] = useReducer(reducer, {
    texture: null,
    roast: null,
    price: null,
    quantity: null,
  });

  const [currentStep, setCurrentStep] = useState(1);

  return (
    <section>
      <SubscriptionSteps dispatch={dispatch} subscriptionState={subscriptionState} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <SubscriptionsForm subscriptionPlans={subscriptionPlans} subscriptionState={subscriptionState} dispatch={dispatch} currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </section>
  );
}
