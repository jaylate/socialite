import { PageLayout, MainLayout } from '@/components/layout';
import UserInfoCard from '@/components/user/UserInfoCard';
import FeedContainer from '@/components/post/FeedContainer';
import type { User } from '@/lib/types';
import { userService, postService } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function User({
  searchParams,
}: {
  searchParams: Promise<{ originalPath?: string; username?: string }>;
}) {
  const { originalPath, username } = await searchParams;
  // Everything which wasn't matched by other routes and
  // is not a username can be reported as not found
  if (!originalPath?.startsWith('/@') || !username) {
    notFound();
  }

  let userInfo: User | null;
  try {
    userInfo = await userService.getInfo(username);
  } catch {
    notFound();
  }

  const getPostsByUser = () => postService.getByUser(username);

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
