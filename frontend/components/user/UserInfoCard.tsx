import type { User } from '@/lib/types';

export default function UserInfoCard({ username, name, bio, createdAt }: User) {
  // TODO: Standardize the style in globals.css
  // FIXME: createdAt is not visible for anyone but it is there
  return (
    <div className="flex flex-col gap-4">
      <span className="card-title-large">{name ?? username}</span>
      <span className="text-muted">@{username}</span>
      <div className="card-text">{bio}</div>
      <span className="sr-only">{createdAt}</span>
    </div>
  );
}
