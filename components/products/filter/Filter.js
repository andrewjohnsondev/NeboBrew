import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import FilterSelect from '../../atoms/FilterSelect';
import SecondaryButton from '../../atoms/buttons/SecondaryButton';
import StyledFilter from './StyledFilter';

export default function Filter() {
  const [query, setQuery] = useState([]);
  const router = useRouter();
  const init = useRef(false);
  const mobileFilterMenu = useRef();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    mobileFilterMenu.current.classList.remove('init');
  });

  useEffect(() => {
    let queryArr;
    if (router.query.roast) {
      queryArr = router.query.roast.split('&');
      setQuery(queryArr);
    }
  }, [router.query.roast]);

  useEffect(() => {
    if (init.current && query.length === 0) {
      router.push('/coffee');
      return;
    }
    if (query.length === 0) {
      return;
    }

    if (router.query.roast) {
      if (router.query.roast === query.join('&')) {
        return;
      }
    }

    router.push(`/coffee?roast=${query.join('%26')}`);
  }, [query, router]);

  useEffect(() => {
    init.current = true;
  }, []);

  return (
    <StyledFilter>
      <div ref={mobileFilterMenu} className={`filter-links init ${isFilterOpen ? 'open' : ''}`}>
        <button onClick={handleFilterMenu} className='close'>
          <img src='/assets/close.svg' alt='close' />
        </button>
        <h2>Filter</h2>
        <FilterSelect query={query} setQuery={setQuery} href='light' title='Light Roast' />
        <FilterSelect query={query} setQuery={setQuery} href='medium' title='Medium Roast' />
        <FilterSelect query={query} setQuery={setQuery} href='dark' title='Dark Roast' />
        <SecondaryButton onClick={handleFilterMenu} className='done'>
          Done
        </SecondaryButton>
      </div>

      <SecondaryButton onClick={handleFilterMenu} className='filter-button'>
        Filter
      </SecondaryButton>
    </StyledFilter>
  );
}
