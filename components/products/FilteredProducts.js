import styled from 'styled-components';
import SectionTitle from '../atoms/SectionTitle';
import Product from './Product';
import { Section, Wrapper } from '../styles/utilities';
const FilteredLayout = styled.div`
  & > * + * {
    margin-top: 4rem;
  }
`;
const StyledFilteredProducts = styled.section`
  .productGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2.5rem;
  }

  h2 {
    margin-bottom: 2rem;
  }
`;
export default function FilteredProducts({ products, query }) {
  const queryArr = query.roast.split('&').map((item) => item + 'Roast');
  let productsArr = [];
  queryArr.forEach((item) => {
    if (products[item]) productsArr.push({ name: products[item][0].roast, products: products[item] });
  });

  return (
    <Section>
      <Wrapper>
        <FilteredLayout>
          {productsArr.map((item) => (
            <StyledFilteredProducts key={item.name}>
              <h2>{item.name}</h2>
              <div className='productGrid'>
                {item.products.map((prod, index) => (
                  <Product priority={index === 0} key={prod.name} product={prod} />
                ))}
              </div>
            </StyledFilteredProducts>
          ))}
        </FilteredLayout>
      </Wrapper>
    </Section>
  );
}
