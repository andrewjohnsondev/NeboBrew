import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { config } from '../styles/GlobalStyles';
const display = keyframes`
from {
	opacity: 0;
}

to {
	opacity: 1;
}
`;

const Modal = styled.div`
  background-color: hsl(var(--color-white));
  padding: 1.5rem;
  min-width: 175px;
  border-radius: var(--br);
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1.25rem;
  position: absolute;
  opacity: 0;
  animation: ${display} 0.35s forwards ease;
  top: 100%;
  right: 0;

  .name {
    font-weight: var(--fw-bold);
  }

  .email {
    font-size: var(--text-sm);
    margin-bottom: 0.5rem;
  }
`;

export default Modal;
