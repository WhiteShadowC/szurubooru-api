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
export interface SzuruCreateRequest<T, F extends keyof T, P> extends SzuruRequest<T, F> {
  payload: P;
}

export interface SzuruDeleteRequest {
  version: number;
}
export type SzuruModifyRequest<T, F extends keyof T, P> = SzuruDeleteRequest & SzuruCreateRequest<T, F, P>;
