import { SzuruBaseApi } from '../szuru-base-api';
import { type SzuruRequest, type UnpagedSearchResult } from '../../models/search-results';

// export interface TagCategoryApi {
//   getTagCategories: <F extends keyof TagCategory = keyof TagCategory>(
//     args: SzuruRequest<TagCategory, F>
//   ) => Promise<SzuruResult<UnpagedSearchResult<TagCategory, F>>>;
//   // createTagCategory: (
//   //   args: SzuruRequest<TagCategory, Pick<TagCategory, 'name' | 'color'> & Partial<Pick<TagCategory, 'order'>>>
//   // ) => Promise<SzuruResult<TagCategory>>;
//   // updateTagCategory: (
//   //   args: Pick<TagCategory, 'name'> & SzuruMutRequest<Partial<Pick<TagCategory, 'name' | 'color' | 'order'>>>
//   // ) => Promise<SzuruResult<TagCategory>>;
//   // getTagCategory: (args: Pick<TagCategory, 'name'> & SzuruRequest<TagCategory>) => Promise<SzuruResult<TagCategory>>;
//   // deleteTagCategory: (args: { name: string } & SzuruMutRequest) => Promise<SzuruResult<object>>;
// }

export class TagCategoryApi extends SzuruBaseApi {
  async getTagCategories<F extends keyof TagCategory>(args: SzuruRequest<TagCategory, F> = {}): Promise<UnpagedSearchResult<TagCategory, F>> {
    return await this.request('GET', 'tag-categories', args.fields);
  }
}
