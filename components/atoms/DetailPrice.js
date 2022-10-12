import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const DetailPrice = styled.p`
  font-size: var(--text-xl);

  @media (min-width: ${config.med}) {
    font-size: var(--text-2xl);
  }
`;

export default DetailPrice;
