import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const HorizontalDivider = styled.div`
  width: 2px;
  height: 24px;
  background: hsl(var(--color-neutral-300));
  display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : block)};

  @media (min-width: ${config.med}) {
    display: block;
  }
`;

export default HorizontalDivider;
