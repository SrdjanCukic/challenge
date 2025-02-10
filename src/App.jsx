import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './UI/AppLayout';
import './index.css';
import SearchArticles from './components/SearchArticles';
import OnMountApi from './UI/HomePage.jsx';
import { GlobalProvider } from './service/GlobalContext.jsx';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    text: {
      primary: 'rgb(var(--foreground))',
      secondary: 'rgb(var(--foreground) / 0.7)',
      disabled: 'rgb(var(--foreground) / 0.5)',
    },
    primary: {
      main: 'rgb(var(--primary))',
    },
    divider: 'rgb(var(--primary))',
    background: {
      default: 'rgb(var(--background))',
      paper: 'rgb(var(--background-card))',
    },
  },
  typography: {
    fontFamily: 'Tinos, serif',
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
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
