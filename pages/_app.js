import PopularProvider from '../components/context/PopularProvider';
import Footer from '../components/footer/Footer';
import Header from '../components/navigation/Header';
import GlobalStyles from '../components/styles/GlobalStyles';
import { AuthUserProvider } from '../components/context/Auth';
import Toast from '../components/atoms/Toast';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import { CartProvider } from 'react-use-cart';
import Cart from '../components/Cart/Cart';
import QuickShop from '../components/products/QuickShop/QuickShop';
import styled from 'styled-components';
import PromptOverlay from '../components/prompt/PromptOverlay';
import { useEffect, useState } from 'react';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) document.body.classList.add('load');
  }, [loading]);
  return (
    <>
      <GlobalStyles />
      <ApolloProvider client={client}>
        <CartProvider>
          <AuthUserProvider>
            <FlexWrapper>
              <Header />
              <PopularProvider>
                <Component {...pageProps} />
              </PopularProvider>
              <Footer />
            </FlexWrapper>
            <Toast />
            <Cart />
            <QuickShop />
            <PromptOverlay />
          </AuthUserProvider>
        </CartProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
