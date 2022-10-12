import styled from 'styled-components';
import CartCount from '../atoms/CartCount';
import { useState } from 'react';
import HorizontalDivider from '../atoms/HorizontalDivider';
import NavIcon from './NavIcon';
import AccountModule from '../account/AccountModal';
import useZustandStore from '../../store/zustandStore';
import { useCart } from 'react-use-cart';

const StyledAccountAndSearchNav = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  .account {
    position: relative;
  }
`;

const StyledCartWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function AccountAndSearchNav({ searchOnClick, accountOnClick, cartOnClick, cartCount, showAccountIcon }) {
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const toggleCartState = useZustandStore((state) => state.toggleCartState);
  const { totalItems } = useCart();

  return (
    <StyledAccountAndSearchNav>
      <NavIcon imageHref='/assets/search.svg' hideOnMobile={true} onClick={searchOnClick} />
      <div onMouseLeave={() => setAccountModalOpen(false)} onMouseEnter={() => setAccountModalOpen(true)} className='account'>
        <NavIcon imageHref='/assets/account.svg' hideOnMobile={true} onClick={accountOnClick} />
        <AccountModule isOpen={accountModalOpen} />
      </div>
      <HorizontalDivider hideOnMobile={true} />
      <StyledCartWrapper>
        <NavIcon id='cartIcon' imageHref='/assets/cart.svg' onClick={() => toggleCartState()} />
        <CartCount count={totalItems} />
      </StyledCartWrapper>
    </StyledAccountAndSearchNav>
  );
}
