import styled from "styled-components";
import Header from "../components/Header";
import SearchBar from "./SearchBar";
import { Outlet } from "react-router-dom";
import PersonNewsFeedBar from "./PersonNewsFeedBar";

const StyledAppLayout = styled.div`
  height: 100vh;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <SearchBar />
      <PersonNewsFeedBar />
      <Outlet />
    </StyledAppLayout>
  );
}

export default AppLayout;
