import styled from 'styled-components';

const StyledQuantity = styled.div`
  border: solid 1px hsl(var(--color-neutral-200));
  border-radius: var(--br);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  width: 100%;

  .quantity-btn {
    background: none;
    border: none;
    padding: 0.75em 1em;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }

  .quantity-btn:first-child {
    border-right: solid 1px hsl(var(--color-neutral-200));
  }
  .quantity-btn:last-child {
    border-left: solid 1px hsl(var(--color-neutral-200));
  }
`;

function Quantity({ style, quantity, setQuantity }) {
  return (
    <StyledQuantity style={style}>
      <button
        onClick={() =>
          setQuantity((state) => {
            if (state === 1) return 1;
            return state - 1;
          })
        }
        className='quantity-btn'
      >
        &#x2212;
      </button>
      <span>{quantity}</span>
      <button
        onClick={() =>
          setQuantity((state) => {
            return state + 1;
          })
        }
        className='quantity-btn'
      >
        &#x2b;
      </button>
    </StyledQuantity>
  );
}
export default Quantity;
