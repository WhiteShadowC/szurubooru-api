interface User {
  version: number;
  name: string;
  email: string | false | null;
  rank: 'restricted' | 'regular' | 'power' | 'moderator' | 'administrator';
  lastLoginTime: string;
  creationTime: string;
  avatarStyle: 'gravatar' | 'manual';
  avatarUrl: string;
  commentCount: number;
  uploadedPostCount: number;
  likedPostCount: number;
  dislikedPostCount: number;
  favoritePostCount: number;
}

type MicroUser = Pick<User, 'name' | 'avatarUrl'>;
