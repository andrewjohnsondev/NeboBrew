import HeroSubheading from './HeroSubheading';
import HeroTitle from '../atoms/HeroTitle';
import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const StyledHero = styled.section`
  background-color: hsl(var(--color-primary));
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 1rem;

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
