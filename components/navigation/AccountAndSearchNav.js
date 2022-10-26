import styled from 'styled-components';
import CartCount from '../atoms/CartCount';
import { useEffect, useRef, useState } from 'react';
import HorizontalDivider from '../atoms/HorizontalDivider';
import NavIcon from './NavIcon';
import AccountModule from '../account/AccountModal';
import useZustandStore from '../../store/zustandStore';
import { useCart } from 'react-use-cart';
import useClickOutside from '../../lib/hooks/useClickOutside';

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

export default function AccountAndSearchNav({ accountOnClick, cartOnClick, cartCount, showAccountIcon, setIsSearchOpen, isSearchOpen }) {
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const toggleCartState = useZustandStore((state) => state.toggleCartState);
  const [total, setTotal] = useState(0);
  const { totalItems } = useCart();
  const modalRef = useRef();

  useClickOutside(modalRef, (e) => {
    if (e.target.id === 'account') return;
    setAccountModalOpen(false);
  });

  const handleSearchClick = () => {
    setIsSearchOpen((state) => !state);
  };

  useEffect(() => {
    setTotal(totalItems);
  }, [totalItems, setTotal]);

  return (
    <StyledAccountAndSearchNav>
      <NavIcon id='searchIcon' imageHref='/assets/search.svg' hideOnMobile={true} onClick={handleSearchClick} />
      <div className='account'>
        <NavIcon id='account' imageHref='/assets/account.svg' hideOnMobile={false} onClick={() => setAccountModalOpen((state) => !state)} />
        <AccountModule modalRef={modalRef} isOpen={accountModalOpen} />
      </div>
      <HorizontalDivider hideOnMobile={true} />
      <StyledCartWrapper>
        <NavIcon id='cartIcon' imageHref='/assets/cart.svg' onClick={() => toggleCartState()} />
        <CartCount count={total} />
      </StyledCartWrapper>
    </StyledAccountAndSearchNav>
  );
}
