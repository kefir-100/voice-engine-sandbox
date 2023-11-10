import { Injectable } from '@angular/core';
import { ElevenLabsApiService } from './elevenlabs-api.service';

@Injectable({
	providedIn: 'root',
})
export class ElevenLabsManagementService {
  constructor(private apiService: ElevenLabsApiService) {}

  public getVoices() {
    return this.apiService.getVoices<{ voices: any[] }>()
      .then(voices => voices.voices)
      .catch(e => console.error(e));
  }

  public getSpeech(voiceId: string, data: any) {
    return this.apiService.postVoiceFromText<any>(voiceId, data)
      .then(blobAudio => URL.createObjectURL(blobAudio))
      .catch(e => console.error(e));
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
}
}
