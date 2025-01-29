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
      secondary: 'rgb(var(--foreground)/70%)',
      disabled: 'rgb(var(--foreground)/50%)',
    },
    primary: {
      main: 'rgb(var(--primary))',
    },
    divider: 'rgb(var(--primary))',
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgb(var(--background))', // Dark background
          color: 'rgb(var(--foreground))', // Light text
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'rgb(var(--foreground))',
          '&:hover': {
            backgroundColor: 'rgba(146, 140, 140, 0.1)',
          },
        },
      },
    },
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
