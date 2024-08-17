import { useState, useEffect } from "react";

const useMultiAPICall = (keyword) => {
  const [data, setData] = useState({
    source1Data: [],
    source2Data: [],
    source3Data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!keyword) return;

    const sanitizedKeyword = keyword.toLowerCase().replace(/[^a-z0-9\s]/g, "");

    const fetchData = async () => {
      try {
        // API call to Source 1
        const response1 = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${sanitizedKeyword}&api-key=cg4vzM2CAqeJM2Ojw8zIZHZyEs40LVhS`
        );
        const source1Data = await response1.json();

        // API call to Source 2
        const response2 = await fetch(
          `https://newsapi.org/v2/everything?q=${sanitizedKeyword}&apiKey=f5f8bc54714e4aad8ee2fbca3b0573cd`
        );
        const source2Data = await response2.json();

        // API call to Source 3
        const response3 = await fetch(
          `https://gnews.io/api/v4/search?q=${sanitizedKeyword}&lang=en&country=us&max=10&apikey=2af35c159a71bbcede539fe4c21ad3e5`
        );
        const source3Data = await response3.json();

        setData({
          source1Data,
          source2Data,
          source3Data,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setData({
          source1Data: [],
          source2Data: [],
          source3Data: [],
          isLoading: false,
          error: error.message,
        });
      }
    };

    // Call the fetchData function
    fetchData();
  }, [keyword]);

  return data;
};

export default useMultiAPICall;
