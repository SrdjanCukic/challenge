import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import backupImage from '../picture/NEWS.jpg';

function Article({ data, isLarge }) {
  const { title, content, date, source, image, link } = data;

  const backgroundImage = image ? `url(${image})` : `url(${backupImage})`;

  return (
    <div
      className={`relative min-h-[300px] flex-grow overflow-hidden rounded bg-background-card caret-transparent shadow-md ${
        isLarge ? 'sm:h-full' : ''
      } `}
    >
      <div
        className={`absolute left-0 right-0 top-0 h-1/2 ${isLarge ? 'sm:h-4/5' : ''}`}
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        className="absolute right-0 top-0 rounded bg-background/70 object-right p-1 text-primary opacity-100 backdrop-blur-lg"
      >
        <OpenInNewIcon />
      </a>
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-background/70 px-4 pt-4 backdrop-blur-lg ${
          isLarge ? 'sm:h-1/5' : ''
        }`}
      >
        <h1 className="line-clamp-1 font-bold text-primary">{title}</h1>

        <hr className="my-2w h-1 border-0 bg-primary opacity-100" />

        <div className="relative">
          <p className="line-clamp-2 text-[clamp(0.875rem,_calc(1vw_+_0.5rem),_1.25rem)] text-foreground">
            {content}
          </p>
        </div>

        <div
          className={`mt-2 flex w-auto flex-row justify-between opacity-70 ${isLarge ? 'sm:pt-8' : ''}`}
        >
          <div className="p-2 text-primary">{date}</div>
          <div className="max-w-[200px] truncate p-2 text-primary">
            {source}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
