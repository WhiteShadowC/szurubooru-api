interface UserToken {
  user: MicroUser;
  token: string;
  note: string;
  enabled: true;
  expirationTime: string | null;
  version: number;
  creationTime: string;
  lastEditTime: string;
  lastUsageTime: string;
}

interface Note {
  polygon: Array<[number, number]>;
  text: string;
}

interface PoolCategory {
  version: number;
  name: string;
  color: string;
  usages: number;
  default: boolean;
}

interface Pool {
  version: number;
  id: number;
  names: string[];
  category: string;
  posts: MicroPost[];
  creationTime: string;
  lastEditTime: string;
  postCount: number;
  description: string;
}

type MicroPool = Pick<Pool, 'id' | 'names' | 'category' | 'description' | 'postCount'>;

interface Comment {
  version: number;
  id: number;
  postId: number;
  user: MicroUser;
  text: string;
  creationTime: string;
  lastEditTime: string | null;
  score: number;
  ownScore: number;
}

// todo make data type safe https://github.com/microsoft/TypeScript/pull/47109
interface Snapshot {
  operation: 'created' | 'modified' | 'deleted' | 'merged';
  user: MicroUser;
  time: string;
  type: 'tag' | 'tag_category' | 'post' | 'pool';
  id: string | number;
  data: any;
}
