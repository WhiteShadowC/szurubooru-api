interface Post {
  version: number;
  id: number;
  creationTime: string;
  lastEditTime: string;
  safety: 'save' | 'sketchy' | 'unsafe';
  // string delimited with \n
  source: string;
  type: 'image' | 'animation' | 'video' | 'flash' | 'youtube';
  checksum: string;
  checksumMD5: string;
  canvasWidth: number;
  canvasHeight: number;
  contentUrl: string;
  thumbnailUrl: string;
  // todo
  flags: string[]; // todo flags are 'loop' and 'sound'
  tags: MicroTag[];
  relations: MicroPost[];
  notes: Note[];
  user: MicroUser;
  score: number;
  ownScore: number;
  ownFavorite: boolean;
  tagCount: number;
  favoriteCount: number;
  commentCount: number;
  noteCount: number;
  featureCount: number;
  relationCount: number;
  lastFeatureTime: string | null;
  favoritedBy: MicroUser[];
  hasCustomThumbnail: boolean;
  mimeType: string;
  comments: Comment[];
  pools: MicroPool[];
}

type MicroPost = Pick<Post, 'id' | 'thumbnailUrl'>;
