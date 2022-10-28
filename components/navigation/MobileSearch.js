import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';
const StyledMobileSearch = styled.div`
  overflow-x: hidden;
  button {
    color: white;
    font-size: var(--text-xl);
    cursor: pointer;
    font-weight: var(--fw-bold);
    padding-block: 1rem;
    border: solid 1px hsl(var(--color-neutral-1000));
    background-color: hsl(var(--color-neutral-1000));
    transform: ${({ isSearchOpen }) => (isSearchOpen ? 'translateX(85%)' : 'translateX(0%)')};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    transition: transform 200ms ease-in-out;

    span {
      pointer-events: none;
    }
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
    console.log('clicked');
    setIsSearchOpen((state) => {
      return !state;
    });
  };
  return (
    <StyledMobileSearch id='searchText' isSearchOpen={isSearchOpen}>
      <button id='search' onClick={handleSearchOpen}>
        <span className='close'>X</span>
        <span className='search'>Search</span>
      </button>
    </StyledMobileSearch>
  );
}
export default MobileSearch;
