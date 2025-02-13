import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

const GlobalContext = createContext();

const DEFAULT_SOURCES = {
  'New York Times': true,
  'News Api': true,
  Gnews: true,
};

const initialState = {
  isModalOpen: false,
  theme: localStorage.getItem('theme') || 'light',
  selectedSources:
    JSON.parse(localStorage.getItem('selectedSources')) || DEFAULT_SOURCES,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, isModalOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false };
    case 'UPDATE_SOURCES':
      localStorage.setItem('selectedSources', JSON.stringify(action.payload));
      return { ...state, selectedSources: action.payload };
    case 'LIGHT':
      return { ...state, theme: 'light' };
    case 'DARK':
      return { ...state, theme: 'dark' };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const body = document.body;

    if (state.theme === 'dark') {
      body.classList.add('dark');
      body.classList.remove('light');
    } else {
      body.classList.add('light');
      body.classList.remove('dark');
    }
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  return (
    <GlobalContext.Provider value={{ state, dispatch, isMobile }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
