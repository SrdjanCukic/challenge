import { createContext, useContext, useEffect, useReducer } from 'react';

const GlobalContext = createContext();
const initialTheme = localStorage.getItem('theme') || 'dark';

const initialState = {
  isModalOpen: false,
  theme: initialTheme,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, isModalOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false };
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
