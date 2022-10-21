import styled from 'styled-components';
import { keyframes } from 'styled-components';
const display = keyframes`
from {
	opacity: 0;
}

to {
	opacity: 1;
}
`;

export const PromptBody = styled.div`
  padding: 2rem 1.5rem;
  display: grid;
  place-items: center;
  font-size: var(--text-lg);
`;
export const PromptFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  background-color: black;
  border-bottom-left-radius: var(--br);
  border-bottom-right-radius: var(--br);
  background-color: hsl(var(--color-neutral-100));
`;

const Prompt = styled.div`
  background-color: hsl(var(--color-white));
  min-width: 175px;
  border-radius: var(--br);
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  opacity: 0;
  animation: ${display} 0.35s forwards ease;
  top: 100%;
  right: 0;
`;

export default Prompt;
