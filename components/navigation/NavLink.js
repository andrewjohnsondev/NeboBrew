import Link from 'next/link';
import styled from 'styled-components';

const StyledNavLink = styled.a`
  font-size: var(--text-lg);
  color: hsl(var(--color-neutral-8900));
`;

export default function NavLink({ href, children }) {
  return (
    <Link href={href}>
      <StyledNavLink>{children}</StyledNavLink>
    </Link>
  );
}
