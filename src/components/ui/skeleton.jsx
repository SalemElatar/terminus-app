import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

function PostSkeleton({ ...props }) {
  return (
    <Skeleton className="w-full p-4 mb-4 space-y-2 rounded-lg" {...props}>
      <div className="flex gap-2 mb-4">
        <Skeleton className="rounded-full w-7 h-7 bg-muted-foreground/50" />
        <Skeleton className="w-20 h-7 bg-muted-foreground/50" />
      </div>
      <Skeleton className="w-56 h-4 my-4 bg-muted-foreground/50" />
      <Skeleton className="h-4 my-4 w-72 bg-muted-foreground/50" />
      <Skeleton className="w-3/4 h-4 my-4 bg-muted-foreground/50" />
      <div className="flex gap-2 mb-4">
        <Skeleton className="w-16 h-7 bg-muted-foreground/50" />
        <Skeleton className="w-16 h-7 bg-muted-foreground/50" />
      </div>
    </Skeleton>
  );
}

export { Skeleton, PostSkeleton };
