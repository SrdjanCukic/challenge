import Loader from '../UI/Loader';
import useApiFetch from '../service/useApiFetch';
import Article from '../UI/Article';

function OnMountApi() {
  const { data: nyTimes } = useApiFetch(
    'https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=cg4vzM2CAqeJM2Ojw8zIZHZyEs40LVhS',
  );
  const { data: newsApi } = useApiFetch(
    'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=f5f8bc54714e4aad8ee2fbca3b0573cd',
  );
  const { data: gNewsApi } = useApiFetch(
    'https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=2af35c159a71bbcede539fe4c21ad3e5',
  );

  function handleingFetchDataNYT(data) {
    const valuesArray = data.results;
    const firstThreeValues = valuesArray.slice(0, 3);
    return firstThreeValues;
  }

  function handleingFetchDataNewsApi(data) {
    const valuesArray = data.articles;
    const firstThreeValues = valuesArray.slice(0, 3);
    return firstThreeValues;
  }

  if (nyTimes && newsApi && gNewsApi) {
    const procesedDataNyTimes = handleingFetchDataNYT(nyTimes);
    const procesedDataNewsApi = handleingFetchDataNewsApi(newsApi);
    const procesedDataGNewsApi = handleingFetchDataNewsApi(gNewsApi);
    return (
      <div className="grid w-full grid-cols-1 gap-2 p-1 md:grid-cols-2 lg:grid-cols-3">
        {procesedDataNyTimes.map((value, index) => (
          <Article key={index} data={value} />
        ))}
        {procesedDataNewsApi.map((value, index) => (
          <Article key={index} data={value} />
        ))}
        {procesedDataGNewsApi.map((value, index) => (
          <Article key={index} data={value} />
        ))}
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default OnMountApi;
