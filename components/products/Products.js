import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Product from './Product';
import { Wrapper } from '../styles/utilities';
import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';

const StyledProductsWrapper = styled.div`
  padding-block: 3.5rem;

  @media (min-width: ${config.med}) {
    padding-block: 3rem;
  }

  h2 {
    padding-left: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export default function Products({ products, title, priority }) {
  const settings = {
    dots: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 4,
    slidesToScroll: 2,
    infinite: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <StyledProductsWrapper>
      <Wrapper>
        <h2> {title}</h2>
        <Slider {...settings}>
          {products.map((product, index) => (
            <Product priority={priority ? true : false} key={product._id} product={product} />
          ))}
        </Slider>
      </Wrapper>
    </StyledProductsWrapper>
  );
}
