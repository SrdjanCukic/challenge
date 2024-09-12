import styled from 'styled-components';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import NewsSourceModal from './NewsSourceModal';

const StyledAppLayout = styled.div`
  min-height: 100vh;
`;

function AppLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <StyledAppLayout>
      <Header toggleModal={toggleModal} />
      <NewsSourceModal isOpen={isModalOpen} toggleModal={toggleModal} />
      <Outlet />
    </StyledAppLayout>
  );
}

export default AppLayout;
