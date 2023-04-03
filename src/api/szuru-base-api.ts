import axios, { type AxiosRequestConfig, type Method } from 'axios';
import * as fs from 'fs';

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

  protected async request<T, E extends SzuruErrors>(
    method: Method,
    endpoint: string,
    args: { fields?: string[]; query?: any; payload?: any; upload?: any; version?: number }
  ): Promise<T> {
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
      url: `${this.host}${endpoint}`,
      data: {},
    };

    if (args.fields != null) request.params.fields = args.fields?.join(',');

    const payload: any = { ...args.payload, version: args.version };
    if (args.upload == null) request.data = JSON.stringify(payload);
    // if a life has to be potentially uploaded
    else {
      // the payload + all xxxUrl/xxxToken (https://github.com/rr-/szurubooru/blob/master/doc/API.md#file-uploads) properties are merged into "payload"
      for (const key of Object.keys(args.upload)) {
        const fileUrl = args.upload[key][`${key}Url`];
        const fileToken = args.upload[key][`${key}Token`];
        if (fileUrl != null) payload[`${key}Url`] = fileUrl;
        else if (fileToken != null) payload[`${key}Token`] = fileToken;
      }

      // if a file has to be uploaded, use form-data
      if (this.useFormData(args.upload)) {
        if (request.headers != null) request.headers['Content-Type'] = 'multipart/form-data';
        request.data.metadata = JSON.stringify(payload);

        for (const key of Object.keys(args.upload)) {
          const filePath = args.upload[key][key];
          // todo fs.createReadStream will not work in browser, find another solution later
          if (filePath != null) request.data[key] = fs.createReadStream(filePath);
        }
      }
      // if no file has to be uploaded because only xxxUrl/xxxToken properties were used
      else request.data = payload;
    }

    return (await axios.request(request)).data;
  }

  private readonly useFormData = (upload: any): boolean => {
    for (const key of Object.keys(upload)) {
      const filePath = upload[key][key];
      if (filePath != null) return true;
    }
    return false;
  };
}
