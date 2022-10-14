import { gql } from '@apollo/client';
import client from '../../apollo-client';
import Cta from '../../components/cta/Cta';
import Products from '../../components/products/Products';
import styled from 'styled-components';
import Hero from '../../components/hero/Hero';
import { config } from '../../components/styles/GlobalStyles';
import Filter from '../../components/products/filter/Filter';
import { useRouter } from 'next/router';
import FilteredProducts from '../../components/products/FilteredProducts';

const StoreSection = styled.section`
  padding-bottom: 3rem;

  @media (min-width: ${config.med}) {
    padding-top: 2rem;
    padding-bottom: 4rem;
  }
`;

export default function Home({ lightRoast, mediumRoast, darkRoast }) {
  const { query } = useRouter();

  return (
    <main>
      <Hero title='Coffee roasted to perfection' />
      <Filter />

      {!query.roast && (
        <StoreSection>
          <Products priority={true} products={lightRoast} title='Light Roast' />
          <Products priority={true} products={mediumRoast} title='Medium Roast' />
          <Products priority={false} products={darkRoast} title='Dark Roast' />
        </StoreSection>
      )}

      {query.roast && <FilteredProducts query={query} products={{ lightRoast, mediumRoast, darkRoast }} />}

      <Cta />
    </main>
  );
}

export async function getStaticProps(context) {
  const { data } = await client.query({
    query: gql`
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
    `,
  });

  return {
    props: {
      lightRoast: data.allProduct.filter(({ roast }) => roast[0] === 'Light Roast'),
      mediumRoast: data.allProduct.filter(({ roast }) => roast[0] === 'Medium Roast'),
      darkRoast: data.allProduct.filter(({ roast }) => roast[0] === 'Dark Roast'),
    },
  };
}
