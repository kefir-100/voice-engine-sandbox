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
  public loading: boolean = false;
  public errorMessage: string = '';

  private onErrorSubscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private managementService: ElevenLabsManagementService) { }

  public ngOnInit(): void {
    this.initForm();
    this.initSubscriptions();
    this.loadData();
  }

  public ngOnDestroy(): void {
    this.onErrorSubscription.unsubscribe();
  }

  public onClickProccess() {
    this.loading = true;
    this.speechUrl = '';
    this.errorMessage = '';
    const formValue = this.elevenlabsForm.value;
    this.managementService.getSpeech(
      this.selectedVoice,
      this.selectedSpeechQuality,
      {
        text: formValue.text,
        model_id: this.selectedVoiceEngine,
        voice_settings: {
          similarity_boost: formValue.similarityBoost,
          stability: formValue.stability,
          style: formValue.style,
          speaker_boost: formValue.speakerBoost
        }
      }
    )
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

  private loadData() {
    this.voiceEngines = this.managementService.getVoiceEngines();
    this.selectedVoiceEngine = _.head(this.voiceEngines)?.id;

    this.speechQualityList = this.managementService.getSpeechQuality();
    this.selectedSpeechQuality = _.head(this.speechQualityList)?.id;
    
    this.managementService.getVoices()
      .then(voices => {
        if (this.displayFavoriteVoices) {
          this.voices = this.managementService.getFavoriteVoices();
        } else {
          this.voices = this.managementService.getAllVoices();
        }
        this.selectedVoice = _.head(this.voices)?.voice_id;
      })
      .catch(e => console.error(e));
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
      similarityBoost: ['0.1', Validators.required],
      stability: ['0.1', Validators.required],
      style: ['0.1', Validators.required],
      speakerBoost: [''],
      favoriteVoices: [this.displayFavoriteVoices]
    });
  }
}
