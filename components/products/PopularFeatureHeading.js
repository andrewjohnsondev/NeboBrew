import SectionTitle from '../atoms/SectionTitle';
import styled from 'styled-components';
import SecondaryButton from '../atoms/buttons/SecondaryButton';
import { config } from '../styles/GlobalStyles';
import { routes } from '../../config';

const PopularWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a span {
    margin-left: 0.5rem;
  }

  .popular {
    display: none;
  }

  @media (min-width: ${config.med}) {
    .popular {
      display: block;
    }
  }
  @media (min-width: ${config.med}) {
    justify-content: space-between;
  }
`;

export default function PopularFeatureHeading() {
  return (
    <PopularWrapper>
      <SectionTitle>Popular</SectionTitle>
      <SecondaryButton href={routes.coffee} isLink={true} className='popular btn-md'>
        Shop All <span>&#x2192;</span>
      </SecondaryButton>
    </PopularWrapper>
  );
}
