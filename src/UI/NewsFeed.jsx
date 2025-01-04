import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Article from './Article';
import useApiFetch from '../service/useApiFetch';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';
import StaggeredDropDown from './DropdownMenus/NewsFeedMenu';

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
        sourcesArray.includes('Gnews')
      ) {
        combinedArray = combinedArray.concat(
          gnews.articles.map(article => ({
            ...article,
            source: 'Gnews',
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
    return (
      <div className="mt-10 flex justify-center text-2xl text-foreground">
        Error: {error}
      </div>
    );
  }

  if (!isLoading && !error && combinedData.length === 0) {
    return (
      <div className="mt-10 flex justify-center text-2xl text-foreground">
        No results found.
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center p-4">
      <div className="flex w-full flex-col justify-center p-2 align-middle md:flex-row md:justify-between md:align-middle">
        <div className="justify-centre mb-4 flex w-full flex-col gap-2 align-middle sm:gap-4 md:mb-0 md:flex-row">
          <div className="m-1 p-2 text-center text-foreground">
            Sources selected:
          </div>
          <div className="flex flex-col gap-2 sm:gap-2 md:flex-row">
            {sources.includes('The New York Times') && (
              <div className="m-1 whitespace-nowrap rounded-full bg-gradient-to-r from-primary/40 to-primary/20 p-2 px-3 py-2 text-center text-foreground transition-colors">
                The New York Times
              </div>
            )}
            {sources.includes('News Api') && (
              <div className="m-1 whitespace-nowrap rounded-full bg-gradient-to-r from-primary/40 to-primary/20 p-2 px-3 py-2 text-center text-foreground transition-colors">
                News Api
              </div>
            )}
            {sources.includes('Gnews') && (
              <div className="m-1 whitespace-nowrap rounded-full bg-gradient-to-r from-primary/40 to-primary/20 p-2 px-3 py-2 text-center text-foreground transition-colors">
                Gnews
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full justify-center md:w-1/2 md:justify-end md:align-top">
          <StaggeredDropDown setSortOption={setSortOption} />
        </div>
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
