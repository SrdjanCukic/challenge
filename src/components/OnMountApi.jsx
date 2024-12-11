import Loader from '../UI/Loader';
import useApiFetch from '../service/useApiFetch';
import Article from '../UI/Article';

function OnMountApi() {
  const { data, isLoading, error } = useApiFetch(
    'https://global-puls-api.onrender.com/api',
    // 'http://localhost:3000/api',
  );

  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching data: {error.message}</p>;

  if (data) {
    const { nyt, newsapi, gnews } = data;

    // Process data from each API
    const processedDataNyTimes =
      nyt?.results
        ?.filter(item => item.abstract && item.abstract !== '[Removed]')
        ?.slice(0, 3) || [];
    const processedDataNewsApi =
      newsapi?.articles
        ?.filter(
          item => item.content && item.content !== '[Removed]' && item.url,
        ) // Ensure the article has content and a valid URL
        ?.slice(0, 3) || [];
    const processedDataGNewsApi =
      gnews?.articles
        ?.filter(
          item => item.content && item.content !== '[Removed]' && item.url,
        ) // Ensure the article has content and a valid URL
        ?.slice(0, 3) || [];

    // Combine processed articles
    const allArticles = [
      ...processedDataNewsApi.map((article, index) => ({
        ...article,
        key: `newsapi-${index}`,
      })),
      ...processedDataGNewsApi.map((article, index) => ({
        ...article,
        key: `gnews-${index}`,
      })),
      ...processedDataNyTimes.map((article, index) => ({
        ...article,
        key: `nyt-${index}`,
      })),
    ];

    return (
      <div className="grid w-full grid-cols-1 gap-1 p-1 sm:gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-8">
        {allArticles.map(article => (
          <Article key={article.key} data={article} />
        ))}
      </div>
    );
  }

  return <Loader />;
}

export default OnMountApi;
