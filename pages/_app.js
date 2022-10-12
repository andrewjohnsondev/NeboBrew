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

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <ApolloProvider client={client}>
        <CartProvider>
          <AuthUserProvider>
            <Header />
            <PopularProvider>
              <Component {...pageProps} />
            </PopularProvider>
            <Toast />
            <Footer />
            <Cart />
          </AuthUserProvider>
        </CartProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
