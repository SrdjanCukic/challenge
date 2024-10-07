import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import NewsSourceModal from './NewsSourceModal';

function AppLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="container mx-auto">
      <Header toggleModal={toggleModal} />

      <NewsSourceModal isOpen={isModalOpen} toggleModal={toggleModal} />

      <Outlet />
    </div>
  );
}

export default AppLayout;
