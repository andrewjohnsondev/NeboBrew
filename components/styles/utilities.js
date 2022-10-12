import styled from 'styled-components';
import { config } from './GlobalStyles';

export const Wrapper = styled.div`
  max-width: 70rem;
  width: 100%;
  margin-inline: auto;
  padding-inline: 1.25rem;
`;

export const Section = styled.section`
  padding-block: 4rem;

  @media (min-width: ${config.lg}) {
    padding-block: 5rem;
  }
`;
