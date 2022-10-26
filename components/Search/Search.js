import SingleInput from '../atoms/SingleInput';
import { Wrapper } from '../styles/utilities';
import { useEffect, useState, useRef } from 'react';
import SearchItem from './SearchItem';
import useZustandStore from '../../store/zustandStore';
import { StyledSearch } from './SearchStyles';
import { gql, useLazyQuery } from '@apollo/client';
import useMenuInit from '../../lib/hooks/useMenuInit';
import useClickOutside from '../../lib/hooks/useClickOutside';
import useEventListener from '../../lib/hooks/useEventListener';

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

function Search({ isSearchOpen, setIsSearchOpen }) {
  const [getProducts, { loading, error, data }] = useLazyQuery(productsQuery);
  const products = useZustandStore((state) => state.products);
  const addProducts = useZustandStore((state) => state.addProducts);
  const [value, setValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [initMenu] = useMenuInit();
  const searchRef = useRef();
  useClickOutside(searchRef, (e) => {
    if (e.target.id === 'searchIcon') return;
    setIsSearchOpen(false);
  });
  useEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  });

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setValue('');
  }, [isSearchOpen]);

  useEffect(() => {
    if (data) {
      addProducts(data.allProduct);
    }
  }, [data, addProducts]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleClose = () => {
    setIsSearchOpen((state) => !state);
  };

  useEffect(() => {
    if (value === '') return setFilteredList([]);
    const filterProducts = products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()) || product.roast[0].toLowerCase().includes(value.toLowerCase()));
    setFilteredList(filterProducts);
  }, [value]);

  return (
    <StyledSearch ref={searchRef} initMenu={initMenu} className={isSearchOpen ? 'open' : ''}>
      <button onClick={handleClose} className='close'>
        X
      </button>
      <Wrapper className='inner-content'>
        <form onSubmit={handleFormSubmit}>
          <SingleInput onChange={handleInputChange} value={value} inputClass='inputClass' name='text' type='text' buttonText='Search' btnClass='btn' isSearchText />
        </form>
        {filteredList.length > 0 && (
          <div className='search-item-wrapper'>
            {filteredList.map((product) => (
              <SearchItem setIsSearchOpen={setIsSearchOpen} product={product} key={product._id} />
            ))}
          </div>
        )}
        {value !== '' && filteredList.length === 0 && <p className='no-results'>No results found...</p>}
      </Wrapper>
    </StyledSearch>
  );
}
export default Search;
