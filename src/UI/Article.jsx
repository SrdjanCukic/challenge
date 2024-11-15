import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
      null
    );
  };

  const getLink = props => {
    if (!props?.data) return 'There is no link';

    return props.data.url || props.data.web_url || 'There is no link';
  };

  const getImage = props => {
    if (!props?.data) return null;
    if (props.data.urlToImage) return props.data.urlToImage;
    if (props.data.image) return props.data.image;
    if (props.data.multimedia && props.data.multimedia.length > 0) {
      const mediaUrl = props.data.multimedia[0].url;
      if (mediaUrl) {
        return mediaUrl.startsWith('https://static01.nyt.com/')
          ? mediaUrl
          : `https://static01.nyt.com/${mediaUrl}`;
      }
    }

    return null;
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
      className={`bg-grey relative min-h-[300px] flex-grow items-end justify-center overflow-hidden rounded caret-transparent shadow-md ${image ? '' : 'from-transitionStart to-transitionEnd bg-gradient-to-r'}`}
      style={{
        backgroundImage: image ? `url(${image})` : '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <a
        href={getLink(props)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        className={
          'text-primary absolute right-0 top-0 bg-black/60 object-right p-1 opacity-100'
        }
      >
        <OpenInNewIcon />
      </a>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/60 p-4 backdrop-blur-lg">
        <h1 className="text-primary line-clamp-1 font-bold">{title}</h1>

        <hr className="my-2w bg-primary h-1 border-0 opacity-100" />

        <div className="relative">
          <p className="text-secondary line-clamp-2 text-[clamp(0.875rem,_calc(1vw_+_0.5rem),_1.25rem)]">
            {content}
          </p>
        </div>

        <div className="mt-2 flex w-auto flex-row justify-between opacity-70">
          <div className="text-primary">{date}</div>
          <div className="text-primary max-w-[200px] truncate">
            {author ? author : source}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
