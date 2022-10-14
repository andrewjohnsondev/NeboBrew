import SingleInput from '../atoms/SingleInput';
import { Wrapper } from '../styles/utilities';
import { useEffect, useState } from 'react';
import SearchItem from './SearchItem';
import useZustandStore from '../../store/zustandStore';
import { StyledSearch } from './SearchStyles';

function Search({ isSearchOpen, setIsSearchOpen }) {
  const products = useZustandStore((state) => state.products);
  const [value, setValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (value === '') return setFilteredList([]);
    console.log(value, filteredList);
    const filterProducts = products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()) || product.roast[0].toLowerCase().includes(value.toLowerCase()));
    setFilteredList(filterProducts);
  }, [value]);

  return (
    <StyledSearch className={isSearchOpen ? 'open' : ''}>
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
