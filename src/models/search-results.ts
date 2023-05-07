export interface UnpagedSearchResult<T, F extends keyof T = keyof T> {
  results: Array<Pick<T, F>>;
}

export interface PagedSearchResult<T, F extends keyof T = keyof T> extends UnpagedSearchResult<T, F> {
  query: string;
  offset: number;
  limit: number;
  total: number;
}

export interface ImageSearchResult<F extends keyof Post> {
  exactPost: F;
  similarPosts: Array<{
    post: F;
    distance: number;
  }>;
}
// todo T can be removed tbh
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

export interface SzuruUpload<T extends string> {
  upload:
    | Only<Record<`${T}Token`, string>, Record<T, never> & Record<`${T}Url`, never>>
    | Only<Record<T, string>, Record<`${T}Url`, never> & Record<`${T}Token`, never>>
    | Only<Record<`${T}Url`, string>, Record<T, never> & Record<`${T}Token`, never>>;
}

export interface SzuruVersion {
  payload: { version: number };
}
export interface SzuruQuery<T extends object> {
  query: T;
}
export type SzuruEndpointArgs<T extends string> = {
  [K in T]: string | number;
};

export type SzuruResponse<T, F extends keyof T> = Pick<T, F>;
