
import * as _ from 'lodash';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseApiService } from './base-api.service';

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

  postVoiceFromText<T>(voiceSettings: PlayhtFormModel): Promise<T> {
    let params = new HttpParams().append('format', 'audio-mpeg');
    const headers = this.getVoiceFromTextHeaders();
    return this.postRequest(`${this.voiceFromTextUrl}`, headers, params, voiceSettings.voiceSettingsForApi);
  }

  private getVoiceHeaders() {
    return new HttpHeaders({
      'accept': 'application/json',
      'x-user-id': this.getUserId(),
      'authorization': this.getApiKey()
    });
  }

  private getVoiceFromTextHeaders() {
    return new HttpHeaders({
      'accept': 'audio/mpeg',
      'x-user-id': this.getUserId(),
      'authorization': this.getApiKey()
    });
  }
}
