import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventManager } from '@angular/platform-browser';

import { PlayhtManagementService } from '../../../service/plaht.management.service';

@Component({
  selector: 'app-playht',
  templateUrl: './playht.component.html',
  styleUrls: ['./playht.component.scss']
})
export class PlayhtComponent implements OnInit, OnDestroy, AfterViewInit {
  public voices: any[] = [];
  public selectedVoice: any = null;
  public playhtForm!: FormGroup;
  public speechUrl: string = '';
  public loading: boolean = false;
  public errorMessage: string = '';

  public selectedSpeechQuality: string = '';
  public selectedSpeechSpeed: number = 1; // min - 0.1, max - 5, with step 0.1
  public selectedSampleRate: number = 24000; // min - 8000, max - 48000, with step 1000
  public selectedSpeechSeed: number = 0;  // min - 0, max - not limits, with step 1
  public selectedSpeechTemperature: number = 0.1; // min - 0.1, max - 2 with step 0.1
  public selectedVoiceEngine: string = '';
  public selectedVoiceEmotion: string = '';
  public selectedVoiceGuidance: number = 0.1; // min - 0.1, max - 6 with step 0.1
  public selectedStyleGuidance: number = 0.1; // min - 0.1, max - 30 with step 0.1
  public selectedTextGuidance: number = 1; // min - 1, max - 2 with step 0.1
  public useDefaultSettings: boolean = true;

  public voiceEngines: any[] = [];
  public speechQualityList: any[] = [];
  public speechEmotionList: any[] = [];

  @ViewChild('generatedSpeech', { static: false })
  public generatedSpeech!: ElementRef<HTMLAudioElement>;

  private removeHanlderToAudio!: Function;
  private onlyFavoriteVoices = true;
  private subscriptions = new Subscription();

  constructor(private formBuilder: FormBuilder, private eventManager: EventManager, private managementService: PlayhtManagementService) {
  }

  public ngOnInit(): void {
    this.initSubscriptions();

    this.loadData();
    this.initForm();
    this.subscribeToFormChanges();
  }

  public ngAfterViewInit(): void {
    this.addHanlderToAudio();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    if (_.isFunction(this.removeHanlderToAudio)) {
      this.removeHanlderToAudio();
    }
  }

  public onClickProccess() {
    this.loading = true;
    this.speechUrl = '';
    this.errorMessage = '';
    this.managementService.getSpeech(this.playhtForm.value)
      .then(speechUrl => {
        this.speechUrl = speechUrl;
      })
      .catch(e => console.error(e))
      .finally(() => this.loading = false);
  }

  public onChangeDefaultSettings() {
    const useDefaultSettings = this.playhtForm.controls['defaultSettings'].value;
    this.toggleDefaultSettings(useDefaultSettings);
  }

  public onChangeFavoriteVoices() {
    if (this.playhtForm.controls['favoriteVoices'].value) {
      this.voices = this.managementService.getFavoriteVoices();
    } else {
      this.voices = this.managementService.getAllVoices();
    }
  }

  // public onClickDownload() {
  //   this.managementService.downLoadFile();
  // }

  public hasIdLink(voiceId: string): boolean {
    return _.endsWith(voiceId, '.json');
  }

  private initSubscriptions() {
    this.subscriptions.add(
      this.managementService.onErrror$.subscribe((errorMessage: string) => (this.errorMessage = errorMessage))
    );
  }

  private loadData() {
    this.voiceEngines = this.managementService.getVoiceEngines();
    this.selectedVoiceEngine = _.head(this.voiceEngines)?.id;

    this.speechQualityList = this.managementService.getSpeechQuality();
    this.selectedSpeechQuality = _.head(this.speechQualityList)?.id;

    this.speechEmotionList = this.managementService.getSpeechEmotions();
    this.selectedVoiceEmotion = _.head(this.speechEmotionList)?.id;
    
    return this.managementService.getVoices()
      .then(voices => {
        if (this.onlyFavoriteVoices) {
          this.voices = this.managementService.getFavoriteVoices();
        } else {
          this.voices = this.managementService.getAllVoices();
        }

        this.assignSelectedVoice();
      });
  }
  
