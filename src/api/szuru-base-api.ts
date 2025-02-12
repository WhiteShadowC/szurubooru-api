import axios, { type AxiosRequestConfig, type Method } from 'axios';
import * as fs from 'fs';
import { SzuruResponse } from '../models/search-results';

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

  protected isResponseAnError<E extends SzuruErrors>(response: object | SzuruError<E>): response is SzuruError {
    return (response as SzuruError).name !== undefined && (response as SzuruError).title !== undefined && (response as SzuruError).description !== undefined;
  }

  protected async request<T, E extends SzuruErrors>(method: Method, endpoint: string, args: any): Promise<SzuruResponse<T, E>> {
    const request: AxiosRequestConfig = {
      method,
      headers: {
        ...this.authorization,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: {
        ...args.query,
      },
      url: `${this.host}/api/${endpoint}`,
      data: {},
    };

    if (args.fields != null) request.params.fields = args.fields?.join(',');

    const payload: any = { ...args.payload };
    if (args.upload == null) request.data = JSON.stringify(payload);
    else {
      for (const key of Object.keys(args.upload)) {
        // urls and tokens can be safely added to the payload
        if (key.endsWith('Url') || key.endsWith('Token')) payload[key] = args.upload[key];
        else {
          // a file needs to be uploaded
          if (request.headers != null) request.headers['Content-Type'] = 'multipart/form-data';
          request.data[key] = fs.createReadStream(args.upload[key]);
        }
      }

      if (request.headers?.['Content-Type'] == 'multipart/form-data') request.data.metadata = JSON.stringify(payload);
      else request.data = payload;
    }

    request.validateStatus = statusCode => true;
    const data = (await axios.request(request)).data;
    const response = new SzuruResponse<T, E>();

    if (this.isResponseAnError(data)) {
      response.error = data;
    } else {
      response.response = data;
    }

    return response;
  }

  private readonly useFormData = (upload: any): boolean => {
    for (const key of Object.keys(upload)) {
      const filePath = upload[key][key];
      if (filePath != null) return true;
    }
    return false;
  };
}
