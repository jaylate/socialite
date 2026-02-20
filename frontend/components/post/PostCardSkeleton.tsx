export default function PostCardSkeleton() {
  return (
    <article className="layout-post-card">
      <header className="layout-post-header">
        <div className="bg-skeleton h-6 w-32 animate-pulse rounded" />
        <div className="bg-skeleton h-5 w-24 animate-pulse rounded" />
        <div className="bg-skeleton h-4 w-20 animate-pulse rounded" />
      </header>
      <div className="space-y-2 px-2">
        <div className="bg-skeleton h-6 w-full animate-pulse rounded" />
        <div className="bg-skeleton h-6 w-3/4 animate-pulse rounded" />
      </div>
      <div className="bg-skeleton h-6 w-16 animate-pulse rounded" />
    </article>
  );
}
