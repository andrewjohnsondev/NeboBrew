import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const SubheadingSmall = styled.p`
  font-size: var(--text-lg);
  color: hsl(var(--color-neutral-800));
  text-align: center;

  @media (min-width: ${config.med}) {
    font-size: var(--text-xl);
    text-align: left;
  }
  @media (min-width: ${config.lg}) {
    font-size: var(--text-2xl);
  }
`;

export default SubheadingSmall;
