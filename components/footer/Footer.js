import styled from 'styled-components';
import FooterCategory from './FooterCategory';
import FooterSocial from './FooterSocial';
import { config } from '../styles/GlobalStyles';
import { Wrapper } from '../styles/utilities';

const aboutLinks = [
  { name: 'About', href: '/about' },
  { name: 'Terms Of Service', href: '/terms' },
  { name: 'Privacy Policy', href: '/policy' },
];
const resourceLinks = [
  { name: 'Shipping', href: '/shipping' },
  { name: 'Product Source', href: '/product-source' },
];
const contactLinks = [
  { name: '(435) 813-2895', href: '/phone' },
  { name: 'Submit A Request', href: '/submit' },
];

const StyledFooter = styled.footer`
  background-color: hsl(var(--color-neutral-1000));
  color: hsl(var(--text-white));
  padding-block: 4rem;

  @media (min-width: ${config.lg}) {
    padding-block: 5rem;
  }

  .footer__content {
    display: grid;
    grid-template-columns: 1fr;

    gap: 3.5rem;
    text-align: center;
  }

  @media (min-width: ${config.med}) {
    .footer__content {
      grid-template-columns: 1fr 1fr;
      text-align: left;
      justify-items: center;
    }
  }
  @media (min-width: ${config.lg}) {
    .footer__content {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Wrapper>
        <div className='footer__content'>
          <FooterSocial />
          <FooterCategory title='About Us' links={aboutLinks} />
          <FooterCategory title='Other Resources' links={resourceLinks} />
          <FooterCategory title='Contact Us' links={contactLinks} />
        </div>
      </Wrapper>
    </StyledFooter>
  );
}
