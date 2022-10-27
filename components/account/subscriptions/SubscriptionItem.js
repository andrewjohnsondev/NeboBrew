import formatMoney from '../../../lib/helpers/formatMoney';
import axios from 'axios';
import styled from 'styled-components';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import { useEffect, useState } from 'react';
import { config } from '../../styles/GlobalStyles';
import usePrompt from '../../../lib/hooks/usePrompt';
import { TailSpin } from 'react-loader-spinner';
import { format } from 'date-fns';
const StyledSubscriptionItem = styled.li`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border-radius: var(--br);

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    .renew {
      display: none;
    }

    .price {
      font-size: var(--text-xl);
      font-weight: var(--fw-bold);
      display: flex;
      align-items: center;
      gap: 0.3rem;

      span {
        font-size: var(--text-xs);
        color: hsl(var(--color-neutral-400));
      }
    }

    .carrot {
      border: none;
      background: transparent;
      font-size: 1rem;
      cursor: pointer;
      transition: transform 150ms ease-in-out;
    }

    .up {
      transform: rotate(180deg);
    }
  }

  .category {
    font-size: var(--text-sm);
    color: hsl(var(--color-neutral-400));
    display: flex;
    align-items: center;
    gap: 0.25rem;

    span {
      color: hsl(var(--color-neutral-900));
      font-weight: bold;
    }
  }

  .no-renew {
    letter-spacing: 2px;
  }

  .panel {
    border-top: solid 1px hsl(var(--color-neutral-200));
    padding-top: 1rem;
    margin-top: 1rem;
  }

  .pill {
    padding: 0.15em 1em;
    background-color: var(--bg);
    color: var(--fg);
    border-radius: 100vw;
    font-size: var(--text-xs);
    font-weight: var(--fw-bold);
  }

  .active {
    --fg: #0ac929;
    --bg: #c6fdcf;
  }

  .canceled {
    --fg: hsl(var(--color-neutral-1000));
    --bg: hsl(var(--color-neutral-100));
  }

  .details {
    margin-top: 1rem;
    &__container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
      grid-column-gap: 7rem;
      grid-row-gap: 2rem;
      margin-top: 1rem;

      .category {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }

  .btn {
    display: grid;
    place-items: center;
    padding: 0.75em 1.75em;
    border-radius: var(--br);
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 200ms ease;
    font-size: 0.75rem;
    margin-top: 3rem;
    background-color: hsl(var(--color-neutral-100));
    font-weight: var(--fw-black);
    border: none;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  }

  @media (min-width: ${config.med}) {
    .price {
      font-size: var(--text-2xl);
    }

    .header {
      .renew {
        display: block;
      }
    }

    .panel {
      .renew {
        display: none;
      }
    }

    .details {
      &__container {
        grid-template-columns: max-content 1fr;
      }
    }
  }
`;

function SubscriptionItem({ item, refetchSubscriptions }) {
  const { active, roast, subscriptionId, texture, _id, quantity, shippingAddress, subscriptionPrice, nextCharge } = item;
  const [isExpanded, setIsExpanded] = useState(false);
  const { setPromptOpen, reset, setQuestion, answer } = usePrompt();
  const [clickedOnItem, setClickedOnItem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubscriptionCancel = async (e) => {
    setQuestion('Are you sure you want to cancel your subscription?');
    setClickedOnItem(e.target.dataset.id);
    setPromptOpen(true);
  };

  useEffect(() => {
    setLoading(false);
  }, [item]);

  useEffect(() => {
    const cancelSubscription = async () => {
      const { data } = await axios.post('/api/stripe/cancelSubscription', {
        id: _id,
        subscriptionId,
      });
      if (data.status === 'canceled') {
        refetchSubscriptions();
      }
    };
    if (answer && clickedOnItem === _id) {
      cancelSubscription();
      setLoading(true);
      reset();
    }
  }, [answer, clickedOnItem, reset, _id, subscriptionId, refetchSubscriptions]);

  return (
    <StyledSubscriptionItem>
      <Accordion>
        <AccordionItem dangerouslySetExpanded={isExpanded}>
          <AccordionItemHeading onClick={handleExpansion}>
            <AccordionItemButton className='header'>
              <p className='price'>
                {formatMoney(subscriptionPrice)} <span>/monthly</span>
              </p>
              <p className='category renew'>
                Renews: <span className={!active && 'no-renew'}>{active ? format(new Date(nextCharge), 'MMM dd, yyyy') : '----'}</span>
              </p>
              <p className='category'>
                Status: <span className={active ? 'pill active' : 'canceled pill'}>{active ? 'Active' : 'Canceled'}</span>
              </p>
              <button className={`carrot ${isExpanded && 'up'}`}>
                <img src='/assets/down.svg' alt='' />
              </button>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className='panel'>
            <div className='details__container'>
              <p className='category'>
                Address: <span className='address'>{shippingAddress}</span>
              </p>
              <p className='category'>
                Texture: <span>{texture}</span>
              </p>
              <p className='category'>
                Roast: <span>{roast}</span>
              </p>
              <p className='category'>
                Quantity: <span>{quantity}</span>
              </p>
              <p className='category renew'>
                Renews: <span className={!active && 'no-renew'}>{active ? format(new Date(nextCharge), 'MMM dd, yyyy') : '----'}</span>
              </p>
            </div>
            {active && (
              <button data-id={_id} onClick={handleSubscriptionCancel} className='btn'>
                {loading ? <TailSpin height={18} width={18} color='#333' /> : 'cancel'}
              </button>
            )}
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </StyledSubscriptionItem>
  );
}
export default SubscriptionItem;
