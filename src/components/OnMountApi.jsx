import Loader from '../UI/Loader';
import useApiFetch from '../service/useApiFetch';
import Article from '../UI/Article';

function OnMountApi() {
  const { data, isLoading, error } = useApiFetch(
    'https://global-puls-api.onrender.com/api',
  );

  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching data: {error.message}</p>;

  if (data) {
    const { nyt, newsapi, gnews } = data;

    // Process data from each API
    const processedDataNyTimes =
      nyt?.results
        ?.filter(item => item.abstract !== '[Removed]')
        ?.slice(0, 3) || [];
    const processedDataNewsApi =
      newsapi?.articles
        ?.filter(item => item.content !== '[Removed]')
        ?.slice(0, 3) || [];
    const processedDataGNewsApi =
      gnews?.articles
        ?.filter(item => item.content !== '[Removed]')
        ?.slice(0, 3) || [];

    return (
      <div className="grid w-full grid-cols-1 gap-1 p-1 sm:gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-8">
        {processedDataNewsApi.map((value, index) => (
          <Article key={`newsapi-${index}`} data={value} />
        ))}
        {processedDataGNewsApi.map((value, index) => (
          <Article key={`gnews-${index}`} data={value} />
        ))}
        {processedDataNyTimes.map((value, index) => (
          <Article key={`nyt-${index}`} data={value} />
        ))}
      </div>
    );
  }

  return <Loader />;
}

export default OnMountApi;
