function Article(props) {
  const getTitle = props => {
    if (!props?.data) return 'No Title Available';

    return (
      props.data.headline?.main || props.data.title || 'No Title Available'
    );
  };

  const getContent = props => {
    if (!props?.data) return 'No Content Available';

    return props.data.abstract || props.data.content || 'No Content Available';
  };

  const getAuthor = props => {
    if (!props?.data) return 'Unknown author';

    return (
      props.data.byline?.original ||
      props.data.author ||
      props.data.byline ||
      'Unknown author'
    );
  };

  const getImage = props => {
    if (!props?.data) return null;

    return (
      props.data.multimedia?.[0]?.url ||
      props.data.urlToImage ||
      props.data.image ||
      null
    );
  };

  const getDate = props => {
    if (!props?.data) return 'Unknown Date';

    return (
      props.data.published_date ||
      props.data.publishedAt ||
      props.data.pub_date ||
      'Unknown Date'
    );
  };

  const getSource = props => {
    if (!props?.data) return null;

    return props.data.source?.name || props.data.source || null;
  };

  const formatDate = dateString => {
    if (!dateString || dateString === 'Unknown Date') return 'Unknown Date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  // Get values
  const title = getTitle(props);
  const content = getContent(props);
  const author = getAuthor(props);
  const image = getImage(props);
  const date = formatDate(getDate(props));
  const source = getSource(props);

  return (
    <div
      className={`relative flex min-h-[300px] items-end justify-center overflow-hidden rounded bg-slate-600 shadow-md ${image ? '' : 'bg-gradient-to-r from-sky-500 to-indigo-500'}`}
      style={{
        backgroundImage: image ? `url(${image})` : '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/30 p-4 pb-0 backdrop-blur-lg">
        <h1 className="line-clamp-1 font-bold text-yellow-500">{title}</h1>

        <hr className="my-2w h-1 border-0 bg-yellow-500 opacity-100" />

        <div className="relative">
          <p className="text-[clamp(0.875rem, 1vw + 0.5rem, 1.25rem)] line-clamp-2 text-white">
            {content}
          </p>

          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t"></div>
        </div>

        <div className="relative bottom-[-1.5rem] mt-2 flex w-auto flex-row justify-between opacity-70">
          <div className="text-[clamp(0.75rem, 1vw + 0.25rem, 1rem)] text-yellow-500">
            {date}
          </div>
          <div className="text-[clamp(0.875rem, 1vw + 0.5rem, 1.25rem)] right-0 text-yellow-500">
            {source ? source : author}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
