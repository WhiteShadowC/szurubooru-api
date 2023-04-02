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
export interface SzuruVersion {
  version: number;
}
export interface SzuruQuery<T extends object> {
  query: T;
}
export interface SzuruEndpointArgs<T extends object> {
  endpoint: T;
}
