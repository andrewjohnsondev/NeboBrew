import styled from 'styled-components';

export const StyledSearch = styled.div`
  background: hsl(var(--color-neutral-100));
  position: fixed;
  top: 10vh;
  max-height: 100vh;
  width: 100%;
  transform: translateY(-200%);
  transition: transform 350ms ease-in-out;
  z-index: -1;
  display: flex;
  flex-direction: column;

  .open {
    transform: translateY(100%) !important;
  }

  .inner-content {
    min-height: 100%;
    overflow-y: scroll;
    padding-block: 6rem;
  }

  .btn {
    background-color: hsl(var(--color-primary));
    color: white;
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
`;
