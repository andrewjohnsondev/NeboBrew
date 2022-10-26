import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const StyledHamburger = styled.button`
  display: grid;
  gap: 6px;
  position: relative;
  cursor: pointer;
  padding: 1em;
  background-color: transparent;
  border: none;
  z-index: 999999;
  transition: transform 200ms ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};

  .line:first-child {
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
  }
  .line:last-child {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg) translate(-0.5em)' : 'rotate(0) translate(0)')};
  }

  .line {
    width: 2em;
    height: 3px;
    background-color: hsl(var(--color-neutral-1000));
    transition: transform 250ms ease-in-out, opacity 100ms linear;
  }

  @media (min-width: ${config.med}) {
    display: none;
  }
`;

function Hamburger({ isOpen, onClick }) {
  return (
    <StyledHamburger onClick={onClick} isOpen={isOpen}>
      <span className='line'></span>
      <span className='line'></span>
      <span className='line'></span>
    </StyledHamburger>
  );
}
export default Hamburger;
