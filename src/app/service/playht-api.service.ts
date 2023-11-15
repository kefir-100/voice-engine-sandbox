
import * as _ from 'lodash';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseApiService } from './base-api.service';

import { appConfig } from '../app.config';


@Injectable({
	providedIn: 'root',
})
export class PlayhtApiService extends BaseApiService {
  private voicesUrl = 'api/v2/voices';
  private voiceFromTextUrl = 'v1/text-to-speech';
  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient);

    this.setApiKey(appConfig.playhtApiKey);
    this.setUserId(appConfig.playhtUserId);
    this.setBaseUrl(appConfig.playhtApi);
  }

  getVoices<T>(): Promise<T> {
    const headers = this.getVoiceHeaders();
    return this.getRequest(this.voicesUrl, headers);
  }

  postVoiceFromText<T>(voiceId: string, selectedSpeechQuality: string, voiceSettings: any): Promise<T> {
    let params = new HttpParams();
    if (!_.isEmpty(selectedSpeechQuality)) {
      params = params.append('output_format', selectedSpeechQuality);
    }
    const headers = this.getVoiceFromTextHeaders();
    return this.postRequest(`${this.voiceFromTextUrl}/${voiceId}/stream?`, headers, params, voiceSettings);
  }

  private getVoiceHeaders() {
    return new HttpHeaders({
      'accept': 'application/json',
      'x-user-id': this.getApiKey(),
      'authorization': this.getUserId()
    });
  }

  private getVoiceFromTextHeaders() {
    return new HttpHeaders({
      'accept': 'audio/mpeg',
      'x-user-id': this.getApiKey(),
      'authorization': this.getUserId()
    });
  }
}
