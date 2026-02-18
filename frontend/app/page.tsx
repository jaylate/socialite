import Header from './components/Header';
import CreatePost from './components/CreatePost';
import Feed from './components/Feed';
import FeedSkeleton from './components/FeedSkeleton';
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
