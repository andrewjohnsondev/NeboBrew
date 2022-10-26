import Hero from '../components/hero/Hero';
import styled from 'styled-components';
import { Wrapper } from '../components/styles/utilities';
import client from '../apollo-client';
import { gql } from '@apollo/client';
import Image from 'next/image';
import { config } from '../components/styles/GlobalStyles';
import Head from 'next/head';

const StyledAbout = styled.main`
  .wrapper {
    padding-block: 5rem;
  }
  .description {
    line-height: 2;
    color: hsl(var(--color-neutral-700));
  }

  .vision {
    text-align: center;
    color: white;
    padding: 4rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      font-size: var(--text-2xl);
    }

    p {
      margin-inline: auto;
      max-width: 70ch;
      color: hsl(var(--color-primary-200));
    }
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 52ch;
    margin-inline: auto;

    h1,
    h2 {
      font-size: var(--text-4xl);
    }

    p {
      color: hsl(var(--color-neutral-500));
    }
  }

  .content-wrapper.quality {
    text-align: center;
    align-self: center;
    justify-self: end;
    grid-row-start: 3;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 1fr 0.5fr 1fr;
    grid-auto-rows: 1fr;
    place-content: center;
    grid-row-gap: 3rem;
    text-align: center;
  }

  .image-wrapper {
    background-color: hsl(var(--color-neutral-100));
    position: relative;
    border-radius: 100%;
    box-shadow: hsl(var(--color-primary), 30%) 0px 25px 50px -12px;

    .round {
      border-radius: var(--br);
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      /* background-color: hsl(var(--color-neutral-1000)); */
    }
  }

  @media (min-width: ${config.med}) {
    .wrapper {
      padding-block: 8rem;
    }
    .grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      place-content: center;
      grid-row-gap: 10rem;
      grid-column-gap: 2rem;
    }

    .content-wrapper {
      text-align: left;
    }

    .content-wrapper.quality {
      text-align: right;
      justify-self: center;
      grid-row-start: 2;
      grid-column: 2;
    }

    .vision {
      h2 {
        font-size: var(--text-3xl);
      }
    }
  }
`;

function About({ aboutImage, qualityImage }) {
  return (
    <>
      <Head>
        <title>Coffee | About</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <main></main>
      <StyledAbout className=''>
        <Wrapper className='wrapper'>
          <div className='grid'>
            <div className='content-wrapper'>
              <h1>About Us</h1>
              <p className='description'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam quos dolorum ducimus saepe earum perferendis debitis dolores consequatur, voluptates perspiciatis eum explicabo?
                Quisquam iusto sint, nisi vero totam quod eum impedit sed molestias reprehenderit aut dolorum error unde doloribus odit officiis repellat, repellendus eaque animi. Iure et qui
                asperiores amet nisi repellat, exercitationem minima aspernatur earum? Iure, ducimus saepe! Ullam, nulla! Explicabo illo dolores.
              </p>
            </div>
            <div className='image-wrapper'>
              <Image className='round' src={aboutImage.allPhotos[0].image.secure_url} alt={aboutImage.allPhotos[0].alt} priority objectFit='cover' layout='fill' />
            </div>
            <div className='image-wrapper'>
              <Image className='round' src={qualityImage.allPhotos[0].image.secure_url} alt={qualityImage.allPhotos[0].alt} priority objectFit='cover' layout='fill' />
            </div>
            <div className='content-wrapper quality'>
              <h2>Our Quality</h2>
              <p className='description'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nesciunt dignissimos nam saepe. Tempora, molestiae aliquid natus ad unde animi, corporis ipsam cum delectus provident
                autem neque velit maiores? Magnam voluptates dicta dolore rerum explicabo iure facere voluptatum obcaecati maiores?
              </p>
            </div>
          </div>
        </Wrapper>
        <div className='bg-pattern vision'>
          <h2>OUR PRODUCT VISION</h2>
          <p>We create high quality coffee for your active lifestyle. Each bean is roasted to perfection. Our promise is to never make you feel like you wasted a cup.</p>
        </div>
      </StyledAbout>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        allPhotos(where: { title: { eq: "About Image" } }) {
          alt
          image {
            secure_url
          }
        }
      }
    `,
  });
  const { data: quality } = await client.query({
    query: gql`
      query {
        allPhotos(where: { title: { eq: "Our Quality" } }) {
          alt
          image {
            secure_url
          }
        }
      }
    `,
  });

  return {
    props: {
      aboutImage: data,
      qualityImage: quality,
    },
  };
}

export default About;
