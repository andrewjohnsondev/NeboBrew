import { useRef } from 'react';
import styled from 'styled-components';

const StyledSelect = styled.label`
  border: solid 1px hsl(var(--color-neutral-200));
  padding: 1rem;
  display: inline-block;
  border-radius: var(--br);
  text-transform: uppercase;
  font-size: var(--text-sm);
  cursor: pointer;

  &.active {
    border-color: hsl(var(--color-neutral-1000));
    border-width: 2px;
  }
`;

export default function Select({ name, value, text, checkedVal, defaultChecked }) {
  const inputRef = useRef();

  return (
    <StyledSelect className={checkedVal === value ? 'active' : ''}>
      <input defaultChecked={defaultChecked} ref={inputRef} className='sr-only' type='radio' value={value} name={name} />
      <span>{text}</span>
    </StyledSelect>
  );
}
