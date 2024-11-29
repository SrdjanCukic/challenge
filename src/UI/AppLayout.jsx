import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import NewsSourceModal from './NewsSourceModal';

function AppLayout() {
  return (
    <div className="bg-background-mode min-h-screen w-screen">
      <Header />
      <div className="container mx-auto">
        <NewsSourceModal />
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
