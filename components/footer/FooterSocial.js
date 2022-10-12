import FooterCategoryTitle from './FooterCategoryTitle';
import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const StyledFooterSocials = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .socials {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  a {
    cursor: pointer;
  }

  @media (min-width: ${config.med}) {
    .socials {
      justify-content: space-between;
    }
  }
`;

export default function FooterSocial() {
  return (
    <StyledFooterSocials>
      <FooterCategoryTitle>Get Connected</FooterCategoryTitle>
      <div className='socials'>
        <a href='https://instagram.com' target='_blank' rel='noreferrer'>
          <img src='/assets/instagram.svg' alt='' />
        </a>
        <a href='https://facebook.com' target='_blank' rel='noreferrer'>
          <img src='/assets/facebook.svg' alt='' />
        </a>
        <a href='https://twitter.com' target='_blank' rel='noreferrer'>
          <img src='/assets/twitter.svg' alt='' />
        </a>
      </div>
    </StyledFooterSocials>
  );
}
