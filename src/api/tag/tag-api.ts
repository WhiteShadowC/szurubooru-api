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
import type { Tag } from './tag-models';

type CreateTagDTO = SzuruPayload<Pick<Tag, 'names' | 'category'> & Partial<Pick<Tag, 'description' | 'implications' | 'suggestions'>>>;
export class TagApi extends SzuruBaseApi {
  async getTags<F extends keyof Tag>(
    args: SzuruRequest<Tag, F> & PagedSearchResultQuery
  ): Promise<SzuruResponse<PagedSearchResult<Tag, F>>> {
    return await this.request('GET', 'tags', args);
  }

  async createTag<F extends keyof Tag = keyof Tag>(
    args: SzuruRequest<Tag, F> & CreateTagDTO
  ): Promise<SzuruResponse<Pick<Tag, F>>> {
    return await this.request('POST', 'tags', args);
  }

  async updateTag<F extends keyof Tag = keyof Tag>(
    args: SzuruRequest<Tag, F> & Partial<CreateTagDTO> & SzuruVersion & SzuruEndpointArgs<'name'>
  ): Promise<SzuruResponse<Pick<Tag, F>>> {
    return await this.request('PUT', `tags/${args.name}`, args);
  }

  async getTag<F extends keyof Tag = keyof Tag>(
      args: SzuruRequest<Tag, F> & SzuruEndpointArgs<'name'>
  ): Promise<SzuruResponse<Pick<Tag, F>>> {
    return await this.request('GET', `tags/${args.name}`, args);
  }

  async deleteTag(
    args: SzuruVersion & SzuruEndpointArgs<'name'>
  ): Promise<object> {
    return await this.request('DELETE', `tags/${args.name}`, args);
  }

  async mergeTags<F extends keyof Tag = keyof Tag>(
    args: SzuruPayload<{ removeVersion: number; mergeToVersion: number; remove: string; mergeTo: string }>
  ): Promise<SzuruResponse<Pick<Tag, F>>> {
    return await this.request('POST', 'tag-merge', args);
  }

  async getTagSiblings<F extends keyof Tag = keyof Tag>(
    args: SzuruRequest<Tag, F> & SzuruEndpointArgs<'name'>
  ): Promise<SzuruResponse<{ results: Array<{ tag: Pick<Tag, F>; occurrences: number }> }>> {
    return await this.request('GET', `tag-siblings/${args.name}`, args);
  }
}
