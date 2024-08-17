import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: lightgray;
  padding: 1.2rem 3rem;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Header() {
  return (
    <StyledHeader>
      <div>Logo</div>
      <div>NewsSite</div>
    </StyledHeader>
  );
}

export default Header;
