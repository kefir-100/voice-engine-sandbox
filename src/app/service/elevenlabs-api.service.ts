
import * as _ from 'lodash';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseApiService } from './base-api.service';

import { appConfig } from '../app.config';
import { VoiceSettingsForm } from '../models/voice-settings.model';


@Injectable({
	providedIn: 'root',
})
export class ElevenLabsApiService extends BaseApiService {
  private voicesUrl = 'v1/voices';
  private voiceSettingsUrl = 'settings';
  private voiceFromTextUrl = 'v1/text-to-speech';
  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient);

    this.setApiKey(appConfig.elevenlabsApiKey);
    this.setBaseUrl(appConfig.elevenlabsApi);
  }

  getVoices<T>(): Promise<T> {
    const headers = this.getVoiceHeaders();
    return this.getRequest(this.voicesUrl, headers);
  }

  getVoiceSetting() {
    return this.getRequest(this.voiceSettingsUrl);
  }

  postVoiceFromText<T>(voiceSettings: VoiceSettingsForm): Promise<T> {
    let params = new HttpParams();
    if (!_.isEmpty(voiceSettings.speechQuality)) {
      params = params.append('output_format', voiceSettings.speechQuality as string);
    }
    const headers = this.getVoiceFromTextHeaders();
    return this.postRequest(`${this.voiceFromTextUrl}/${voiceSettings.voiceId}/stream?`, headers, params, voiceSettings.voiceSettings);
  }

  private getVoiceHeaders() {
    return new HttpHeaders({
      'accept': 'application/json',
      'xi-api-key': this.getApiKey()
    });
  }
  
  private getVoiceFromTextHeaders() {
    return new HttpHeaders({
      'accept': 'audio/mpeg',
      'xi-api-key': this.getApiKey()
    });
  }
}
