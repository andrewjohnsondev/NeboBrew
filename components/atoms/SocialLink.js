import styled from 'styled-components';

const StyledSocialLink = styled.a`
  cursor: pointer;
`;
export default function SocialLink({ href, children }) {
  return (
    <StyledSocialLink href={href} target='_blank'>
      {children}
    </StyledSocialLink>
  );
}
