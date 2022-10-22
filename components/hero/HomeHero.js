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

  /* margin-top: 5rem; */

  @media (min-width: ${config.med}) {
    max-width: 50ch;
    gap: 3rem;
    /* margin-top: 6rem; */
    margin-left: 1rem;
  }
  @media (min-width: ${config.lg}) {
    max-width: 60ch;
    gap: 4rem;
    margin-left: 4rem;
  }
`;
const StyledHomeHero = styled.section`
  padding: 4rem 0;
  position: relative;
  min-height: 70vh;
  background-color: hsl(var(--color-neutral-200));
  max-width: 1100px;
  margin-inline: auto;
  overflow-x: hidden;
  border-radius: var(--br);
  display: grid;
  place-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

  @media (min-width: ${config.med}) {
    margin-inline: 1rem;
    margin-top: 1rem;
  }
  @media (min-width: ${config.lg}) {
    margin-inline: auto;
    margin-top: 2rem;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
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
