import backupImage from '../../picture/NEWS.jpg';

function Article({ data }) {
  const { title, content, date, source, image, link } = data;

  const backgroundImage = image ? `url(${image})` : `url(${backupImage})`;

  return (
    <div
      className={`relative flex-grow overflow-hidden rounded-xl caret-transparent shadow-md sm:h-full`}
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div></div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-background to-transparent p-6"
      >
        <h1 className="text-[clamp(1.25rem, calc(1.2vw + 0.8rem), 2rem)] line-clamp-1 text-3xl leading-tight text-white">
          {title}
        </h1>

        <div className="pt-3">
          <p className="text-l line-clamp-1 text-[clamp(0.875rem,_calc(1vw_+_0.5rem),_1.25rem)] text-white">
            {content}
          </p>
        </div>

        <div className={`flex w-auto flex-row justify-between sm:pt-8`}>
          <div className="text-white">
            <span className="pr-1">{source}</span> |{' '}
            <span className="pl-1 text-primary">{date}</span>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Article;
