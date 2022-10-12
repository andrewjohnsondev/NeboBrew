import styled from 'styled-components';

const StyledCartCount = styled.p`
  font-size: var(--text-xl);
  color: hsl(var(--color-neutral-900));
`;

export default function CartCount({ count = 0 }) {
  return <StyledCartCount>{count}</StyledCartCount>;
}
