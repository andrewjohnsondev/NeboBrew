import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const BigTitle = styled.h1`
  font-size: var(--text-5xl);
  font-weight: var(--fw-black);
  text-transform: uppercase;
  text-align: center;

  @media (min-width: ${config.med}) {
    font-size: var(--text-6xl);
    text-align: left;
  }
  @media (min-width: ${config.lg}) {
    font-size: var(--text-7xl);
  }
`;

export default BigTitle;
