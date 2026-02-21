export type User = {
  id: number;
  username: string;
  name?: string;
  bio?: string;
  createdAt: string; // FIXME: Should be Date
};
