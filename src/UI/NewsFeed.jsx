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

  const { data, isLoading, error } = useApiFetch(
    'https://global-puls-api.onrender.com/api',
    // 'http://localhost:3000/api',
  );

  const { nyt, newsapi, gnews } = data || {};

  useEffect(() => {
    if (!isLoading && !error) {
      let combinedArray = [];

      const sourcesArray = sources.split(',');

      if (
        nyt &&
        Array.isArray(nyt.results) &&
        sourcesArray.includes('The New York Times')
      ) {
        combinedArray = combinedArray.concat(
          nyt.results.map(article => ({
            ...article,
            source: 'The New York Times',
          })),
        );
      }

      if (
        newsapi &&
        Array.isArray(newsapi.articles) &&
        sourcesArray.includes('News Api')
      ) {
        combinedArray = combinedArray.concat(
          newsapi.articles.map(article => ({
            ...article,
            source: 'News Api',
          })),
        );
      }

      if (
        gnews &&
        Array.isArray(gnews.articles) &&
        sourcesArray.includes(' Gnews')
      ) {
        combinedArray = combinedArray.concat(
          gnews.articles.map(article => ({
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
  }, [isLoading, error, gnews, newsapi, nyt, sources]);

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

  if (isLoading) {
    return (
      <Backdrop
        sx={theme => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isLoading && !error && combinedData.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <div>
      <div className="flex w-full justify-center p-2">
        <label htmlFor="filter" className="pr-2 text-foreground">
          Sort by:{' '}
        </label>
        <select
          id="filter"
          name="filter"
          value={sortOption}
          onChange={handleSortChange}
          className="rounded-lg"
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
