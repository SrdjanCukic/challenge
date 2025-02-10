import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useGlobalContext } from '../../service/GlobalContext.jsx';

function SkeletonBigArticle() {
  const { state } = useGlobalContext();
  const theme = state.theme;

  const baseColor = theme === 'dark' ? '#202020' : '#e0e0e0';
  const highlightColor = theme === 'dark' ? '#444' : '#f5f5f5';

  return (
    <div className="relative flex-grow animate-pulse overflow-hidden rounded-xl bg-gray-300 shadow-md sm:h-full">
      {/* Background Placeholder */}
      <div className="absolute inset-0 bg-gray-400" />

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-background to-transparent p-6">
        {/* Title */}
        <Skeleton
          height={30}
          width="80%"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />

        {/* Content */}
        <div className="pt-3">
          <Skeleton
            height={20}
            width="90%"
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </div>

        {/* Source & Date */}
        <div className="flex w-auto flex-row justify-between sm:pt-8">
          <Skeleton
            width={100}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
          <Skeleton
            width={80}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </div>
      </div>
    </div>
  );
}

export default SkeletonBigArticle;
