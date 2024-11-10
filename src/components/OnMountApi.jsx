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
    const procesedDataNyTimes = nyt?.results?.slice(0, 3) || [];
    const procesedDataNewsApi = newsapi?.articles?.slice(0, 3) || [];
    const procesedDataGNewsApi = gnews?.articles?.slice(0, 3) || [];

    return (
      <div className="grid w-full grid-cols-1 gap-1 p-1 sm:gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-8">
        {procesedDataNyTimes.map((value, index) => (
          <Article key={`nyt-${index}`} data={value} />
        ))}
        {procesedDataNewsApi.map((value, index) => (
          <Article key={`newsapi-${index}`} data={value} />
        ))}
        {procesedDataGNewsApi.map((value, index) => (
          <Article key={`gnews-${index}`} data={value} />
        ))}
      </div>
    );
  }

  return <Loader />;
}

export default OnMountApi;
