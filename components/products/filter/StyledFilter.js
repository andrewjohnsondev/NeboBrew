import styled from 'styled-components';
import { config } from '../../styles/GlobalStyles';

const StyledFilter = styled.section`
  background-color: hsl(var(--color-neutral-1000));
  padding-block: 1.5rem;
  display: flex;
  justify-content: center;

  .filter-links {
    display: flex;
    flex-direction: column;
    z-index: 9999;
    inset: 0;
    top: 10vh;
    padding-top: 10rem;
    gap: 2rem;
    background-color: hsl(var(--color-neutral-1000));
    position: fixed;
    padding-inline: 1rem;
    text-align: center;
    transform: translateX(100%);
    transition: all 500ms;

    h2 {
      color: hsl(var(--color-white));
      font-size: var(--text-3xl);
      text-transform: uppercase;
      margin-bottom: 1rem;
      letter-spacing: 1px;
    }
  }

  .filter-links.open {
    transform: translateX(0);
  }

  .filter-links.init {
    display: none;
  }

  .done {
    background-color: hsl(var(--color-white));
    color: hsl(var(--color-neutral-1000));
    margin-top: 1rem;
  }

  .close {
    position: absolute;
    top: 100px;
    right: 30px;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
  .filter-button {
    border-color: hsl(var(--color-white));
    color: hsl(var(--color-white));
    font-size: var(--text-sm);

    &:hover {
      background-color: hsl(var(--color-white));
      color: hsl(var(--color-neutral-1000));
    }
  }

  @media (min-width: ${config.med}) {
    .filter-button {
      display: none;
    }

    .filter-links {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: static;
      padding-top: 0;
      padding-block: 1rem;
      transform: translateX(0);
      gap: 4rem;
    }

    .done {
      display: none;
    }

    .close {
      display: none;
    }

    h2 {
      display: none;
    }
  }
`;

export default StyledFilter;
