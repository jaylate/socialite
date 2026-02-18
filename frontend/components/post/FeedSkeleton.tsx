import PostCardSkeleton from './PostCardSkeleton';

export default function FeedSkeleton() {
  return (
    <div className="mt-10 flex-col space-y-5">
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  );
}
