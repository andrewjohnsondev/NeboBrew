import styled from 'styled-components';
import CartCount from '../atoms/CartCount';
import { useEffect, useState } from 'react';
import HorizontalDivider from '../atoms/HorizontalDivider';
import NavIcon from './NavIcon';
import AccountModule from '../account/AccountModal';
import useZustandStore from '../../store/zustandStore';
import { useCart } from 'react-use-cart';
import { gql, useLazyQuery } from '@apollo/client';

const productsQuery = gql`
  query {
    allProduct {
      name
      _id
      slug_regular_custom_input {
        current
      }
      roast
      price
      description
      image {
        alt
        image {
          secure_url
        }
      }
    }
  }
`;

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
  const addProducts = useZustandStore((state) => state.addProducts);
  const { totalItems } = useCart();

  const [getProducts, { loading, error, data }] = useLazyQuery(productsQuery);
  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    getProducts();
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      addProducts(data.allProduct);
    }
  }, [data, addProducts]);

  return (
    <StyledAccountAndSearchNav>
      <NavIcon imageHref='/assets/search.svg' hideOnMobile={true} onClick={handleSearchClick} />
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
