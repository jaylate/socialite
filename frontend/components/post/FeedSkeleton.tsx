import PostCardSkeleton from './PostCardSkeleton';

export default function FeedSkeleton() {
  return (
    <div className="layout-feed">
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  );
}
