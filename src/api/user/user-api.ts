import { SzuruBaseApi } from '../szuru-base-api';
import {
  type PagedSearchResult,
  type SzuruEndpointArgs,
  type SzuruPayload,
  type SzuruQuery,
  type SzuruRequest,
  type SzuruResponse,
  type SzuruUpload,
  type SzuruVersion,
} from '../../models/search-results';
import { type PagedSearchResultQuery } from '../utils/search-results';
import type { User } from './user-models';

type CreateUserDTO = SzuruPayload<Pick<User, 'name'> & { password: string } & Partial<Pick<User, 'email' | 'rank' | 'avatarStyle'>>>;
type UpdateUserDTO = SzuruPayload<Partial<Pick<User, 'name' | 'email' | 'rank' | 'avatarStyle'>> & { password?: string }>;
export class UserApi extends SzuruBaseApi {
  async getUsers<F extends keyof User = keyof User>(
    args: SzuruRequest<User, F> & SzuruQuery<PagedSearchResultQuery>
  ): Promise<PagedSearchResult<User, F>> {
    return await this.request('GET', 'users', args);
  }

  async createUser<F extends keyof User = keyof User>(
    args: SzuruRequest<User, F> & CreateUserDTO & Partial<SzuruUpload<'avatar'>>
  ): Promise<SzuruResponse<User, F>> {
    return await this.request('POST', 'users', args);
  }

  async updateUser<F extends keyof User = keyof User>(
    args: SzuruRequest<User, F> & UpdateUserDTO & SzuruVersion & Partial<SzuruUpload<'avatar'>> & SzuruEndpointArgs<'name'>
  ): Promise<SzuruResponse<User, F>> {
    return await this.request('PUT', `users/${args.name}`, args);
  }

  async getUser<F extends keyof User = keyof User>(
    args: SzuruRequest<User, F> & SzuruEndpointArgs<'name'>
  ): Promise<SzuruResponse<User, F>> {
    return await this.request('GET', `users/${args.name}`, args);
  }

  async deleteUser(
    args: SzuruEndpointArgs<'name'> & SzuruVersion
  ): Promise<object> {
    return await this.request('GET', `users/${args.name}`, args);
  }
}
