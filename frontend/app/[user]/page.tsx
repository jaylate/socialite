import UserInfoCard from '@/components/user/UserInfoCard';
import Feed from '@/components/post/Feed';
import type { User } from '@/lib/types';
import { userService } from '@/lib/api';
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

  return (
    <div className="layout-main-content">
      <UserInfoCard {...userInfo} />
      <Feed type="user" username={username} />
    </div>
  );
}
