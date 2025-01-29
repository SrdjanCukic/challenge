import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonArticle = ({ isLarge }) => {
  return (
    <div
      className={`relative min-h-[300px] flex-grow overflow-hidden rounded bg-background-card caret-transparent shadow-md ${
        isLarge ? 'sm:h-full' : ''
      }`}
    >
      <div
        className={`absolute left-0 right-0 top-0 h-1/2 ${isLarge ? 'sm:h-4/5' : ''}`}
      >
        <Skeleton height="100%" highlightColor="#d1c5c5" />
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-background/70 px-4 pt-4 backdrop-blur-lg ${
          isLarge ? 'sm:h-1/5' : ''
        }`}
      >
        <Skeleton count={2} />
        <div
          className={`mt-2 flex w-auto flex-row justify-between opacity-70 ${isLarge ? 'sm:pt-8' : ''}`}
        >
          <Skeleton width={80} />
          <Skeleton width={80} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonArticle;
