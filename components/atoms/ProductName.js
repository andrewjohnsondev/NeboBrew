import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const ProductName = styled.h1`
  font-weight: var(--fw-black);
  font-size: var(--text-3xl);

  @media (min-width: ${config.med}) {
    font-size: var(--text-4xl);
  }
`;

export default ProductName;
