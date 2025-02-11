import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function SearchArticle({ data }) {
  const { title, content, date, source, image, link } = data;

  return (
    <div
      className="relative min-h-[300px] overflow-hidden rounded bg-[url(/src/picture/NEWS.jpg)] caret-transparent shadow-md"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        className="absolute right-0 top-0 rounded bg-background/30 object-right p-1 text-primary opacity-100 backdrop-blur-lg"
      >
        <OpenInNewIcon />
      </a>

      {/* Bottom Content Wrapper - FLEX COLUMN FIX */}
      <div className="absolute bottom-0 left-0 right-0 flex h-1/2 flex-col bg-background/70 px-4 pt-4 backdrop-blur-lg">
        {/* Title */}
        <h1 title={title} className="line-clamp-1 text-2xl text-primary">
          {title}
        </h1>

        <hr className="h-0.5 border-0 bg-primary opacity-100" />

        {/* Content with flex-grow to take space */}
        <div className="relative flex-grow">
          <p className="line-clamp-2 text-[clamp(0.875rem,_calc(1vw+0.5rem),_1.25rem)] text-white">
            {content}
          </p>
        </div>

        {/* Date & Source - mt-auto ensures they stay at the bottom */}
        <div className="mt-auto flex w-auto flex-row justify-between pb-2">
          <div className="text-xl text-primary">{date}</div>
          <div className="max-w-[200px] truncate text-xl text-primary">
            {source}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchArticle;
