import * as _ from "lodash";
import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class BaseApiService {
  private baseUrl: string = '';
  private apiKey: string = '';
  private userId: string = '';

	constructor(protected httpClient: HttpClient) {
	}


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
    let headers = new HttpHeaders({
      'content-type': 'application/json',
    });

    if (!_.isNil(hd)) {
      headers = hd.append('Content-Type', 'application/json');
    }

    return lastValueFrom(
      this.httpClient.get<T>(`${this.baseUrl}/${route}`, {
        headers,
        params
      })
    );
  }

  postRequest<T>(route: string, hd?: HttpHeaders, params?: HttpParams, body?: any): Promise<T> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
    });

    if (!_.isNil(hd)) {
      headers = hd.append('Content-Type', 'application/json');
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
