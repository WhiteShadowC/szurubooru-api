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

  async request<T, E extends SzuruErrors>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, fields: string[] | undefined): Promise<T> {
    const query = new URLSearchParams();
    if (fields != null) query.set('fields', fields.join(','));

    const res = await fetch(`${this.host}${url}?${query.toString()}`, {
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
