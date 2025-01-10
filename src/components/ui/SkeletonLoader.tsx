import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonLoaderProps {
  count?: number;
  height?: number;
  className?: string;
}

export default function SkeletonLoader({ count = 1, height = 20, className = '' }: SkeletonLoaderProps) {
  return (
    <Skeleton
      count={count}
      height={height}
      className={className}
      baseColor="#f3f4f6"
      highlightColor="#e5e7eb"
    />
  );
}