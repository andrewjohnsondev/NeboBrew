import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const HeroSubheading = styled.p`
  font-size: var(--text-base);
  color: hsl(var(--color-primary-200));
  opacity: 0.6;
  max-width: 45ch;
  margin-inline: auto;
  margin-top: 1rem;

  @media (min-width: ${config.med}) {
    font-size: var(--text-2xl);
  }
`;

export default HeroSubheading;
