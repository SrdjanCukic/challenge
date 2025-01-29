import { useState, useEffect } from 'react';
import { useGlobalContext } from '../service/GlobalContext';

const useMultiAPICall = keyword => {
  const { state } = useGlobalContext();
  const [data, setData] = useState({
    articles: [], // Combined articles from all sources
    isLoading: true,
    error: null,
  });

  // Get selected sources from the global state
  const selectedSources = state.selectedSources;

  // Function to build the query parameters from selected sources
  const buildSourceQuery = () => {
    const sources = Object.keys(selectedSources).filter(
      source => selectedSources[source] === true,
    );
    return sources.join(',');
  };

  useEffect(() => {
    if (!keyword || !Object.values(selectedSources).includes(true)) return;

    const fetchData = async () => {
      setData(prevData => ({
        ...prevData,
        isLoading: true, // Start loading state
      }));

      try {
        // Build the query string from selected sources
        const sourceQuery = buildSourceQuery();

        const response = await fetch(
          `https://global-puls-api.onrender.com/keyword?keyword=${keyword}&sources=${sourceQuery}`,
          // `http://localhost:3000/keyword?keyword=${keyword}&sources=${sourceQuery}`, // Use local URL for development
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();

        setData({
          articles: result.articles || [], // Updated to handle unified result
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setData({
          articles: [],
          isLoading: false,
          error: error.message,
        });
      }
    };

    fetchData();
  }, [keyword, selectedSources]); // Re-run whenever `keyword` or `selectedSources` changes

  return data;
};

export default useMultiAPICall;
