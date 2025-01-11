import { Skeleton } from '@/components/ui/skeleton';

const LoaderSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full h-8 bg-muted-foreground/30" />
      <Skeleton className="w-full h-8 bg-muted-foreground/30" />
      <Skeleton className="w-full h-8 bg-muted-foreground/30" />
    </div>
  );
};

export default LoaderSkeleton;
