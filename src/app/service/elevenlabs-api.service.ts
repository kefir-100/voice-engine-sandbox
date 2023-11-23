
import * as _ from 'lodash';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseApiService } from './base-api.service';
import { HttpHeadersHelperService } from './http-headers-helper.service';

import { appConfig } from '../app.config';
import { ElevenlabsFormModel } from '../models/elevenlabs-form.model';


@Injectable({
	providedIn: 'root',
})
export class ElevenLabsApiService extends BaseApiService {
  private voicesUrl = 'v1/voices';
  private voiceSettingsUrl = 'settings';
  private voiceFromTextUrl = 'v1/text-to-speech';
  constructor(
    httpClient: HttpClient,
    headersService: HttpHeadersHelperService
  ) {
    super(httpClient, headersService);

    this.setApiKey(appConfig.elevenlabsApiKey);
    this.setBaseUrl(appConfig.elevenlabsApi);
  }

  getVoices<T>(): Promise<T> {
    const headers = this.headersService.getElevenlabsVoicesHeaders(this.getApiKey());
    return this.getRequest(this.voicesUrl, headers);
  }

  getVoiceSetting() {
    return this.getRequest(this.voiceSettingsUrl);
  }

  postVoiceFromText<T>(voiceSettings: ElevenlabsFormModel): Promise<T> {
    let params = new HttpParams();
    if (!_.isEmpty(voiceSettings.speechQuality)) {
      params = params.append('output_format', voiceSettings.speechQuality as string);
    }
    const headers = this.headersService.getElevenlabsGenerateVoiceHeaders(this.getApiKey());
    return this.postRequest(`${this.voiceFromTextUrl}/${voiceSettings.voiceId}/stream?`, headers, params, voiceSettings.voiceSettingsForApi);
  }
}
