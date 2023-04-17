export interface UnpagedSearchResult<T, F extends keyof T = keyof T> {
  results: Array<Pick<T, F>>;
}

export interface PagedSearchResult<T, F extends keyof T = keyof T> extends UnpagedSearchResult<T, F> {
  query: string;
  offset: number;
  limit: number;
  total: number;
}

export interface ImageSearchResult {
  exactPost: Post;
  similarPosts: Array<{
    post: Post;
    distance: number;
  }>;
}

export interface SzuruRequest<T, F extends keyof T> {
  fields?: F[];
}
export interface SzuruPayload<T> {
  payload: T;
}

type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};
// type SzuruUploadProp<T extends string> = Record<T, any> & Record<`${T}Url`, string> & Record<`${T}Token`, string>;
export type SzuruUploadProp<T extends string> =
  | Only<Record<`${T}Token`, string>, Record<T, never> & Record<`${T}Url`, never>>
  | Only<Record<T, string>, Record<`${T}Url`, never> & Record<`${T}Token`, never>>
  | Only<Record<`${T}Url`, string>, Record<T, never> & Record<`${T}Token`, never>>;
export interface SzuruUpload<T extends string> {
  // upload: Partial<Record<T, any> & Record<`${T}Url`, string> & Record<`${T}Token`, string>>;
  upload: {
    [K in T]: SzuruUploadProp<K>;
  };
}
export interface SzuruVersion {
  version: number;
}
export interface SzuruQuery<T extends object> {
  query: T;
}
export interface SzuruEndpointArgs<T extends object> {
  endpoint: T;
}

export type SzuruResponse<T, F extends keyof T> = Pick<T, F>;
