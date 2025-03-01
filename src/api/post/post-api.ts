import { SzuruBaseApi } from '../szuru-base-api';
import { type PagedSearchResultQuery } from '../utils/search-results';
import {
  type ImageSearchResult,
  type PagedSearchResult,
  type SzuruEndpointArgs,
  type SzuruPayload,
  type SzuruRequest,
  type SzuruResponse,
  type SzuruUpload,
  type SzuruVersion,
} from '../../models/search-results';
import type { Post } from "./post-models";

type CreatePostDTO = SzuruPayload<Pick<Post, 'tags' | 'safety'> & Partial<Pick<Post, 'source' | 'relations' | 'notes' | 'flags'>> & { anonymous: boolean }>;
type UpdatePostDTO = SzuruPayload<Partial<Pick<Post, 'safety' | 'source' | 'relations' | 'notes' | 'flags'>> & { tags: string[] }>;
export class PostApi extends SzuruBaseApi {
  async getPosts<F extends keyof Post = keyof Post>(args: SzuruRequest<Post, F> & PagedSearchResultQuery): Promise<SzuruResponse<PagedSearchResult<Post, F>>> {
    return await this.request('GET', 'posts', { query: args });
  }

  // todo thumbnail is optional
  async createPosts<F extends keyof Post = keyof Post>(
    args: SzuruRequest<Post, F> & PagedSearchResultQuery & CreatePostDTO & SzuruUpload<'content' | 'thumbnail'>
  ): Promise<SzuruResponse<Pick<Post, F>>> {
    return await this.request('POST', 'posts', args);
  }

  // todo content of szuruupload needs to be partial, not the upload itself
  async updatePost<F extends keyof Post = keyof Post>(
    args: SzuruRequest<Post, F> & SzuruVersion & SzuruEndpointArgs<'id'> & UpdatePostDTO & Partial<SzuruUpload<'content' | 'thumbnail'>>
  ): Promise<SzuruResponse<Pick<Post, F>>> {
    return await this.request('PUT', `posts/${args.id}`, args);
  }

  async getPost<F extends keyof Post = keyof Post>(
    args: SzuruRequest<Post, F> & PagedSearchResultQuery & SzuruEndpointArgs<'id'>
  ): Promise<SzuruResponse<{ prev: Pick<Post, F>; next: Pick<Post, F> }>> {
    return await this.request('GET', `posts/${args.id}/around`, args);
  }

  async deletePost(args: SzuruVersion & SzuruEndpointArgs<'id'>): Promise<object> {
    return await this.request('DELETE', `posts/${args.id}`, args);
  }

  async mergePosts<F extends keyof Post = keyof Post>(
    args: SzuruPayload<{ removeVersion: number; mergeToVersion: number; remove: string; mergeTo: string; replaceContent: boolean }>
  ): Promise<SzuruResponse<Pick<Post, F>>> {
    return await this.request('POST', 'post-merge', args);
  }

  async ratePost<F extends keyof Post = keyof Post>(
    args: SzuruEndpointArgs<'id'> & SzuruPayload<{ score: -1 | 0 | 1 }>
  ): Promise<SzuruResponse<Pick<Post, F>>> {
    return await this.request('PUT', `post/${args.id}/score`, args);
  }

  async favoritePost<F extends keyof Post = keyof Post>(args: SzuruEndpointArgs<'id'>): Promise<SzuruResponse<Pick<Post, F>>> {
    return await this.request('POST', `post/${args.id}/favorite`, args);
  }

  async unfavoritePost<F extends keyof Post = keyof Post>(args: SzuruEndpointArgs<'id'>): Promise<SzuruResponse<Pick<Post, F>>> {
    return await this.request('DELETE', `post/${args.id}/favorite`, args);
  }

  async getFeaturedPost<F extends keyof Post = keyof Post>(): Promise<SzuruResponse<Pick<Post, F>> | null> {
    return await this.request('GET', `featured-post`, {});
  }

  async setFeaturedPost<F extends keyof Post = keyof Post>(
    args: SzuruPayload<{ id: number; }>
  ): Promise<SzuruResponse<Pick<Post, F>>> {
    return await this.request('POST', `featured-post`, {});
  }

  async reverseImageSearch<F extends keyof Post = keyof Post>(args: SzuruUpload<'content'>): Promise<SzuruResponse<ImageSearchResult<F>>> {
    return await this.request('POST', `posts/reverse-search`, {});
  }
}
