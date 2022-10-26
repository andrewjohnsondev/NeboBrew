import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';
const StyledMobileSearch = styled.button`
  border: solid 1px hsl(var(--color-neutral-1000));
  background-color: hsl(var(--color-neutral-1000));
  color: white;
  display: flex;
  justify-content: center;
  font-size: var(--text-xl);
  align-items: center;
  cursor: pointer;
  font-weight: var(--fw-bold);
  padding-block: 1rem;

  margin-left: auto;
  transform: ${({ isSearchOpen }) => (isSearchOpen ? 'translateX(85%)' : 'translateX(0%)')};
  width: 100%;
  transition: transform 250ms ease-in-out;

  p {
    pointer-events: none;
    display: flex;
    justify-content: center;
    transition: width 600ms ease-in-out;
  }

  .close {
    opacity: ${({ isSearchOpen }) => (isSearchOpen ? '1' : '0')};
    transition: opacity 200ms ease-in-out;
    position: absolute;
    width: 15%;
    left: 0;
    color: white;
  }
  .search {
    opacity: ${({ isSearchOpen }) => (isSearchOpen ? '0' : '1')};
    transition: opacity 200ms ease-in-out;
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
