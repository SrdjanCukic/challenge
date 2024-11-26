import { useState, useEffect } from 'react';

const useMultiAPICall = keyword => {
  const [data, setData] = useState({
    nytData: [],
    newsApiData: [],
    gnewsData: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!keyword) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://global-puls-api.onrender.com/keyword?keyword=${keyword}`,
          // `http://localhost:3000/keyword?keyword=${keyword}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();

        setData({
          nytData: result.nyTimes,
          newsApiData: result.newsApi,
          gnewsData: result.gNews,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setData({
          nytData: [],
          newsApiData: [],
          gnewsData: [],
          isLoading: false,
          error: error.message,
        });
      }
    };

    fetchData();
  }, [keyword]);

  return data;
};

export default useMultiAPICall;
