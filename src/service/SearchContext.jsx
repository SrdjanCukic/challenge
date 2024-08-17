import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [isSearchInitiated, setIsSearchInitiated] = useState(false);

  return (
    <SearchContext.Provider value={{ isSearchInitiated, setIsSearchInitiated }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
