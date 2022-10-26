import { gql } from '@apollo/client';
import Head from 'next/head';
import client from '../../apollo-client';
import Cta from '../../components/cta/Cta';
import ProductDetail from '../../components/products/ProductDetail';

export default function ProductPage({ product }) {
  return (
    <>
      <Head>
        <title>Coffee | Nebo Brew {product.name}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <main>
        <ProductDetail product={product} />
        <Cta />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        allProduct {
          slug_regular_custom_input {
            current
          }
        }
      }
    `,
  });

  const paths = data.allProduct.map((product) => ({
    params: {
      slug: product.slug_regular_custom_input.current,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
		  query {
  allProduct (where: {slug_regular_custom_input: {current: {eq: "${params.slug}"} } }) {
    name
    description
    _id
    slug_regular_custom_input {
      current
    }
    roast
    price
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
      product: data.allProduct[0],
    },
  };
}
