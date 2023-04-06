import { SzuruBaseApi } from '../szuru-base-api';
import { type SzuruEndpointArgs, type SzuruPayload, type SzuruRequest, type SzuruVersion, type UnpagedSearchResult } from '../../models/search-results';
import { type TagCategory } from './tag-category-models';

type CreateUpdateTagCategoryDTO = Pick<TagCategory, 'name' | 'color' | 'order'>;
type TagCategoryName = Pick<TagCategory, 'name'>;
type PickedTagCategoryDTO<F extends keyof TagCategory> = Pick<TagCategory, F>;

export class TagCategoryApi extends SzuruBaseApi {
  async getTagCategories<F extends keyof TagCategory>(args: SzuruRequest<TagCategory, F> = {}): Promise<UnpagedSearchResult<TagCategory, F>> {
    return await this.request('GET', 'tag-categories', args);
  }

  async createCategory<F extends keyof TagCategory>(
    args: SzuruRequest<TagCategory, F> & SzuruPayload<CreateUpdateTagCategoryDTO>
  ): Promise<PickedTagCategoryDTO<F>> {
    return await this.request('POST', 'tag-categories', args);
  }

  async updateCategory<F extends keyof TagCategory>(
    args: SzuruRequest<TagCategory, F> & SzuruPayload<CreateUpdateTagCategoryDTO> & SzuruEndpointArgs<TagCategoryName> & SzuruVersion
  ): Promise<PickedTagCategoryDTO<F>> {
    return await this.request('PUT', `tag-categories/${args.endpoint.name}`, args);
  }

  async getTagCategory<F extends keyof TagCategory>(args: SzuruRequest<TagCategory, F> & SzuruEndpointArgs<TagCategoryName>): Promise<PickedTagCategoryDTO<F>> {
    return await this.request('GET', `tag-categories/${args.endpoint.name}`, args);
  }

  async deleteCategory<F extends keyof TagCategory>(args: SzuruEndpointArgs<TagCategoryName> & SzuruVersion): Promise<object> {
    return await this.request('DELETE', `tag-categories/${args.endpoint.name}`, {});
  }

  async setDefaultCategory<F extends keyof TagCategory>(args: SzuruEndpointArgs<TagCategoryName>): Promise<object> {
    return await this.request('PUT', `tag-categories/${args.endpoint.name}/default`, {});
  }
}
