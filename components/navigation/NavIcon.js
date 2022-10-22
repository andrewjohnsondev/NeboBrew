import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const StyledNavIcon = styled.button`
  background-image: url(${({ imageHref }) => imageHref});
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  padding: 1rem;
  position: relative;
  display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'block')};
  cursor: pointer;

  @media (min-width: ${config.med}) {
    display: ${({ hideOnDesktop }) => (hideOnDesktop ? 'none' : 'block')};
  }
`;

export default function NavIcon({ id, style, onClick, imageHref, hideOnMobile, hideOnDesktop }) {
  return <StyledNavIcon id={id} style={style} hideOnDesktop={hideOnDesktop} hideOnMobile={hideOnMobile} imageHref={imageHref} onClick={onClick} />;
}
