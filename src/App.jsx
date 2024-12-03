import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './UI/AppLayout';
import './index.css';
import SearchArticles from './components/SearchArticles';
import OnMountApi from './components/OnMountApi';
import NewsFeedPersonalized from './components/NewsFeedPersonalized';
import Error from './UI/Error';
import { GlobalProvider, useGlobalContext } from './service/GlobalContext.jsx';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<OnMountApi />} />
            <Route path="search/:query" element={<SearchArticles />} />
            <Route
              path="/personalized-news/:params"
              element={<NewsFeedPersonalized />}
            />
            <Route path="/personalized-news/" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
