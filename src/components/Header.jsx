import styled from "styled-components";
import SearchBar from "../UI/SearchBar";
import { Button } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

const StyledHeader = styled.header`
  background-color: lightgray;
  padding: 1.2rem 3rem;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Header({ toggleModal }) {
  return (
    <StyledHeader>
      <div>Logo</div>
      <div>
        <SearchBar />
      </div>
      <div>NewsSite</div>
      <Button variant="outlined" color="secondary" onClick={toggleModal}>
        <ManageSearchIcon color="secondary" />
      </Button>
    </StyledHeader>
  );
}

export default Header;
