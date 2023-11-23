import * as _ from "lodash";
import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http";
import { lastValueFrom } from 'rxjs';

import { HttpHeadersHelperService } from './http-headers-helper.service';

export class BaseApiService {
  private baseUrl: string = '';
  private apiKey: string = '';
  private userId: string = '';

	constructor(protected httpClient: HttpClient, protected headersService: HttpHeadersHelperService) {}


	setApiKey(apiKey: string) {
		this.apiKey = apiKey;
	}

	setUserId(userId: string) {
		this.userId = userId;
	}

	setBaseUrl(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

  getApiKey() {
    return this.apiKey;
  }

  getUserId() {
    return this.userId;
  }

  getRequest<T>(route: string, hd?: HttpHeaders, params?: HttpParams): Promise<T> {
    let headers = this.headersService.getContentTypeHeader();

    if (!_.isNil(hd)) {
      headers = this.headersService.mergeHeaders(hd, headers);
    }

    return lastValueFrom(
      this.httpClient.get<T>(`${this.baseUrl}/${route}`, {
        headers,
        params
      })
    );
  }

  postRequest<T>(route: string, hd?: HttpHeaders, params?: HttpParams, body?: any): Promise<T> {
    let headers = this.headersService.getContentTypeHeader();

    if (!_.isNil(hd)) {
      headers = this.headersService.mergeHeaders(hd, headers);
    }

    return lastValueFrom(
      this.httpClient.post<T>(`${this.baseUrl}/${route}`, body, {
        headers,
        params,
        responseType: 'blob' as 'json'
      })
    );
  }
}
