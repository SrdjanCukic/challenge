import { useEffect, useState } from 'react';
import useMultiAPICall from '../service/useSearchFetch';
import Article from './Article';
import { useParams } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import StaggeredDropDown from './DropdownMenus/SearchDropMenu';

export function SearchNews() {
  const { query } = useParams();
  const [combinedData, setCombinedData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortOption, setSortOption] = useState('newer');
  const { nytData, newsApiData, gnewsData, isLoading, error } =
    useMultiAPICall(query);

  useEffect(() => {
    if (!isLoading && !error) {
      let combinedArray = [];

      if (Array.isArray(nytData)) {
        const nytDocs = nytData.map(doc => ({
          ...doc,
          source: 'The New York Times',
        }));
        combinedArray = combinedArray.concat(nytDocs);
      } else {
        console.log('NYT Data is missing or not formatted correctly');
      }

      if (Array.isArray(newsApiData)) {
        const newsApiArticles = newsApiData.map(article => ({
          ...article,
          source: 'News Api',
        }));
        combinedArray = combinedArray.concat(newsApiArticles);
      } else {
        console.log('News API Data is missing or not formatted correctly');
      }

      if (Array.isArray(gnewsData)) {
        const gnewsArticles = gnewsData.map(article => ({
          ...article,
          source: 'Gnews',
        }));
        combinedArray = combinedArray.concat(gnewsArticles);
      } else {
        console.log('GNews Data is missing or not formatted correctly');
      }

      const finalCombinedArray = combinedArray.filter(
        item => item.content !== '[Removed]',
      );

      setCombinedData(finalCombinedArray);
    }
  }, [nytData, newsApiData, gnewsData, isLoading, error]);

  useEffect(() => {
    let sortedArray = [...combinedData];
    switch (sortOption) {
      case 'newer':
        sortedArray.sort(
          (a, b) =>
            new Date(b.pub_date || b.publishedAt) -
            new Date(a.pub_date || a.publishedAt),
        );
        break;
      case 'older':
        sortedArray.sort(
          (a, b) =>
            new Date(a.pub_date || a.publishedAt) -
            new Date(b.pub_date || b.publishedAt),
        );
        break;
      case 'The New York Times':
        sortedArray = sortedArray.filter(
          item => item.source === 'The New York Times',
        );
        break;
      case 'News Api':
        sortedArray = sortedArray.filter(item => item.source === 'News Api');
        break;
      case 'Gnews':
        sortedArray = sortedArray.filter(item => item.source === 'Gnews');
        break;
      default:
        break;
    }
    setSortedData(sortedArray);
  }, [sortOption, combinedData]);

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (
    !isLoading &&
    !error &&
    nytData.length === 0 &&
    newsApiData.length === 0 &&
    gnewsData.length === 0
  ) {
    return <div>No results found.</div>;
  }

  return (
    <div className="w-full">
      <div className="flex w-full justify-center p-2">
        <StaggeredDropDown setSortOption={setSortOption} />
      </div>
      <div className="grid w-full grid-cols-1 gap-1 sm:gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-8">
        {sortedData.slice(0, 27).map((value, index) => (
          <Article key={index} data={value} />
        ))}
      </div>
    </div>
  );
}
