import type { User } from '@/lib/types';

export default function UserInfoCard({ id, username, name, bio, createdAt }: User) {
  // TODO: Standardize the style in globals.css, add createdAt
  return (
    <div className="flex flex-col gap-4">
      <span className="card-title-large">{name}</span>
      <span className="text-muted">@{username}</span>
      <div className="card-text">{bio}</div>
    </div>
  );
}
