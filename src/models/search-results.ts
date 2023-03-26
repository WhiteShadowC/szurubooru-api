interface UnpagedSearchResult<T, F extends keyof T = keyof T> {
  results: Array<Pick<T, F>>;
}

interface PagedSearchResult<T, F extends keyof T = keyof T> extends UnpagedSearchResult<T, F> {
  query: string;
  offset: number;
  limit: number;
  total: number;
}

interface ImageSearchResult {
  exactPost: Post;
  similarPosts: Array<{
    post: Post;
    distance: number;
  }>;
}

type SzuruResult<T, E extends SzuruErrors = SzuruErrors> = { result: 'success'; value: T } | { result: 'error'; error: SzuruError<E> };

interface SzuruRequest<T, F extends keyof T> {
  fields?: F[];
}
interface SzuruCreateRequest<T, F extends keyof T, P> extends SzuruRequest<T, F> {
  payload: P;
}

interface SzuruDeleteRequest {
  version: number;
}
type SzuruModifyRequest<T, F extends keyof T, P> = SzuruDeleteRequest & SzuruCreateRequest<T, F, P>;
