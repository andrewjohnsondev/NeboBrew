import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';
import Link from 'next/link';

const StyledLogo = styled.a`
  font-weight: var(--fw-black);
  font-size: var(--text-xl);
  color: hsl(var(--color-neutral-1000));
  text-decoration: none;

  @media (min-width: ${config.med}) {
    font-size: var(--text-2xl);
  }
`;

export default function NeboBrew() {
  return (
    <Link href='/'>
      <StyledLogo href='/'>NEBO BREW</StyledLogo>
    </Link>
  );
}