  private initForm() {
    this.playhtForm = this.formBuilder.group({
      voice: [this.selectedVoice, Validators.required],
      text: ['', Validators.required],
      quality: [this.selectedSpeechQuality],
      speed: [this.selectedSpeechSpeed, [Validators.min(0.1), Validators.max(5)]],
      sample_rate: [this.selectedSampleRate, [Validators.min(8000), Validators.max(48000)]],
      seed: [this.selectedSpeechSeed, Validators.min(0)],
      temperature: [this.selectedSpeechTemperature, [Validators.min(0.1), Validators.max(2)]],
      voice_engine: [this.selectedVoiceEngine],
      emotion: [this.selectedVoiceEmotion],
      voice_guidance: [this.selectedVoiceGuidance, [Validators.min(0.1), Validators.max(6)]],
      style_guidance: [this.selectedStyleGuidance, [Validators.min(0.1), Validators.max(30)]],
      text_guidance: [this.selectedTextGuidance, [Validators.min(1), Validators.max(2)]],
      favoriteVoices: this.onlyFavoriteVoices,
      defaultSettings: this.useDefaultSettings
    });

    this.toggleDefaultSettings(this.useDefaultSettings);
  }

  private subscribeToFormChanges() {
    this.subscriptions.add(
      this.playhtForm.controls['voice_engine'].valueChanges
        .subscribe((value: string) => {
          if (!this.playhtForm.controls['defaultSettings'].value) {
            if (value === this.voiceEngines[2].id) {
              this.playhtForm.controls['emotion'].disable();
              this.playhtForm.controls['voice_guidance'].disable();
              this.playhtForm.controls['style_guidance'].disable();
              this.playhtForm.controls['text_guidance'].disable();
            } else {
              this.playhtForm.controls['emotion'].enable();
              this.playhtForm.controls['voice_guidance'].enable();
              this.playhtForm.controls['style_guidance'].enable();
              this.playhtForm.controls['text_guidance'].enable();
            }
          }
        })
    );
  }

  private toggleDefaultSettings(useDefaultSettings: boolean) {
    if (useDefaultSettings) {
      this.playhtForm.controls['quality'].disable();
      this.playhtForm.controls['speed'].disable();
      this.playhtForm.controls['sample_rate'].disable();
      this.playhtForm.controls['seed'].disable();
      this.playhtForm.controls['temperature'].disable();
      this.playhtForm.controls['voice_engine'].disable();
      this.playhtForm.controls['emotion'].disable();
      this.playhtForm.controls['voice_guidance'].disable();
      this.playhtForm.controls['style_guidance'].disable();
      this.playhtForm.controls['text_guidance'].disable();
    } else {
      this.playhtForm.controls['quality'].enable();
      this.playhtForm.controls['speed'].enable();
      this.playhtForm.controls['sample_rate'].enable();
      this.playhtForm.controls['seed'].enable();
      this.playhtForm.controls['temperature'].enable();
      this.playhtForm.controls['voice_engine'].enable();
      this.playhtForm.controls['emotion'].enable();
      this.playhtForm.controls['voice_guidance'].enable();
      this.playhtForm.controls['style_guidance'].enable();
      this.playhtForm.controls['text_guidance'].enable();
    }
  }

  private addHanlderToAudio() {
    // this.generatedSpeech?.nativeElement.addEventListener('error', this.audioErrorHandler);
    this.removeHanlderToAudio = this.eventManager.addEventListener(this.generatedSpeech?.nativeElement, 'error', (args: Event) => {
      if (_.size(this.speechUrl) > 0) {
        const error = (args?.target as any)?.error.message;
        this.errorMessage = error || 'Unknown error';
        console.error('Audio error: ', args);
      }
    });
  }

  private assignSelectedVoice() {
    this.selectedVoice = _.head(this.voices)?.id;
    this.playhtForm.controls['voice'].setValue(this.selectedVoice);
  }
}
