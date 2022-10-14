import Link from 'next/link';
import styled from 'styled-components';
import { config } from '../../styles/GlobalStyles';

const Button = styled.button`
  text-align: center;
  font-weight: var(--fw-bold);
  background-color: transparent;
  color: hsl(var(--color-neutral-1000));
  border: hsl(var(--color-neutral-1000)) 2px solid;
  padding: 0.75em 1.75em;
  border-radius: var(--br);
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 200ms ease;

  &:hover {
    background-color: hsl(var(--color-primary));
    color: hsl(var(--color-white));
  }
`;

export default function PrimaryButton({ id, isLink, children, onClick, href, className }) {
  if (isLink) {
    return (
      <Link href={href}>
        <Button onClick={onClick} className={className} as='a'>
          {children}
        </Button>
      </Link>
    );
  }

  return (
    <Button id={id} className={className} onClick={onClick}>
      {children}
    </Button>
  );
}
