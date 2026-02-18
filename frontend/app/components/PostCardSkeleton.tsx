export default function PostCardSkeleton() {
  return (
    <article className="flex flex-col gap-2">
      <header className="flex items-center gap-4">
        <div className="h-6 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-5 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-4 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
      </header>
      <div className="space-y-2 px-2">
        <div className="h-6 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
      </div>
      <div className="h-6 w-16 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
    </article>
  );
}
