import Link from 'next/link';
import styled from 'styled-components';
import FooterCategoryTitle from './FooterCategoryTitle';

const StyledFooterCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  a,
  p {
    color: hsl(var(--color-neutral-200));
    text-decoration: none;
    cursor: pointer;
  }
`;

export default function FooterCategory({ title, links = [] }) {
  return (
    <StyledFooterCategory>
      <FooterCategoryTitle>{title}</FooterCategoryTitle>
      {links.map((link) =>
        link.href ? (
          <Link key={link.name} href={link.href}>
            {link.name}
          </Link>
        ) : (
          <p key={link.name}>{link.name}</p>
        )
      )}
    </StyledFooterCategory>
  );
}
