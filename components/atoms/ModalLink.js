import Link from 'next/link';
import styled from 'styled-components';
const StyledModalLink = styled.a`
  color: hsl(var(--color-neutral-1000));
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: var(--fw-bold);
`;

export default function ModalLink({ href, text }) {
  return (
    <Link href={href}>
      <StyledModalLink>{text}</StyledModalLink>
    </Link>
  );
}
