import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Article from './Article';
import useApiFetch from '../service/useApiFetch';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';

const NewsFeed = () => {
  const { params } = useParams();
  const [sources] = params.split('-');
  const [combinedData, setCombinedData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortOption, setSortOption] = useState('newer');

  const {
    data: nyTimes,
    isLoading: isLoading1,
    error: error1,
  } = useApiFetch(
    'https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=cg4vzM2CAqeJM2Ojw8zIZHZyEs40LVhS',
  );

  const {
    data: newsApi,
    isLoading: isLoading2,
    error: error2,
  } = useApiFetch(
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=f5f8bc54714e4aad8ee2fbca3b0573cd',
  );

  const {
    data: gNewsApi,
    isLoading: isLoading3,
    error: error3,
  } = useApiFetch(
    'https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=2af35c159a71bbcede539fe4c21ad3e5',
  );

  useEffect(() => {
    if (
      !isLoading1 &&
      !isLoading2 &&
      !isLoading3 &&
      !error1 &&
      !error2 &&
      !error3
    ) {
      let combinedArray = [];

      const sourcesArray = sources.split(',');

      if (
        nyTimes &&
        Array.isArray(nyTimes.results) &&
        sourcesArray.includes('The New York Times')
      ) {
        combinedArray = combinedArray.concat(
          nyTimes.results.map(article => ({
            ...article,
            source: 'The New York Times',
          })),
        );
      }

      if (
        newsApi &&
        Array.isArray(newsApi.articles) &&
        sourcesArray.includes('News Api')
      ) {
        combinedArray = combinedArray.concat(
          newsApi.articles.map(article => ({
            ...article,
            source: 'News Api',
          })),
        );
      }

      if (
        gNewsApi &&
        Array.isArray(gNewsApi.articles) &&
        sourcesArray.includes(' Gnews')
      ) {
        combinedArray = combinedArray.concat(
          gNewsApi.articles.map(article => ({
            ...article,
            source: ' Gnews',
          })),
        );
      }

      // Final filter to remove objects with content marked as "[Removed]"
      const finalCombinedArray = combinedArray.filter(
        item => item.content !== '[Removed]',
      );

      setCombinedData(finalCombinedArray);
    }
  }, [
    isLoading1,
    isLoading2,
    isLoading3,
    error1,
    error2,
    error3,
    gNewsApi,
    newsApi,
    nyTimes,
    sources,
  ]);

  useEffect(() => {
    let sortedArray = [...combinedData];
    switch (sortOption) {
      case 'newer':
        sortedArray.sort(
          (a, b) =>
            new Date(b.created_date || b.publishedAt) -
            new Date(a.created_date || a.publishedAt),
        );
        break;
      case 'older':
        sortedArray.sort(
          (a, b) =>
            new Date(a.created_date || a.publishedAt) -
            new Date(b.created_date || b.publishedAt),
        );
        break;
      default:
        break;
    }
    setSortedData(sortedArray);
  }, [sortOption, combinedData]);

  const handleSortChange = event => {
    setSortOption(event.target.value);
  };

  // Render content based on the state of the API call

  if (isLoading1 && isLoading2 && isLoading3) {
    return (
      <Backdrop
        sx={theme => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error1 && error2 && error3) {
    return <div>Error: {error1 && error2 && error3}</div>;
  }

  if (
    !isLoading1 &&
    !isLoading2 &&
    !isLoading3 &&
    !error1 &&
    !error2 &&
    !error3 &&
    combinedData.length === 0
  ) {
    return <div>No results found.</div>;
  }

  return (
    <div>
      <div className="flex w-full justify-center p-2">
        <label htmlFor="filter">Sort by: </label>
        <select
          id="filter"
          name="filter"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="newer">Newer</option>
          <option value="older">Older</option>
        </select>
      </div>

      <div className="grid w-full grid-cols-1 gap-1 p-1 sm:gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-8">
        {sortedData.slice(0, 30).map((value, index) => (
          <Article key={index} data={value} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
