import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class BaseApiService {
  private baseUrl: string = '';
  private apiKey: string = '';

	constructor(protected httpClient: HttpClient) {
	}

  
	setApiKey(apiKey: string) {
		this.apiKey = apiKey;
	}

	setBaseUrl(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

  getRequest<T>(route: string, params?: any[]): Promise<T> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json",
      "xi-api-key": this.apiKey
    });

    if (params) {
      const str = params.join().replace(/,/g, "/");
      return lastValueFrom(
        this.httpClient.get<T>(`${this.baseUrl}/${route}/${str}`, {
          headers,
        })
      );
    } else {
      return lastValueFrom(
        this.httpClient.get<T>(`${this.baseUrl}/${route}`, {
          headers,
        })
      );
    }
  }

  postRequest<T>(route: string, body?: any): Promise<T> {
    const header = new HttpHeaders({
      "Content-Type": "application/json;",
      "Accept": "audio/mpeg",
      "xi-api-key": this.apiKey
    });

    return lastValueFrom(
      this.httpClient.post<T>(`${this.baseUrl}/${route}`, body, {
        headers: header,
        responseType: 'blob' as 'json'
      })
    );
  }
}
