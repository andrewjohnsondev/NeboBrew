import { usePopular } from '../context/PopularProvider';
import PopularFeatureHeading from './PopularFeatureHeading';
import { Section, Wrapper } from '../styles/utilities';
import styled from 'styled-components';
import Product from './Product';
import { config } from '../styles/GlobalStyles';
const PopularFeatureLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
  padding-block: 4rem;

  @media (min-width: ${config.med}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: ${config.lg}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
  }
`;

export default function PopularFeature() {
  const { popular } = usePopular();

  return (
    <Section>
      <Wrapper>
        <PopularFeatureHeading />
        {popular && (
          <PopularFeatureLayout>
            {popular.map(({ product }) => (
              <Product key={product._id} product={product} />
            ))}
          </PopularFeatureLayout>
        )}
      </Wrapper>
    </Section>
  );
}
