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
      ...processedDataNewsApi.map(article => ({
        ...article,
        key: article.url,
      })),
      ...processedDataGNewsApi.map(article => ({
        ...article,
        key: article.url,
      })),
      ...processedDataNyTimes.map(article => ({
        ...article,
        key: article.url,
      })),
    ];

    const uniqueArticles = allArticles.filter(
      (article, index, self) =>
        index === self.findIndex(a => a.key === article.key),
    );

    return (
      <div className="grid w-full grid-cols-1 gap-1 p-1 sm:gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-8">
        {uniqueArticles.map(article => (
          <Article key={article.url} data={article} />
        ))}
      </div>
    );
  }

  return <Loader />;
}

export default OnMountApi;
