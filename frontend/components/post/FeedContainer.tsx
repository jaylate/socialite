import { Suspense } from 'react';
import Feed from './Feed';
import FeedSkeleton from './FeedSkeleton';
import type { FeedProps } from '@/lib/types';

export default function FeedContainer({ fetchPosts }: FeedProps) {
  return (
    <Suspense fallback={<FeedSkeleton />}>
      <Feed fetchPosts={fetchPosts} />
    </Suspense>
  );
}
