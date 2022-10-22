import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';
import NavIcon from './NavIcon';
const StyledMobileSearch = styled.button`
  border: none;
  background-color: hsl(var(--color-primary-300));
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  font-size: var(--text-xl);
  align-items: center;
  cursor: pointer;
  font-weight: var(--fw-bold);
  padding-block: 1rem;
  z-index: -1;
  margin-left: auto;
  width: ${({ isSearchOpen }) => (isSearchOpen ? '15%' : '100%')};
  transition: width 250ms ease-in-out;

  img,
  span {
    display: ${({ isSearchOpen }) => (isSearchOpen ? 'none' : 'block')};
  }

  .close {
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    margin-right: auto;
    margin-left: 1.5rem;
    opacity: ${({ isSearchOpen }) => (isSearchOpen ? '100%' : '0%')};
    transition: opacity 200ms ease-in-out;
    cursor: pointer;
  }

  span {
    margin-right: auto;
  }

  @media (min-width: ${config.med}) {
    display: none;
  }
`;

function MobileSearch({ setIsSearchOpen, isSearchOpen }) {
  const handleSearchOpen = () => {
    setIsSearchOpen((state) => {
      return !state;
    });
  };
  return (
    <StyledMobileSearch isSearchOpen={isSearchOpen} onClick={handleSearchOpen}>
      <p className='close'>X</p>
      <img src='/assets/search.svg' alt='' />
      <span>Search</span>
    </StyledMobileSearch>
  );
}
export default MobileSearch;
