import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import NewsSourceModal from './NewsSourceModal';
import FirstTimeNotification from './NotificationComponent';

function AppLayout() {
  return (
    <div className="min-h-screen bg-background-mode font-tinos">
      <FirstTimeNotification />
      <Header />
      <NewsSourceModal />
      <Outlet />
    </div>
  );
}

export default AppLayout;
