import useApiFetch from '../service/useHomeSectionArticlesFetch';
import BigArticle from './Articles/BigArticle';
import HeroSection from './HeroSection';
import SmallArticle from './Articles/SmallArticle';
import SkeletonSmallArticle from './SkeletonArticles/SkeletonSmallArticle';
import SkeletonBigArticle from './SkeletonArticles/SkeletonBigArticle';
import { useGlobalContext } from '../service/GlobalContext';

function HomePage() {
  const { data, isLoading, error } = useApiFetch(
    'https://global-puls-api.onrender.com/api',
  );
  const { isMobile } = useGlobalContext();

  if (isLoading) {
    return (
      <div>
        <HeroSection />
        <div className="mx-auto flex flex-col items-center p-4 md:max-w-screen-2xl">
          {['The New York Times', 'News API', 'GNews'].map(title => (
            <div key={title} className="mb-8 w-full">
              <div className="my-10 text-center text-4xl text-foreground sm:text-6xl">
                {title}
              </div>
              <div className="grid grid-cols-[1fr] gap-4 md:grid-cols-[1fr_1fr] xl:grid-cols-[2fr_1fr]">
                <div>
                  {isMobile ? <SkeletonSmallArticle /> : <SkeletonBigArticle />}
                </div>
                <div className="flex flex-col gap-4">
                  <SkeletonSmallArticle />
                  <SkeletonSmallArticle />
                  <SkeletonSmallArticle />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 flex justify-center text-2xl text-foreground">
        Error fetching data: {error.message}
      </div>
    );
  }

  if (data) {
    const sections = [
      { title: 'The New York Times', articles: data.nyt },
      { title: 'News API', articles: data.newsapi },
      { title: 'GNews', articles: data.gnews },
    ];

    return (
      <div>
        <HeroSection />
        <div className="mx-auto flex flex-col items-center p-4 md:max-w-screen-2xl">
          {sections.map(({ title, articles }) => (
            <div key={title} className="mb-8 w-full">
              <div className="my-10 text-center text-4xl text-foreground sm:text-6xl">
                {title}
              </div>

              <div className="grid grid-cols-[1fr] gap-4 md:grid-cols-[1fr_1fr] xl:grid-cols-[2fr_1fr]">
                {articles
                  .slice(0, 1)
                  .map(article =>
                    isMobile ? (
                      <SmallArticle key={article.link} data={article} />
                    ) : (
                      <BigArticle key={article.link} data={article} />
                    ),
                  )}
                <div className="flex flex-col gap-4">
                  {articles.slice(1, 4).map(article => (
                    <SmallArticle key={article.link} data={article} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default HomePage;
