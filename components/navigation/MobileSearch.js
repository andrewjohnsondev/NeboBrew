import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';
const StyledMobileSearch = styled.button`
  border: none;
  background-color: hsl(var(--color-neutral-1000));
  color: white;
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
  transition: width 200ms ease-in-out;

  p {
    /* display: ${({ isSearchOpen }) => (isSearchOpen ? 'none' : 'block')}; */
    pointer-events: none;
    display: flex;
    justify-content: center;
  }

  .close {
    opacity: ${({ isSearchOpen }) => (isSearchOpen ? '1' : '0')};
    transition: opacity 200ms ease-in-out;
    position: absolute;
    margin-inline: auto;
    z-index: 9999999;
    color: white;
  }
  .search {
    opacity: ${({ isSearchOpen }) => (isSearchOpen ? '0' : '1')};
    transition: opacity 200ms ease-in-out;

    /* display: ${({ isSearchOpen }) => (isSearchOpen ? 'none' : 'block')}; */
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
    <StyledMobileSearch id='searchIcon' isSearchOpen={isSearchOpen} onClick={handleSearchOpen}>
      <p>
        <span className='close'>X</span>
        <span className='search'>Search</span>
      </p>
    </StyledMobileSearch>
  );
}
export default MobileSearch;
