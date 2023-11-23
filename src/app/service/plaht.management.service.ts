import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PlayhtApiService } from './playht-api.service';
import { PlayhtFormModel } from '../models/playht-form.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class PlayhtManagementService {
  public onErrror$ = new Subject<string>();
  private voiceEngines = [
    { id: 'PlayHT2.0-turbo', name: 'Play HT 2.0 (turbo)' },
    { id: 'PlayHT2.0', name: 'Play HT 2.0' },
    { id: 'PlayHT1.0', name: 'Play HT 1.0' }
  ];
  private speechQuality = [
    { id: 'draft', name: 'Draft' },
    { id: 'low', name: 'Low' },
    { id: 'medium', name: 'Medium' },
    { id: 'high', name: 'High' },
    { id: 'premium', name: 'Premium' }
  ];
  private speechEmotions = [
    { id: "female_happy", name: "Female (happy)" },
    { id: "female_sad", name: "Female (sad)" },
    { id: "female_angry", name: "Female (angry)" },
    { id: "female_fearful", name: "Female (fearful)" },
    { id: "female_disgust", name: "Female (disgust)" },
    { id: "female_surprised", name: "Female (surprised)" },
    { id: "male_happy", name: "Male (happy)" },
    { id: "male_sad", name: "Male (sad)" },
    { id: "male_angry", name: "Male (angry)" },
    { id: "male_fearful", name: "Male (fearful)" },
    { id: "male_disgust", name: "Male (disgust)" },
    { id: "male_surprised", name: "Male (surprised)" }
  ];
  private allVoices: any[] = [];
  private favoriteVoices: any[] = [];
  private blobAudio!: Blob;

  constructor(private apiService: PlayhtApiService) {}

  public getVoiceEngines() {
    return _.cloneDeep(this.voiceEngines);
  }

  public getSpeechQuality() {
    return _.cloneDeep(this.speechQuality);
  }

  public getSpeechEmotions() {
    return _.cloneDeep(this.speechEmotions);
  }

  public getAllVoices() {
    return _.cloneDeep(this.allVoices);
  }

  public getFavoriteVoices() {
    return _.cloneDeep(this.favoriteVoices);
  }

  public getVoices(): Promise<any[]> {
    return this.apiService.getVoices<any[]>()
      .then((voices) => {
        this.allVoices = _.orderBy(voices, ['voice_engine'], ['desc']) || [];
        this.favoriteVoices = _.filter(this.allVoices, { voice_engine: this.voiceEngines[1].id });

        return this.allVoices;
      })
      .catch(e => {
        this.handleError(e);

        return [];
      });
  }

  public getSpeech(formData: any) {
    const voiceSettings = new PlayhtFormModel(formData)
    return this.apiService.postVoiceFromText<any>(voiceSettings)
      .then(blobAudio => {
        this.blobAudio = blobAudio;
        return URL.createObjectURL(blobAudio)
      })
      .catch((e: HttpErrorResponse) => {
        this.handleError(e);

        return '';
      });
  }

  public async handleError(e: HttpErrorResponse) {
    let errorMessage = '';
    if (_.isObjectLike(e.error)) {
      if (e.error instanceof Blob) {
        const textFromBlob = await e.error.text();
        if (_.size(textFromBlob) > 0) {
          try {
            const error = JSON.parse(textFromBlob);
            errorMessage = `${e.status}: ${e.message}. Details: ${error?.error_message}`
          } catch (e: any) {
            errorMessage = `${e.status}: ${e.message}. Details: ${textFromBlob}`
          }
        } else {
          errorMessage = `${e.status}: ${e.message}. Details: No details.`;
        }
      } else {
        errorMessage = `${e.status}: ${e.message}. Details: ${(e.error?.error_message || 'No details.')}`;
      }
    } else {
      errorMessage = `${e.status}: ${e.message}`;
    }
    this.onErrror$.next(errorMessage);

    console.error(e);
  }

  // public downLoadFile() {
  //   const contentType = 'audio/mpeg';
  //   const blob = new Blob([this.blobAudio], { type: contentType });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   document.body.appendChild(a);
  //   a.setAttribute('style', 'display: none');
  //   a.href = url;
  //   a.download = 'Generated speach.mpeg';
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  //   a.remove();
  // }
}
