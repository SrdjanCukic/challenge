import Loader from '../UI/Loader';
import useApiFetch from '../service/useApiFetch';
import Article from '../UI/Article';
import HeroSection from '../UI/HeroSection';

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

    return (
      <div>
        <HeroSection />
        <div className="mx-auto flex w-screen flex-col items-center p-4 md:max-w-screen-2xl">
          <div className="mb-8 w-full text-center">
            <div className="mb-4 text-2xl text-foreground">
              The New York Times
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              {processedDataNyTimes.map(article => (
                <Article key={article.url} data={article} />
              ))}
            </div>
          </div>
          <div className="mb-8 w-full text-center">
            <div className="mb-4 text-2xl text-foreground">News API</div>
            <div className="flex flex-col gap-4 md:flex-row">
              {processedDataNewsApi.map(article => (
                <Article key={article.url} data={article} />
              ))}
            </div>
          </div>
          <div className="mb-8 w-full text-center">
            <div className="mb-4 text-2xl text-foreground">GNews</div>
            <div className="flex flex-col gap-4 md:flex-row">
              {processedDataGNewsApi.map(article => (
                <Article key={article.url} data={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Loader />;
}

export default OnMountApi;
