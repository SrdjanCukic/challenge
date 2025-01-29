import useApiFetch from '../service/useHomeSectionArticlesFetch';
import Article from './Article';
import HeroSection from './HeroSection';
import SkeletonArticle from './SkeletonArticle';

function HomePage() {
  const { data, isLoading, error } = useApiFetch(
    'https://global-puls-api.onrender.com/api',
  );

  if (isLoading) {
    return (
      <div>
        <HeroSection />
        <div className="mx-auto flex w-screen flex-col items-center p-4 md:max-w-screen-2xl">
          <div className="mb-8 w-full">
            <div className="my-10 text-center text-4xl text-foreground sm:text-6xl">
              The New York Times
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="sm:col-span-3">
                <SkeletonArticle isLarge={true} />
              </div>
              <div className="flex flex-col gap-4">
                <SkeletonArticle />
                <SkeletonArticle />
                <SkeletonArticle />
              </div>
            </div>
          </div>
          <div className="mb-8 w-full">
            <div className="my-10 text-center text-4xl text-foreground sm:text-6xl">
              News API
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="flex flex-col gap-4">
                <SkeletonArticle />
                <SkeletonArticle />
                <SkeletonArticle />
              </div>
              <div className="sm:col-span-3">
                <SkeletonArticle isLarge={true} />
              </div>
            </div>
          </div>
          <div className="mb-8 w-full">
            <div className="my-10 text-center text-4xl text-foreground sm:text-6xl">
              GNews
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="sm:col-span-3">
                <SkeletonArticle isLarge={true} />
              </div>
              <div className="flex flex-col gap-4">
                <SkeletonArticle />
                <SkeletonArticle />
                <SkeletonArticle />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="mt-10 flex justify-center text-2xl text-foreground">
        Error fetching data: {error.message}
      </div>
    );

  if (data) {
    const { nyt, newsapi, gnews } = data;

    return (
      <div>
        <HeroSection />
        <div className="mx-auto flex w-screen flex-col items-center p-4 md:max-w-screen-2xl">
          {/* New York Times Section */}
          <div className="mb-8 w-full">
            <div className="my-10 text-center text-4xl text-foreground sm:text-6xl">
              The New York Times
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              {/* First article takes up larger space */}
              <div className="sm:col-span-3">
                {nyt.slice(0, 1).map(article => (
                  <Article key={article.link} data={article} isLarge={true} />
                ))}
              </div>

              {/* Stacked articles on the right */}
              <div className="flex flex-col gap-4">
                {nyt.slice(1, 4).map(article => (
                  <Article key={article.link} data={article} isSmall={true} />
                ))}
              </div>
            </div>
          </div>

          {/* News API Section */}
          <div className="mb-8 w-full">
            <div className="my-10 text-center text-4xl text-foreground sm:text-6xl">
              News API
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="flex flex-col gap-4">
                {newsapi.slice(1, 4).map(article => (
                  <Article key={article.link} data={article} isSmall={true} />
                ))}
              </div>
              <div className="sm:col-span-3">
                {newsapi.slice(0, 1).map(article => (
                  <Article key={article.link} data={article} isLarge={true} />
                ))}
              </div>
            </div>
          </div>

          {/* GNews Section */}
          <div className="mb-8 w-full">
            <div className="my-10 text-center text-4xl text-foreground sm:text-6xl">
              GNews
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              {/* First article takes up larger space */}
              <div className="sm:col-span-3">
                {gnews.slice(0, 1).map(article => (
                  <Article key={article.link} data={article} isLarge={true} />
                ))}
              </div>

              {/* Stacked articles on the right */}
              <div className="flex flex-col gap-4">
                {gnews.slice(1, 4).map(article => (
                  <Article key={article.link} data={article} isSmall={true} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
