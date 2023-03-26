import fetch from 'node-fetch';

interface ISzurubooruApi {
  getTagCategories: <F extends keyof TagCategory = keyof TagCategory>(
    args: SzuruRequest<TagCategory, F>
  ) => Promise<SzuruResult<UnpagedSearchResult<TagCategory, F>>>;
  // createTagCategory: (
  //   args: SzuruRequest<TagCategory, Pick<TagCategory, 'name' | 'color'> & Partial<Pick<TagCategory, 'order'>>>
  // ) => Promise<SzuruResult<TagCategory>>;
  // updateTagCategory: (
  //   args: Pick<TagCategory, 'name'> & SzuruMutRequest<Partial<Pick<TagCategory, 'name' | 'color' | 'order'>>>
  // ) => Promise<SzuruResult<TagCategory>>;
  // getTagCategory: (args: Pick<TagCategory, 'name'> & SzuruRequest<TagCategory>) => Promise<SzuruResult<TagCategory>>;
  // deleteTagCategory: (args: { name: string } & SzuruMutRequest) => Promise<SzuruResult<object>>;
}

export class ISzurubooruApiImpl implements ISzurubooruApi {
  private readonly host: string;
  private readonly authorization: { Authorization?: string } = {};

  constructor(auth: Auth) {
    this.host = auth.host;
    if (auth.username != null) {
      if (auth.token != null) this.authorization.Authorization = `Token ` + btoa(`${auth.username}:${auth.token}`);
      else if (auth.password != null) this.authorization.Authorization = `Basic ` + btoa(`${auth.username}:${auth.password}`);
      else throw Error('a username but no password or token was provided');
    }
  }

  async getTagCategories<F extends keyof TagCategory>(args: SzuruRequest<TagCategory, F> = {}): Promise<SzuruResult<UnpagedSearchResult<TagCategory, F>>> {
    return await this.request('GET', 'tag-categories', args.fields);
  }

  private async request<T, E extends SzuruErrors>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    fields: string[] | undefined
  ): Promise<SzuruResult<T, E>> {
    try {
      const query = new URLSearchParams();
      if (fields != null) query.set('fields', fields.join(','));

      const res = await fetch(`${this.host}${url}?${query.toString()}`, {
        method,
      });
      return { result: 'success', value: (await res.json()) as T };
    } catch (e: any) {
      if ('name' in e && 'title' in e && 'description' in e) return { result: 'error', error: e };
      else {
        // todo check if error is of type Error
        const error = e as Error;
        return {
          result: 'error',
          error: {
            name: 'Unknown',
            description: error.stack ?? '',
            title: error.message,
          },
        };
      }
    }
  }
}

interface Auth {
  host: string;
  username?: string;
  password?: string;
  token?: string;
}
