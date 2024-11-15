import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import NewsSourceModal from './NewsSourceModal';

function AppLayout() {
  return (
    <div className="container mx-auto">
      <Header />
      <NewsSourceModal />
      <Outlet />
    </div>
  );
}

export default AppLayout;
