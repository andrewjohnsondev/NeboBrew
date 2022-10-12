import Image from 'next/image';
import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const HomeHeroImageOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
  filter: blur(5px);

  @media (min-width: ${config.med}) {
    filter: none;
    box-shadow: none;
  }
`;

const HomeHeroImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1200px;

  img {
    position: relative;
    z-index: 99;
    opacity: 0.2;
  }

  @media (min-width: ${config.med}) {
    position: absolute;
    right: -40%;
    top: 0;
    img {
      opacity: 1;
    }
  }
  @media (min-width: ${config.lg}) {
    right: -25%;
  }
`;

const BackgroundShape = styled.div`
  clip-path: polygon(62% 0, 100% 0, 100% 100%, 27% 100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;

  @media (min-width: ${config.med}) {
    opacity: 1;
  }
`;

export default function HomeHeroImage({ imageHref }) {
  return (
    <HomeHeroImageOuter>
      <HomeHeroImageWrapper>
        <Image src={imageHref} alt='' priority layout='fill' objectFit='cover' />
        <BackgroundShape className='bg-pattern' />
      </HomeHeroImageWrapper>
    </HomeHeroImageOuter>
  );
}
