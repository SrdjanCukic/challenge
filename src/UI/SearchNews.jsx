import { useEffect, useState } from 'react';
import useMultiAPICall from '../service/useSearchFetch';
import Article from './Article';
import { useParams } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

export function SearchNews() {
  const { query } = useParams();
  const [combinedData, setCombinedData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortOption, setSortOption] = useState('newer');
  const { source1Data, source2Data, source3Data, isLoading, error } =
    useMultiAPICall(query);

  useEffect(() => {
    if (!isLoading && !error) {
      let combinedArray = [];

      if (
        source1Data &&
        source1Data.response &&
        Array.isArray(source1Data.response.docs)
      ) {
        combinedArray = combinedArray.concat(
          source1Data.response.docs.map(doc => ({
            ...doc,
            source: 'The New York Times',
          })),
        );
      }

      if (source2Data && Array.isArray(source2Data.articles)) {
        combinedArray = combinedArray.concat(
          source2Data.articles.map(article => ({
            ...article,
            source: 'News Api',
          })),
        );
      }

      if (source3Data && Array.isArray(source3Data.articles)) {
        combinedArray = combinedArray.concat(
          source3Data.articles.map(article => ({
            ...article,
            source: 'Gnews',
          })),
        );
      }

      const finalCombinedArray = combinedArray.filter(
        item => item.content !== '[Removed]',
      );

      setCombinedData(finalCombinedArray);
    }
  }, [source1Data, source2Data, source3Data, isLoading, error]);

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

  const handleSortChange = event => {
    setSortOption(event.target.value);
  };

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

  if (
    !isLoading &&
    !error &&
    source1Data.response.docs.length === 0 &&
    source2Data.articles.length === 0 &&
    source3Data.articles.length === 0
  ) {
    return <div>No results found.</div>;
  }
  console.log(sortedData);
  return (
    <div className="w-full">
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
          <option value="The New York Times">The New York Times</option>
          <option value="News Api">News Api</option>
          <option value="Gnews">Gnews</option>
        </select>
      </div>
      <div className="grid w-full grid-cols-1 gap-1 sm:gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-8">
        {sortedData.slice(0, 25).map((value, index) => (
          <Article key={index} data={value} />
        ))}
      </div>
    </div>
  );
}
