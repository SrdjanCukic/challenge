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
    <div className="box-border w-full">
      <Header toggleModal={toggleModal} className="sticky top-0" />

      <NewsSourceModal isOpen={isModalOpen} toggleModal={toggleModal} />

      <Outlet className="min-h-screen min-w-full" />
    </div>
  );
}

export default AppLayout;
