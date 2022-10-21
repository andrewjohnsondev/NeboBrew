import formatMoney from '../../../lib/helpers/formatMoney';
import axios from 'axios';
import styled from 'styled-components';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import { useState } from 'react';
import { config } from '../../styles/GlobalStyles';
import ItemDisplay from './ItemDisplay';
import { format } from 'date-fns';

const StyledSubscriptionItem = styled.li`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  border-radius: var(--br);

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    .price {
      font-size: var(--text-xl);
      font-weight: var(--fw-bold);
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

  .ordered {
    display: none;
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

  ul {
    list-style: none;
    padding: 0;
    margin-top: 1.5rem;
  }

  .details {
    margin-top: 1rem;
    &__container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
      grid-column-gap: 7rem;
      grid-row-gap: 1rem;
      margin-top: 0.5rem;

      .category {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }

  @media (min-width: ${config.med}) {
    padding: 2rem;

    .order:last-child {
      display: none;
    }
    .price {
      font-size: var(--text-2xl);
    }

    .ordered {
      display: block;
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

function OrderItem({ item }) {
  console.log(item);
  const [isExpanded, setIsExpanded] = useState(false);
  const { _id, orderCreated, orderItems, orderNumber, orderPrice, shippingAddress } = item;
  const data = item.orderItems.map((product) => {
    return {
      product: product.product.name,
      texture: product.texture,
      roast: product.product.roast,
      quantity: product.quantity,
      price: formatMoney(product.product.price),
    };
  });
  const handleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <StyledSubscriptionItem>
      <Accordion>
        <AccordionItem dangerouslySetExpanded={isExpanded}>
          <AccordionItemHeading onClick={handleExpansion}>
            <AccordionItemButton className='header'>
              <p className='price'>{formatMoney(orderPrice)}</p>
              <p className='category ordered'>
                Ordered: <span>{format(new Date(orderCreated), 'MMM dd, yyyy')}</span>
              </p>
              <p className='category'>
                Status: <span className='canceled pill'>Processing</span>
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
                Order#: <span>{orderNumber}</span>
              </p>
              <p className='category order'>
                Ordered: <span>{format(new Date(orderCreated), 'MMM dd, yyyy')}</span>
              </p>
            </div>
            <ul>
              {item.orderItems.map((order) => (
                <ItemDisplay order={order} key={order.product._id + order.texture} />
              ))}
            </ul>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </StyledSubscriptionItem>
  );
}
export default OrderItem;
