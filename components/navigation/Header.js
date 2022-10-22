import styled from 'styled-components';
import Logo from '../atoms/Logo';
import AccountAndSearchNav from './AccountAndSearchNav';
import { useEffect, useState } from 'react';
import { Wrapper } from '../styles/utilities';
import PrimaryNav from './PrimaryNav';
import Search from '../Search/Search';
import Hamburger from '../atoms/Hamburger';
import useRouterListen from '../../lib/hooks/useRouterListen';
import MobileSearch from './MobileSearch';

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
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
  console.log(isSearchOpen);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  useRouterListen(() => {
    setIsSearchOpen(false);
    setIsMobileNavOpen(false);
  });

  useEffect(() => {
    if (isSearchOpen) document.body.classList.add('stop-scroll');
    if (!isSearchOpen) document.body.classList.remove('stop-scroll');
  }, [isSearchOpen, isMobileNavOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
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
            <Hamburger isOpen={isMobileNavOpen} onHamburgerClick={() => setIsMobileNavOpen((state) => !state)} />
            <Logo />
            <PrimaryNav isOpen={isMobileNavOpen} />
            <AccountAndSearchNav setIsSearchOpen={setIsSearchOpen} isSearchOpen={isSearchOpen} />
          </StyledHeaderInner>
        </Wrapper>
        <Search isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      </div>
      <MobileSearch setIsSearchOpen={setIsSearchOpen} isSearchOpen={isSearchOpen} />
    </StyledHeader>
  );
}
