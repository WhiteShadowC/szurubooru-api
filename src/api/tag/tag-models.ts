export interface Tag {
  version: number;
  names: string[];
  category: string;
  implications: string[];
  suggestions: string[];
  creationTime: string;
  lastEditTime: string;
  usages: number;
  description: string;
}

export type MicroTag = Pick<Tag, 'names' | 'category' | 'usages'>;
