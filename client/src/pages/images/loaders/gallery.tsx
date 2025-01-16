import { Skeleton } from '@/components/ui/skeleton';

const SkeletonGallery = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Skeleton className="aspect-square bg-muted-foreground/30" />
      <Skeleton className="aspect-square bg-muted-foreground/30" />
      <Skeleton className="aspect-square bg-muted-foreground/30" />
      <Skeleton className="aspect-square bg-muted-foreground/30" />
      <Skeleton className="aspect-square bg-muted-foreground/30" />
      <Skeleton className="aspect-square bg-muted-foreground/30" />
      <Skeleton className="aspect-square bg-muted-foreground/30" />
      <Skeleton className="aspect-square bg-muted-foreground/30" />
    </div>
  );
};

export default SkeletonGallery;
