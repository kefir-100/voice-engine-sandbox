
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

import { BaseApiService } from './base-api.service';

import { appConfig } from '../app.config';


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
    return this.getRequest(this.voicesUrl);
  }

  getVoiceSetting() {
    return this.getRequest(this.voiceSettingsUrl);
  }

  postVoiceFromText<T>(voiceId: string, voiceSettings: any): Promise<T> {
    return this.postRequest(`${this.voiceFromTextUrl}/${voiceId}/stream`, voiceSettings);
  }
}
