
import * as _ from 'lodash';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseApiService } from './base-api.service';

import { appConfig } from '../app.config';
import { PlayhtFormModel } from '../models/playht-form.model';


@Injectable({
	providedIn: 'root',
})
export class HttpHeadersHelperService {
  public mergeHeaders(hd1: HttpHeaders, hd2: HttpHeaders): HttpHeaders {
    const headerNames = hd2.keys();
    const mergedHeaders = _.reduce(headerNames, (accum, headername) => accum.append(headername, hd2.get(headername) as string), hd1);

    return mergedHeaders;
  }

  public getContentTypeHeader(contentType: string = 'application/json'): HttpHeaders {
    return new HttpHeaders({
      'content-type': contentType
    });
  }
  
  public getAcceptHeader(accept: string = 'application/json'): HttpHeaders {
    return new HttpHeaders({
      'accept': accept
    });
  }

  public getElevenlabsVoicesHeaders(apiKey: string) {
    const headers = this.getAcceptHeader();
    return headers
      .append('xi-api-key', apiKey);
  }

  public getElevenlabsGenerateVoiceHeaders(apiKey: string) {
    const headers = this.getAcceptHeader('audio/mpeg');
    return headers
      .append('xi-api-key', apiKey);
  }

  public getPlayHtVoicesHeaders(userId: string, apiKey: string): HttpHeaders {
    const headers = this.getAcceptHeader();
    return headers
      .append('x-user-id', userId)
      .append('authorization', apiKey);
  }

  public getPlayHtGenerateVoiceHeaders(userId: string, apiKey: string): HttpHeaders {
    const headers = this.getAcceptHeader('audio/mpeg');
    return headers
      .append('x-user-id', userId)
      .append('authorization', apiKey);
  }
}
