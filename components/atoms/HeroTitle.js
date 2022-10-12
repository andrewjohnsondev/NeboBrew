import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const HeroTitle = styled.h1`
  color: hsl(var(--color-white));
  font-size: var(--text-3xl);
  font-weight: var(--fw-black);
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (min-width: ${config.med}) {
    font-size: var(--text-4xl);
  }
`;

export default HeroTitle;
