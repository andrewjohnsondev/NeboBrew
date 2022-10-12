import styled from 'styled-components';
import Logo from '../atoms/Logo';
import AccountAndSearchNav from './AccountAndSearchNav';

import { Wrapper } from '../styles/utilities';
import PrimaryNav from './PrimaryNav';
import NavIcon from './NavIcon';

const StyledHeader = styled.header`
  min-height: 10vh;
  display: flex;
  align-items: center;
  padding-block: 1.75em;
  position: sticky;
  top: 0;
  z-index: 99999;
  background-color: hsl(var(--color-white));
`;
const StyledHeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Wrapper>
        <StyledHeaderInner>
          <NavIcon hideOnDesktop={true} imageHref='/assets/hamburger.svg' />
          <Logo />
          <PrimaryNav />
          <AccountAndSearchNav />
        </StyledHeaderInner>
      </Wrapper>
    </StyledHeader>
  );
}
