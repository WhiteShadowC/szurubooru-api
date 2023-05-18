import { SzuruBaseApi } from '../szuru-base-api';
import {
  type PagedSearchResult,
  type SzuruEndpointArgs,
  type SzuruPayload,
  type SzuruRequest,
  type SzuruResponse,
  type SzuruVersion,
} from '../../models/search-results';
import { type PagedSearchResultQuery } from '../utils/search-results';

type CreateTagDTO = SzuruPayload<Pick<Tag, 'names' | 'category'> & Partial<Pick<Tag, 'description' | 'implications' | 'suggestions'>>>;
export class TagCategoryApi extends SzuruBaseApi {
  async getTags<F extends keyof Tag>(args: SzuruRequest<Tag, F> & PagedSearchResultQuery): Promise<PagedSearchResult<Tag, F>> {
    return await this.request('GET', 'tags', args);
  }

  async createTag<F extends keyof Tag>(args: SzuruRequest<Tag, F> & CreateTagDTO): Promise<SzuruResponse<Tag, F>> {
    return await this.request('POST', 'tags', args);
  }

  async updateTag<F extends keyof Tag>(
    args: SzuruRequest<Tag, F> & Partial<CreateTagDTO> & SzuruVersion & SzuruEndpointArgs<'name'>
  ): Promise<SzuruResponse<Tag, F>> {
    return await this.request('PUT', `tags/${args.name}`, args);
  }

  async getTag<F extends keyof Tag>(args: SzuruRequest<Tag, F> & SzuruEndpointArgs<'name'>): Promise<SzuruResponse<Tag, F>> {
    return await this.request('GET', `tags/${args.name}`, args);
  }

  async deleteTag<F extends keyof Tag>(args: SzuruVersion & SzuruEndpointArgs<'name'>): Promise<object> {
    return await this.request('DELETE', `tags/${args.name}`, args);
  }

  async mergeTags<F extends keyof Tag>(
    args: SzuruPayload<{ removeVersion: number; mergeToVersion: number; remove: string; mergeTo: string }>
  ): Promise<SzuruResponse<Tag, F>> {
    return await this.request('POST', 'tag-merge', args);
  }

  async getTagSiblings<F extends keyof Tag>(
    args: SzuruRequest<Tag, F> & SzuruEndpointArgs<'name'>
  ): Promise<{ results: Array<{ tag: SzuruResponse<Tag, F>; occurrences: number }> }> {
    return await this.request('GET', `tag-siblings/${args.name}`, args);
  }
}
