import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import NewsSourceModal from './NewsSourceModal';

function AppLayout() {
  return (
    <div className="min-h-screen w-screen bg-background-mode font-tinos">
      <Header />
      <NewsSourceModal />
      <Outlet />
    </div>
  );
}

export default AppLayout;
