export interface SzuruAuth {
  host: string;
  username?: string;
  password?: string;
  token?: string;
}

export abstract class SzuruBaseApi {
  private readonly host: string;
  private readonly authorization: { Authorization?: string } = {};

  constructor(auth: SzuruAuth) {
    this.host = auth.host;
    if (auth.username != null) {
      if (auth.token != null) this.authorization.Authorization = `Token ` + btoa(`${auth.username}:${auth.token}`);
      else if (auth.password != null) this.authorization.Authorization = `Basic ` + btoa(`${auth.username}:${auth.password}`);
      else throw Error('a username but no password or token was provided');
    }
  }

  protected async request<T, E extends SzuruErrors, M extends 'GET' | 'POST' | 'PUT' | 'DELETE'>(
    method: M,
    endpoint: string,
    args: { fields?: string[]; query?: any }
  ): Promise<T> {
    const { fields, query } = args;
    const q = new URLSearchParams();
    if (fields != null) q.set('fields', fields.join(','));
    if (query != null) {
      Object.keys(query).forEach(key => {
        if (query[key] != null) query.set(key, args.query[key]);
      });
    }

    const res = await fetch(`${this.host}${endpoint}?${q.toString()}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    if (res.status >= 200 && res.status < 300) return (await res.json()) as T;
    throw await res.json();
  }
}
