import { useLazyQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SubscriptionList from '../../components/account/subscriptions/SubscriptionList';
import { useAuth } from '../../components/context/Auth';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';
import EmptyState from '../../components/atoms/EmptyState';
import Head from 'next/head';
const StyledSubscriptions = styled.section`
  background-color: hsl(var(--color-neutral-100));
  padding: 4rem 1rem;
  min-height: 100%;
  flex: 1;

  &.loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: var(--text-4xl);
  }
`;

const getSubscription = gql`
  query allSubscriptions($email: String) {
    allSubscriptions(where: { email: { eq: $email } }) {
      _id
      subscriptionCreated
      stripeDate
      name
      email
      orderNumber
      subscriptionPrice
      stripeUser
      subscriptionId
      texture
      roast
      quantity
      active
      shippingAddress
      nextCharge
    }
  }
`;
function Subscriptions() {
  const { user, loadingUser } = useAuth();
  const router = useRouter();
  const [fetchSubscriptions, { called, loading, data, startPolling, stopPolling }] = useLazyQuery(getSubscription, { pollInterval: 500 });

  const refetchSubscriptions = () => {
    startPolling(500);
  };

  useEffect(() => {
    stopPolling();
  }, [data, stopPolling]);

  useEffect(() => {
    if (user) {
      fetchSubscriptions({
        variables: {
          email: user.email,
        },
      });
    }
  }, [user, fetchSubscriptions]);
  useEffect(() => {
    if (!user && !loadingUser) {
      router.push('/account/login');
    }
  }, [user, loadingUser, router]);

  if (data) {
    return (
      <>
        <Head>
          <title>Nebo Brew | Subscriptions</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <StyledSubscriptions className='bg-pattern-light'>
          <h2>Subscriptions</h2>
          {data.allSubscriptions.length > 0 ? (
            <SubscriptionList refetchSubscriptions={refetchSubscriptions} data={data.allSubscriptions} />
          ) : (
            <EmptyState linkUrl={'/subscriptions'} action='Create One' message="You don't have any subscriptions..." />
          )}
        </StyledSubscriptions>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Nebo Brew | Subscriptions</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <StyledSubscriptions className='bg-pattern-light loader-container'>
        <h2>Subscriptions</h2>
        {called && loading && <TailSpin className='tail-spin' height={72} width={72} color='#333' />}
      </StyledSubscriptions>
    </>
  );
}
export default Subscriptions;
