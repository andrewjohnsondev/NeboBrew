import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const StyledFilter = styled.a`
  text-decoration: none;
  font-size: var(--text-lg);
  font-weight: var(--fw-bold);
  cursor: pointer;
  padding: 1em 1em;
  border: solid 1px hsl(var(--color-neutral-800));
  border-right: none;
  border-left: none;
  color: hsl(var(--color-neutral-200));
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (min-width: ${config.med}) {
    background-color: hsl(var(--color-white));
    border-radius: var(--br);
    color: inherit;
    border: none;
    padding: 0.5em 1em;
  }

  input {
    pointer-events: none;
    display: grid;
    place-content: center;
  }

  input::before {
    content: '';
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em hsl(var(--color-primary));
  }

  input:checked::before {
    transform: scale(1);
  }
`;

export default function FilterSelect({ title, href, query, setQuery }) {
  const router = useRouter();
  const checkbox = useRef();
  const [checked, setCheck] = useState(false);
  const handleCheckboxClick = (e) => {
    e.preventDefault();
    setCheck((state) => !state);
  };

  useEffect(() => {
    if (query.length === 0 && !checked) return;
    checked ? setQuery((state) => [...state, href]) : setQuery((state) => state.filter((i) => i !== href));
  }, [checked, setQuery, href]);

  return (
    <StyledFilter onClick={handleCheckboxClick} href='/coffee'>
      {title} <input checked={checked} ref={checkbox} id='input' name='input' type='checkbox' />
    </StyledFilter>
  );
}
