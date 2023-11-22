import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ElevenLabsApiService } from './elevenlabs-api.service';
import { ElevenlabsFormModel } from '../models/elevenlabs-form.model';

@Injectable({
	providedIn: 'root',
})
export class ElevenLabsManagementService {
  public onErrror$ = new Subject();
  private voiceEngines = [
    { id: 'eleven_multilingual_v2', name: 'Eleven Multilingual v2' },
    { id: 'eleven_multilingual_v1', name: 'Eleven Multilingual v1' },
    { id: 'eleven_monolingual_v1', name: 'Eleven English v1' },
    { id: 'eleven_turbo_v2', name: 'Eleven Turbo v2' },
  ];
  private speechQuality = [
    { id: 'mp3_44100', name: 'MP3 44.1kHz' },
    { id: 'pcm_16000', name: 'PCM(S16LE) 16kHz' },
    { id: 'pcm_22050', name: 'PCM(S16LE) 22.05kHz ' },
    { id: 'pcm_24000', name: 'PCM(S16LE) 24kHz' },
    { id: 'pcm_44100', name: 'PCM(S16LE) 44.1kHz' },
  ];
  private favoriteVoicesIds = [
    '9F4C8ztpNUmXkdDDbz3J',
    'IPd5gONoQ4zpoBUZHDfx',
    'iqyQMo6bXJDO5WSOsKOm',
    '1UpTZzv55g4rPdium2UU'
  ];
  private allVoices: any[] = [];
  private favoriteVoices: any[] = [];

  constructor(private apiService: ElevenLabsApiService) {}

  public getVoiceEngines() {
    return _.cloneDeep(this.voiceEngines);
  }

  public getSpeechQuality() {
    return _.cloneDeep(this.speechQuality);
  }

  public getAllVoices() {
    return _.cloneDeep(this.allVoices);
  }

  public getFavoriteVoices() {
    return _.cloneDeep(this.favoriteVoices);
  }

  public getVoices(): Promise<any[]> {
    return this.apiService.getVoices<{ voices: any[] }>()
      .then(voices => voices.voices)
      .then(voices => this.assignVoices(voices))
      .catch(e => {
        this.onErrror$.next(e);
        console.error(e);

        return [];
      });
  }

  public getSpeech(formData: any) {
    const voiceSettings = new ElevenlabsFormModel(formData)
    return this.apiService.postVoiceFromText<any>(voiceSettings)
      .then(blobAudio => URL.createObjectURL(blobAudio))
      .catch(e => {
        this.onErrror$.next(e);
        console.error(e);
      });
  }

  // public downLoadFile(data: any, type: string) {
  //   let blob = new Blob([data], { type: type});
  //   let url = window.URL.createObjectURL(blob);
  //   let pwa = window.open(url);
  //   if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
  //       alert( 'Please disable your Pop-up blocker and try again.');
  //   }
  // }

  private assignVoices(voices: any[]) {
    this.allVoices = voices || [];
    this.favoriteVoices = _.filter(this.allVoices, voice => _.includes(this.favoriteVoicesIds, voice.voice_id));

    return this.allVoices;
  }
}
