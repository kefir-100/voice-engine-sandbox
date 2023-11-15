import * as _ from 'lodash';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ElevenLabsManagementService } from '../../../service/elevenlab-management.service';

@Component({
  selector: 'app-elevenlabs',
  templateUrl: './elevenlabs.component.html',
  styleUrls: ['./elevenlabs.component.scss']
})
export class ElevenlabsComponent implements OnInit, OnDestroy {
  public elevenlabsForm!: FormGroup;
  public selectedVoice: any = null;
  public selectedVoiceEngine: any = null;
  public voices: any[] = [];
  public voiceEngines: any[] = [];
  public speechQualityList: any[] = [];
  public selectedSpeechQuality: string = '';
  public speechUrl: string = '';
  public displayFavoriteVoices: boolean = true;
  public useDefaultSettings: boolean = true;
  public loading: boolean = false;
  public errorMessage: string = '';

  private onErrorSubscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private managementService: ElevenLabsManagementService) { }

  public ngOnInit(): void {
    this.initSubscriptions();

    this.loadData();
    this.initForm();
  }

  public ngOnDestroy(): void {
    this.onErrorSubscription.unsubscribe();
  }

  public onClickProccess() {
    this.loading = true;
    this.speechUrl = '';
    this.errorMessage = '';
    this.managementService.getSpeech(this.elevenlabsForm.value)
      .then(res => {
        this.speechUrl = res as any;
      })
      .catch(e => console.error(e))
      .finally(() => this.loading = false);
  }

  public onChangeFavoriteVoices() {
    if (this.elevenlabsForm.controls['favoriteVoices'].value) {
      this.voices = this.managementService.getFavoriteVoices();
    } else {
      this.voices = this.managementService.getAllVoices();
    }
  }

  public onChangeDefaultSettings() {
    if (this.elevenlabsForm.controls['defaultSettings'].value) {
      this.toggleDefaultSettings(true);
    } else {
      this.toggleDefaultSettings(false);
    }
  }

  private loadData() {
    this.voiceEngines = this.managementService.getVoiceEngines();
    this.selectedVoiceEngine = _.head(this.voiceEngines)?.id;

    this.speechQualityList = this.managementService.getSpeechQuality();
    this.selectedSpeechQuality = _.head(this.speechQualityList)?.id;
    
    return this.managementService.getVoices()
      .then(voices => {
        if (this.displayFavoriteVoices) {
          this.voices = this.managementService.getFavoriteVoices();
        } else {
          this.voices = this.managementService.getAllVoices();
        }
        this.assignSelectedVoice()
      });
  }

  private initSubscriptions() {
    this.onErrorSubscription.add(
      this.managementService.onErrror$.subscribe((e: any) => {
        this.errorMessage = `${e.status}: ${e.message}`;
      })
    );
  }

  private initForm() {
    this.elevenlabsForm = this.formBuilder.group({
      text: ['', Validators.required],
      voiceId: [this.selectedVoice, Validators.required],
      voiceEngine: [this.selectedVoiceEngine, Validators.required],
      speechQuality: [this.selectedSpeechQuality, Validators.required],
      stability: [{ value: 0.5, disabled: this.useDefaultSettings}, Validators.required],
      similarityBoost: [{ value: 0.75, disabled: this.useDefaultSettings }, Validators.required],
      style: [{ value: 0, disabled: this.useDefaultSettings }, Validators.required],
      speakerBoost: [{ value: false, disabled: this.useDefaultSettings }],
      favoriteVoices: [this.displayFavoriteVoices],
      defaultSettings: this.useDefaultSettings
    });
  }

  private toggleDefaultSettings(useDefaultSettings: boolean) {
    if (useDefaultSettings) {
      this.elevenlabsForm.controls['stability'].disable();
      this.elevenlabsForm.controls['similarityBoost'].disable();
      this.elevenlabsForm.controls['style'].disable();
      this.elevenlabsForm.controls['speakerBoost'].disable();
    } else {
      this.elevenlabsForm.controls['stability'].enable();
      this.elevenlabsForm.controls['similarityBoost'].enable();
      this.elevenlabsForm.controls['style'].enable();
      this.elevenlabsForm.controls['speakerBoost'].enable();
    }
  }

  private assignSelectedVoice() {
    this.selectedVoice = _.head(this.voices)?.voice_id;
    this.elevenlabsForm.controls['voiceId'].setValue(this.selectedVoice);
  }
}
