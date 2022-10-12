import styled from 'styled-components';
import { keyframes } from 'styled-components';

const show = keyframes`

from {
	opacity: 0;
}

to {
	opacity: 1;
}
`;

const StyledFormSuccess = styled.div`
  position: absolute;
  display: ${({ isShown }) => (isShown ? 'grid' : 'none')};
  inset: 0;
  background-color: hsl(var(--color-success));
  place-content: center;
  gap: 1rem;
  justify-items: center;
  border-radius: var(--br);
  z-index: 999;
  animation: ${show} 350ms ease forwards;

  p {
    font-size: var(--text-xl);
  }

  .email {
    font-weight: var(--fw-bold);
  }
`;

export default function FormSuccess({ isShown, children }) {
  return <StyledFormSuccess isShown={isShown}>{children}</StyledFormSuccess>;
}
