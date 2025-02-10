import { createContext, useContext, useEffect, useReducer } from 'react';

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
    JSON.parse(localStorage.getItem('selectedSources')) || DEFAULT_SOURCES, // Add selectedSources to the state
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
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
