import Cta from '../../components/cta/Cta';
import Hero from '../../components/hero/Hero';
import Subscription from '../../components/Subscription';
import { gql } from '@apollo/client';
import client from '../../apollo-client';
import formatMoney from '../../lib/helpers/formatMoney';

export default function index({ subscriptionPrice }) {
  return (
    <>
      <Hero title='Subscription' subheading='Join the club and stop worrying about buying coffee. Hassle free deleveries at a discounted rate.' />
      <Subscription subscriptionPrice={subscriptionPrice} />
      <Cta />
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        allSubscriptionPrices {
          basePrice
        }
      }
    `,
  });

  return {
    props: {
      subscriptionPrice: formatMoney(data.allSubscriptionPrices[0].basePrice),
    },
  };
}
