import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMultiAPICall from '../service/useSearchFetch';
import Article from './Article';
import SkeletonArticle from './SkeletonArticle';
import StaggeredDropDown from './DropdownMenus/SearchDropMenu';
import BasicTablePagination from './Pagination';

export function SearchNews() {
  const { query } = useParams();
  const [sortedData, setSortedData] = useState([]);
  const [sortOption, setSortOption] = useState('newer');
  const { articles, isLoading, error } = useMultiAPICall(query);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);

  useEffect(() => {
    if (!isLoading && !error) {
      // If articles are available, sort them
      let sortedArray = [...articles];

      // Sort the data based on selected option
      switch (sortOption) {
        case 'newer':
          sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'older':
          sortedArray.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        default:
          break;
      }

      // Limit to the first 100 articles if there are more than 100
      sortedArray = sortedArray.slice(0, 100);

      // Update sorted data
      setSortedData(sortedArray);
    }
  }, [articles, isLoading, error, sortOption]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = event => {
    const value = parseInt(event.target.value, 10);
    const newRowsPerPage = value % 3 === 0 ? value : Math.ceil(value / 3) * 3;
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  if (isLoading) {
    return (
      <div className="ml-auto mr-auto flex max-w-screen-2xl flex-col items-center p-4">
        <div className="flex w-full justify-between p-2">
          <div className="flex justify-between">
            <div className="text-2xl text-foreground">Loading results for:</div>
            <div className="pl-2 text-2xl text-primary">{query}</div>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-1 sm:gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-8">
          {Array.from({ length: 9 }).map((_, index) => (
            <SkeletonArticle key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 flex justify-center text-2xl text-foreground">
        Error: {error.message}
      </div>
    );
  }

  if (!isLoading && !error && articles.length === 0) {
    return (
      <div className="mt-10 flex justify-center text-2xl text-foreground">
        No results found for: {query}
      </div>
    );
  }

  return (
    <div className="ml-auto mr-auto flex max-w-screen-2xl flex-col items-center">
      <div className="flex w-full justify-between p-2">
        <div className="flex justify-between">
          <div className="text-2xl text-foreground">Showing results for:</div>
          <div className="pl-2 text-2xl text-primary">{query}</div>
        </div>
        <StaggeredDropDown setSortOption={setSortOption} />
      </div>

      <div className="grid w-full grid-cols-1 gap-1 sm:gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-8">
        {sortedData
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(value => (
            <Article key={value.link} data={value} />
          ))}
      </div>
      <div className="relative bottom-0 right-0">
        <BasicTablePagination
          count={sortedData.length} // Total number of articles
          page={page} // Current page state
          rowsPerPage={rowsPerPage} // Current rows per page state
          onPageChange={handleChangePage} // Update the page state
          onRowsPerPageChange={handleChangeRowsPerPage} // Update rows per page
        />
      </div>
    </div>
  );
}

export default SearchNews;
