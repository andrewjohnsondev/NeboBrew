import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import FilterSelect from '../../atoms/FilterSelect';
import SecondaryButton from '../../atoms/buttons/SecondaryButton';
import StyledFilter from './StyledFilter';

export default function Filter() {
  const [query, setQuery] = useState([]);
  const router = useRouter();
  const mobileFilterMenu = useRef();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    if (query) router.push(`/coffee?roast=${query.join('%26')}`);
    if (!query) router.push(`/coffee`);
  }, [query]);

  return (
    <StyledFilter>
      <div ref={mobileFilterMenu} className={`filter-links  ${isFilterOpen ? 'open' : ''}`}>
        <button onClick={handleFilterMenu} className='close'>
          <img src='/assets/close.svg' alt='close' />
        </button>
        <h2>Filter</h2>
        <FilterSelect query={query} setQuery={setQuery} href='light' title='Light Roast' />
        <FilterSelect query={query} setQuery={setQuery} href='medium' title='Medium Roast' />
        <FilterSelect query={query} setQuery={setQuery} href='dark' title='Dark Roast' />
        <SecondaryButton onClick={handleFilterMenu} className='done'>
          Apply
        </SecondaryButton>
      </div>

      <SecondaryButton onClick={handleFilterMenu} className='filter-button'>
        Filter
      </SecondaryButton>
    </StyledFilter>
  );
}
