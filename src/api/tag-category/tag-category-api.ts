import { SzuruBaseApi } from '../szuru-base-api';
import {
  type SzuruEndpointArgs,
  type SzuruPayload,
  type SzuruRequest,
  type SzuruResponse,
  type SzuruVersion,
  type UnpagedSearchResult,
} from '../../models/search-results';
import { type TagCategory } from './tag-category-models';

type CreateUpdateTagCategoryDTO = Pick<TagCategory, 'name' | 'color' | 'order'>;

export class TagCategoryApi extends SzuruBaseApi {
  async getTagCategories<F extends keyof TagCategory = keyof TagCategory>(
    args: SzuruRequest<TagCategory, F> = {}
  ): Promise<SzuruResponse<UnpagedSearchResult<TagCategory, F>>> {
    return await this.request('GET', 'tag-categories', args);
  }

  async createCategory<F extends keyof TagCategory = keyof TagCategory>(
    args: SzuruRequest<TagCategory, F> & SzuruPayload<CreateUpdateTagCategoryDTO>
  ): Promise<SzuruResponse<Pick<TagCategory, F>>> {
    return await this.request('POST', 'tag-categories', args);
  }

  async updateCategory<F extends keyof TagCategory = keyof TagCategory>(
    args: SzuruRequest<TagCategory, F> & SzuruPayload<CreateUpdateTagCategoryDTO> & SzuruEndpointArgs<'name'> & SzuruVersion
  ): Promise<SzuruResponse<Pick<TagCategory, F>>> {
    return await this.request('PUT', `tag-categories/${args.name}`, args);
  }

  async getTagCategory<F extends keyof TagCategory = keyof TagCategory>(
    args: SzuruRequest<TagCategory, F> & SzuruEndpointArgs<'name'>
  ): Promise<SzuruResponse<Pick<TagCategory, F>>> {
    return await this.request('GET', `tag-categories/${args.name}`, args);
  }

  async deleteCategory(
    args: SzuruEndpointArgs<'name'> & SzuruVersion
  ): Promise<object> {
    return await this.request('DELETE', `tag-categories/${args.name}`, {});
  }

  async setDefaultCategory(
    args: SzuruEndpointArgs<'name'>
  ): Promise<object> {
    return await this.request('PUT', `tag-categories/${args.name}/default`, {});
  }
}
