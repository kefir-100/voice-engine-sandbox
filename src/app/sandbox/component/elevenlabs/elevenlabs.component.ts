import * as _ from 'lodash';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElevenLabsManagementService } from '../../../service/elevenlab-management.service';

@Component({
  selector: 'app-elevenlabs',
  templateUrl: './elevenlabs.component.html',
  styleUrls: ['./elevenlabs.component.scss']
})
export class ElevenlabsComponent implements OnInit {
  public elevenlabsForm!: FormGroup;
  public selectedVoice: any = null;
  public voices: any[] = [];
  public speechUrl: string = '';
  public loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private managementService: ElevenLabsManagementService) { }

  public ngOnInit(): void {
    this.initForm();

    this.loadData();
  }

  public onClickProccess() {
    this.loading = true;
    this.speechUrl = '';
    this.managementService.getSpeech(
      this.selectedVoice,
      {
        text: this.elevenlabsForm.value.text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          similarity_boost: this.elevenlabsForm.value.similarityBoost,
          stability: this.elevenlabsForm.value.stability,
          style: this.elevenlabsForm.value.style,
          speaker_boost: this.elevenlabsForm.value.speakerBoost
        }
      }
    )
      .then(res => {
        this.loading = false;
        this.speechUrl = res as any;
      })
      .catch(e => console.error(e));
  }

  private loadData() {
    this.managementService.getVoices()
      .then(voices => {
        this.voices = voices || [];
        this.selectedVoice = _.head(this.voices)?.voice_id;
      })
      .catch(e => console.error(e));
  }

  private initForm() {
    this.elevenlabsForm = this.formBuilder.group({
      text: ['', Validators.required],
      similarityBoost: ['0.1', Validators.required],
      stability: ['0.1', Validators.required],
      style: ['0.1', Validators.required],
      speakerBoost: ['']
    });
  }
}
