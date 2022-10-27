import Image from 'next/image';

export default function ProductImage({ url, alt, priority }) {
  return <Image priority={priority} alt={alt} src={url} layout='fill' objectPosition='center' objectFit='cover' />;
}
