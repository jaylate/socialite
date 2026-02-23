import { PageLayout, MainLayout } from '@/components/layout';
import CreatePost from '@/components/post/CreatePost';
import Feed from '@/components/post/Feed';

export default function Home() {
  return (
    <PageLayout>
      <MainLayout>
        <div className="layout-main-content">
          <CreatePost />
          <Feed type="all" />
        </div>
      </MainLayout>
    </PageLayout>
  );
}
