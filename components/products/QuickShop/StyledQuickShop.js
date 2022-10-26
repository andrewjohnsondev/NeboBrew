import styled from 'styled-components';
import { config } from '../../styles/GlobalStyles';

export const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;

  .title {
    font-size: var(--text-4xl);
  }

  .price {
    margin-top: 0.75rem;
    font-size: var(--text-xl);

    span {
      font-size: var(--text-sm);
    }
  }

  .roast {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
      font-size: var(--text-lg);
      color: hsl(var(--color-neutral-1000));
    }
  }

  .close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: var(--text-3xl);
    position: absolute;
    right: 15px;
    top: 5px;
  }

  .addBtn {
    margin-top: 1rem;
  }
`;

export const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const StyledModal = styled.div`
  background: white;
  width: 500px;
  border-radius: var(--br);
  padding: 1.75rem;
  position: relative;

  @media (min-width: ${config.med}) {
    padding: 2rem;
  }
`;
