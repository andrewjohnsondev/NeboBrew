import { useLazyQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../components/context/Auth';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';
import EmptyState from '../../components/atoms/EmptyState';
import OrdersList from '../../components/account/orders/OrdersList';
import Head from 'next/head';
const StyledOrders = styled.section`
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

const getOrders = gql`
  query allOrders($email: String) {
    allOrders(where: { email: { eq: $email } }) {
      _id
      orderCreated
      stripeDate
      name
      orderNumber
      email
      orderPrice
      shippingAddress
      orderItems {
        quantity
        texture
        product {
          _id
          name
          price
          roast
          image {
            alt
            image {
              secure_url
            }
          }
        }
      }
    }
  }
`;
function Orders() {
  const { user, loadingUser } = useAuth();
  const router = useRouter();
  const [fetchOrders, { called, loading, data }] = useLazyQuery(getOrders);

  useEffect(() => {
    if (user) {
      fetchOrders({
        variables: {
          email: user.email,
        },
      }).then((data) => console.log(data));
    }
  }, [user, fetchOrders]);
  useEffect(() => {
    if (!user && !loadingUser) {
      router.push('/account/login');
    }
  }, [user, loadingUser, router]);

  if (data) {
    return (
      <>
        <Head>
          <title>Nebo Brew | Orders</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <StyledOrders className='bg-pattern-light'>
          <h2>Orders</h2>
          {data.allOrders.length > 0 ? <OrdersList data={data.allOrders} /> : <EmptyState linkUrl={'/coffee'} action='Create One' message="You don't have any orders..." />}
        </StyledOrders>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Nebo Brew | Orders</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <StyledOrders className='bg-pattern-light loader-container'>
        <h2>Orders</h2>
        {called && loading && <TailSpin className='tail-spin' height={72} width={72} color='#333' />}
      </StyledOrders>
    </>
  );
}
export default Orders;
