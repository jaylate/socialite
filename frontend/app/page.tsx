import { PageLayout, MainLayout } from '@/components/layout';
import CreatePost from '@/components/post/CreatePost';
import FeedContainer from '@/components/post/FeedContainer';
import AuthGuard from '@/components/auth/AuthGuard';
import { postService } from '@/lib/api';

export default function Home() {
  return (
    <AuthGuard>
      <PageLayout>
        <MainLayout>
          <div className="layout-main-content">
            <CreatePost />
            <FeedContainer fetchPosts={postService.getAll} />
          </div>
        </MainLayout>
      </PageLayout>
    </AuthGuard>
  );
}
