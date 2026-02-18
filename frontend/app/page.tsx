import Header from '@/components/layout/Header';
import CreatePost from '@/components/post/CreatePost';
import Feed from '@/components/post/Feed';
import FeedSkeleton from '@/components/post/FeedSkeleton';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl">
      <Header />
      <div className="px-50">
        <CreatePost />
        <Suspense fallback={<FeedSkeleton />}>
          <Feed />
        </Suspense>
      </div>
    </div>
  );
}
