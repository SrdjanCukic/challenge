import backupImage from '../../picture/NEWS.jpg';

function SmallArticle({ data }) {
  const { title, date, source, image, link } = data;

  const backgroundImage = image ? `url(${image})` : `url(${backupImage})`;

  return (
    <div className="relative flex min-h-[150px] items-center overflow-hidden rounded-xl bg-gradient-to-r from-black via-background to-black p-4 shadow-lg">
      <div
        className="aspect-[5/4] w-1/3 shrink-0 rounded-lg object-cover"
        style={{
          backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="ml-4 flex h-full grow flex-col justify-between text-white">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-auto line-clamp-3 text-[clamp(0.875rem,_calc(1vw+0.5rem),_1.25rem)] text-lg leading-tight"
        >
          {title}
        </a>

        <div className="text-sm">
          <span className="pr-1">{source}</span> |{' '}
          <span className="pl-1 text-primary">{date}</span>
        </div>
      </div>
    </div>
  );
}

export default SmallArticle;
