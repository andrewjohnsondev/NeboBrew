import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

export const StyledSearch = styled.div`
  background: hsl(var(--color-neutral-100));
  position: fixed;
  top: 10vh;
  padding-top: 3rem;
  width: 100%;
  max-height: 90vh;
  transform: translateY(-200%);
  transition: transform 350ms ease-in-out;
  z-index: -1;
  display: ${({ initMenu }) => (initMenu ? 'flex' : 'none')};
  flex-direction: column;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow-y: scroll;

  .open {
    transform: translateY(100%) !important;
  }

  .inner-content {
    padding-block: 5rem;
    overflow-y: auto;
  }

  .btn {
    background-color: hsl(var(--color-primary));
    color: white;
  }

  .close {
    background-color: transparent;
    border: none;
    font-size: var(--text-2xl);
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    display: none;
  }

  .search-item-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 3rem;
    max-width: 35rem;
    margin-inline: auto;
  }

  .no-results {
    max-width: 35rem;
    margin-inline: auto;
    margin-top: 3rem;
    font-size: var(--text-3xl);
    color: hsl(var(--color-neutral-1000));
    font-weight: var(--fw-bold);
  }

  .inputClass {
    background: none;
    border-bottom: solid 2px hsl(var(--color-neutral-300));
    border-radius: 0;

    &:focus-visible {
      outline: none;
    }
  }

  @media (min-width: ${config.med}) {
    padding-top: 0;
    .close {
      display: block;
    }
  }
`;
