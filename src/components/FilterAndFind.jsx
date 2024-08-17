import styled from "styled-components";
import { Search } from "../UI/Search";

const ActionBarStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
`;

function FilterAndFind() {
  return (
    <ActionBarStyled>
      <Search />
    </ActionBarStyled>
  );
}

export default FilterAndFind;
