import styled from 'styled-components';
import Logo from '../atoms/Logo';
import AccountAndSearchNav from './AccountAndSearchNav';
import { useEffect, useState } from 'react';

import { Wrapper } from '../styles/utilities';
import PrimaryNav from './PrimaryNav';
import NavIcon from './NavIcon';
import Search from '../Search/Search';

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 99999;

  .header__inner {
    background-color: white;
    display: flex;
    align-items: center;
    min-height: 10vh;
    padding-block: 1.75em;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;
const StyledHeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (isSearchOpen) document.body.classList.add('stop-scroll');
    if (!isSearchOpen) document.body.classList.remove('stop-scroll');
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      console.log(e);
      e.key === 'Escape' && setIsSearchOpen(false);
    };

    if (isSearchOpen) {
      document.body.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.removeEventListener('keydown', handleEsc);
    };
  }, [isSearchOpen]);
  return (
    <StyledHeader>
      <div className='header__inner'>
        <Wrapper>
          <StyledHeaderInner>
            <NavIcon hideOnDesktop={true} imageHref='/assets/hamburger.svg' />
            <Logo />
            <PrimaryNav />
            <AccountAndSearchNav setIsSearchOpen={setIsSearchOpen} isSearchOpen={isSearchOpen} />
          </StyledHeaderInner>
        </Wrapper>
        <Search isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      </div>
    </StyledHeader>
  );
}
