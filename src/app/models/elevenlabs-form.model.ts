import * as _ from 'lodash';

export class ElevenlabsFormModel {
  public text: string = '';
  public voiceId: string = '';
  public voiceEngine: string = '';
  public speechQuality?: string;
  public stability?: number;
  public similarityBoost?: number;
  public style?: number;
  public speakerBoost?: boolean;
  public favoriteVoices?: boolean;
  public defaultSettings?: boolean;

  constructor(formData: Partial<{
    text: string,
    voiceId: string,
    voiceEngine: string,
    speechQuality: string,
    stability: number,
    similarityBoost: number,
    style: number,
    speakerBoost: boolean,
    favoriteVoices: boolean,
    defaultSettings: boolean
  }> = {}) {
    Object.assign(this, formData);
  }

  public get voiceSettingsForApi() {
    const vs: {
      text: string,
      model_id: string,
      voice_settings?: any
    } = {
      text: this.text,
      model_id: this.voiceEngine
    };

    if (!_.isNil(this.similarityBoost) || !_.isNil(this.stability) || !_.isNil(this.style) || !_.isNil(this.speakerBoost)) {
      vs.voice_settings = {
        similarity_boost: this.similarityBoost,
        stability: this.stability,
        style: this.style,
        speaker_boost: this.speakerBoost
      };
    }

    return vs;
  }
}