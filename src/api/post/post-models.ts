import type { MicroTag } from '../tag/tag-models';
import type { MicroUser } from '../user/user-models';
import type { MicroPool } from '../../models/models';

export interface Post {
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
  // todo flags are 'loop' and 'sound'
  flags: string[];
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

export type MicroPost = Pick<Post, 'id' | 'thumbnailUrl'>;

export interface Note {
  polygon: Array<[number, number]>;
  text: string;
}
