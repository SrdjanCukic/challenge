import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useGlobalContext } from '../../service/GlobalContext.jsx';

function SkeletonSearchArticle() {
  const { state } = useGlobalContext();
  const theme = state.theme;

  const baseColor = theme === 'dark' ? '#202020' : '#e0e0e0';
  const highlightColor = theme === 'dark' ? '#444' : '#f5f5f5';

  return (
    <div
      className={`relative min-h-[300px] flex-grow overflow-hidden rounded bg-background-card caret-transparent shadow-md`}
    >
      <div className="absolute right-0 top-0 rounded bg-background/70 object-right p-1 text-primary opacity-100 backdrop-blur-lg">
        <Skeleton
          circle={true}
          height={24}
          width={24}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-background/40 px-4 pt-4 backdrop-blur-lg`}
      >
        <Skeleton
          height={30}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <hr className="h-0.5 border-0 bg-primary opacity-100" />
        <div className="relative">
          <Skeleton
            count={2}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </div>
        <div className={`mt-2 flex w-auto flex-row justify-between opacity-70`}>
          <Skeleton
            width={80}
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

export default SkeletonSearchArticle;
