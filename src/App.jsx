import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './UI/AppLayout';
import './index.css';
import SearchArticles from './components/SearchArticles';
import OnMountApi from './components/OnMountApi';
import NewsFeedPersonalized from './components/NewsFeedPersonalized';
import Error from './UI/Error';
import { GlobalProvider } from './service/GlobalContext.jsx';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(var(--primary))',
    },
    divider: 'rgb(var(--primary))',
  },
});

function App() {
  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
