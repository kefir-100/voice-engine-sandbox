
import * as _ from 'lodash';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseApiService } from './base-api.service';
import { HttpHeadersHelperService } from './http-headers-helper.service';

import { appConfig } from '../app.config';
import { PlayhtFormModel } from '../models/playht-form.model';


@Injectable({
	providedIn: 'root',
})
export class PlayhtApiService extends BaseApiService {
  private voicesUrl = 'api/v2/voices';
  // private voicesUrl = 'api/studio/voices';
  private voiceFromTextUrl = 'api/v2/tts/stream';
  constructor(
    httpClient: HttpClient,
    headersService: HttpHeadersHelperService
  ) {
    super(httpClient, headersService);

    this.setApiKey(appConfig.playhtApiKey);
    this.setUserId(appConfig.playhtUserId);
    this.setBaseUrl(appConfig.playhtApi);
  }

  getVoices<T>(): Promise<T> {
    const headers = this.headersService.getPlayHtVoicesHeaders(this.getUserId(), this.getApiKey());
    return this.getRequest(this.voicesUrl, headers);
  }

  postVoiceFromText<T>(voiceSettings: PlayhtFormModel): Promise<T> {
    let params = new HttpParams().append('format', 'audio-mpeg');
    const headers = this.headersService.getPlayHtGenerateVoiceHeaders(this.getUserId(), this.getApiKey());
    return this.postRequest(`${this.voiceFromTextUrl}`, headers, params, voiceSettings.voiceSettingsForApi);
  }
}
