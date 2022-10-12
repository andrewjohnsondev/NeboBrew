import HeroSubheading from './HeroSubheading';
import HeroTitle from '../atoms/HeroTitle';
import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const StyledHero = styled.section`
  background-color: hsl(var(--color-primary));
  padding-block: 3rem;
  text-align: center;

  @media (min-width: ${config.med}) {
    padding-block: 4rem;
  }
`;

export default function Hero({ title, subheading }) {
  return (
    <StyledHero className='bg-pattern'>
      <HeroTitle>{title}</HeroTitle>
      {subheading && <HeroSubheading>{subheading}</HeroSubheading>}
    </StyledHero>
  );
}
