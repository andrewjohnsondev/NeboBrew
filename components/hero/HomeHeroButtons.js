import styled from 'styled-components';
import { routes } from '../../config';
import PrimaryButton from '../atoms/buttons/PrimaryButton';
import SecondaryButton from '../atoms/buttons/SecondaryButton';
import { config } from '../styles/GlobalStyles';

const HomeHeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${config.med}) {
    flex-direction: row;
    gap: 1.25rem;
  }
  @media (min-width: ${config.lg}) {
    flex-direction: row;
  }
`;

export default function HomeHeroButtons() {
  return (
    <HomeHeroWrapper>
      <PrimaryButton className='btn-lg' isLink={true} href={routes.coffee}>
        Shop Coffee
      </PrimaryButton>
      <SecondaryButton className='btn-lg btn-gray' isLink={true} href={routes.subscriptions}>
        Subscriptions
      </SecondaryButton>
    </HomeHeroWrapper>
  );
}
