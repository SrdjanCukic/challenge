import styled from "styled-components";
import Header from "../components/Header";
import PreferencesForm from "../UI/PersonNewsFeedBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const StyledAppLayout = styled.div`
  height: 100vh;
`;

function AppLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <StyledAppLayout>
      <Header toggleModal={toggleModal} />
      <PreferencesForm isOpen={isModalOpen} toggleModal={toggleModal} />
      <Outlet />
    </StyledAppLayout>
  );
}

export default AppLayout;
