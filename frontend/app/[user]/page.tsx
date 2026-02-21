import { PageLayout, MainLayout } from '@/components/layout';
import UserInfoCard from '@/components/user/UserInfoCard';
import FeedContainer from '@/components/post/FeedContainer';
import { userService, postService } from '@/lib/api';

export default async function User({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const userInfo = await userService.getInfo(1); // FIXME: Should get username as parameter
  // TODO: If userInfo is null/errors/etc return notFound()
  const getPostsByUser = () => postService.getByUserId(1); // FIXME: Should be getByUsername

  return (
    <PageLayout>
      <MainLayout>
        <div className="layout-main-content">
          <UserInfoCard {...userInfo} />
          <FeedContainer fetchPosts={getPostsByUser} />
        </div>
      </MainLayout>
    </PageLayout>
  );
}
