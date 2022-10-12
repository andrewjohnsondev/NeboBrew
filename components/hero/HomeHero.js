import styled from 'styled-components';
import BigTitle from '../atoms/BigTitle';
import HomeHeroButtons from './HomeHeroButtons';
import HomeHeroImage from './HomeHeroImage';
import { Wrapper } from '../styles/utilities';
import { config } from '../styles/GlobalStyles';
import SubheadingSmall from '../atoms/SubHeadingSmall';

const HomeHeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-content: center;
  position: relative;
  z-index: 9999;
  min-height: 100%;
  margin-top: 5rem;

  @media (min-width: ${config.med}) {
    max-width: 50ch;
    gap: 3rem;
    margin-top: 6rem;
  }
  @media (min-width: ${config.lg}) {
    max-width: 60ch;
    gap: 4rem;
  }
`;
const StyledHomeHero = styled.section`
  padding: 4rem 0;
  position: relative;
  min-height: 90vh;
  background-color: hsl(var(--color-neutral-200));
  /* display: flex; */
  overflow-x: hidden;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function HomeHero({ imageHref }) {
  return (
    <StyledHomeHero>
      <Wrapper>
        <HomeHeroContent>
          <TitleWrapper>
            <BigTitle>Life Is Better With Coffee</BigTitle>
            <SubheadingSmall>Nebo Brew provides high-quality coffee roasted in central Utah.</SubheadingSmall>
          </TitleWrapper>
          <HomeHeroButtons />
        </HomeHeroContent>
        <HomeHeroImage imageHref={imageHref} />
      </Wrapper>
    </StyledHomeHero>
  );
}
