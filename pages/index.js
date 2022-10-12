import { gql } from '@apollo/client';
import client from '../apollo-client';
import { usePopular } from '../components/context/PopularProvider';
import HomeHero from '../components/hero/HomeHero';
import PopularFeature from '../components/products/PopularFeature';
import { Wrapper } from '../components/styles/utilities';
import { useEffect } from 'react';
import Cta from '../components/cta/Cta';

export default function Home({ heroImage, products }) {
  const { popular, setPopular } = usePopular();

  useEffect(() => {
    setPopular(products);
  }, []);
  return (
    <main>
      <HomeHero imageHref={heroImage} />
      <PopularFeature />
      <Cta />
    </main>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        photo: allPhotos(where: { title: { eq: "Hero Image" } }) {
          alt
          image {
            secure_url
          }
        }
      }
    `,
  });

  const { data: products } = await client.query({
    query: gql`
      query {
        allPopular {
          product {
            name
            roast
            price
            _id
            slug_regular_custom_input {
              current
            }
            image {
              alt
              image {
                secure_url
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      heroImage: data.photo[0].image.secure_url,
      products: products.allPopular,
    },
  };
}
