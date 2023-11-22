import * as _ from 'lodash';

export class PlayhtFormModel {
  public voice: string = '';
  public text: string = '';
  public quality?: string;
  public speed?: number;
  public sample_rate?: number;
  public seed?: number;
  public temperature?: number;
  public voice_engine?: string;
  public emotion?: string;
  public voice_guidance?: number;
  public style_guidance?: number;
  public text_guidance?: number;
  public defaultSettings?: boolean;

  constructor(formData: Partial<{
    voice: string,
    text: string,
    quality: string;
    speed: number;
    sample_rate: number;
    seed: number;
    temperature: number;
    voice_engine: string;
    emotion: string;
    voice_guidance: number;
    style_guidance: number;
    text_guidance: number;
    defaultSettings: boolean;
  }> = {}) {
    Object.assign(this, formData);
  }

  public get voiceSettingsForApi() {
    return {
      voice: this.voice,
      text: this.text,
      quality: this.quality,
      speed: this.speed,
      sample_rate: this.sample_rate,
      seed: this.seed,
      temperature: this.temperature,
      voice_engine: this.voice_engine,
      emotion: this.emotion,
      voice_guidance: this.voice_guidance,
      style_guidance: this.style_guidance,
      text_guidance: this.text_guidance
    }
  }
}