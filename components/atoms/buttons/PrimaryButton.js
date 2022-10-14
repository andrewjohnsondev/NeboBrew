import Link from 'next/link';
import styled from 'styled-components';
import { config } from '../../styles/GlobalStyles';

const Button = styled.button`
  text-align: center;
  font-weight: var(--fw-bold);
  background-color: hsl(var(--color-neutral-1000));
  color: hsl(var(--color-white));
  padding: 0.75em 1.75em;
  border: transparent;
  border-radius: var(--br);
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 200ms ease;

  &:hover {
    background-color: hsl(var(--color-neutral-1000), 0.8);
  }
`;

export default function PrimaryButton({ id, isLink, children, onClick, href, className, type }) {
  if (isLink) {
    return (
      <Link href={href}>
        <Button className={className} as='a'>
          {children}
        </Button>
      </Link>
    );
  }

  return (
    <Button id={id} type={type} className={className} onClick={onClick}>
      {children}
    </Button>
  );
}
