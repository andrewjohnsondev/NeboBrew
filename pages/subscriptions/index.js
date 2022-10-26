import Cta from '../../components/cta/Cta';
import Hero from '../../components/hero/Hero';
import Subscription from '../../components/Subscription';
import { gql } from '@apollo/client';
import client from '../../apollo-client';
import formatMoney from '../../lib/helpers/formatMoney';
import Head from 'next/head';

export default function index({ plans }) {
  return (
    <>
      <Head>
        <title>Coffee | Subscriptions</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Hero
        title='Subscription'
        subheading='Join the club and stop worrying about buying coffee. Hassle free deleveries at a discounted rate.'
        bulletList={['Freshly Roasted Beans', 'Great Taste', 'Monthly Variety']}
      />
      <Subscription subscriptionPlans={plans} />
      <Cta />
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        allSubscriptionPlans {
          name
          price
          discount
          quantity
        }
      }
    `,
  });

  return {
    props: {
      plans: data.allSubscriptionPlans,
    },
  };
}
