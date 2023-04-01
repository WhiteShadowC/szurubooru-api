import { SzuruBaseApi } from './api/szuru-base-api';
import { TagCategoryApi } from './api/tag-category/tag-category-api';

/**
 * https://github.com/ilyamkin/dev-to-js
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      // @ts-expect-error
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
    });
  });
}

class SzurubooruApi extends SzuruBaseApi {}
interface SzurubooruApi extends TagCategoryApi {}
applyMixins(SzurubooruApi, [TagCategoryApi]);

export default SzurubooruApi;
