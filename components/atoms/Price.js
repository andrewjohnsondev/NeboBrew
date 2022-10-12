import styled from 'styled-components';
import formatMoney from '../../lib/helpers/formatMoney';

const StyledPrice = styled.p`
  font-weight: var(--fw-bold);
  color: hsl(var(--color-neutral-1000));
  font-size: var(--text-lg);
`;

export default function Price({ price }) {
  return <StyledPrice>{formatMoney(price)}</StyledPrice>;
}
