import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useGlobalContext } from '../../service/GlobalContext.jsx';

function SkeletonSmallArticle() {
  const { state } = useGlobalContext();
  const theme = state.theme;

  const baseColor = theme === 'dark' ? '#202020' : '#e0e0e0';
  const highlightColor = theme === 'dark' ? '#444' : '#f5f5f5';

  return (
    <div className="relative flex min-h-[150px] items-center overflow-hidden rounded-xl bg-gradient-to-r from-black via-background to-black p-4 shadow-lg">
      {/* Image Placeholder */}
      <div className="aspect-[5/4] w-1/3 shrink-0 rounded-lg bg-gray-400">
        <Skeleton
          height="100%"
          width="100%"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </div>

      {/* Content Placeholder */}
      <div className="ml-4 flex h-full grow flex-col justify-between">
        {/* Title */}
        <Skeleton
          count={2}
          width="100%"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />

        {/* Source & Date */}
        <div className="mt-2 flex justify-start space-x-2">
          <Skeleton
            width={80}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
          <Skeleton
            width={50}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </div>
      </div>
    </div>
  );
}

export default SkeletonSmallArticle;
