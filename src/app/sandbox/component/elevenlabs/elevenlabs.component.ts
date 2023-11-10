import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElevenLabsApiService } from '../../../service/elevenlabs-api.service';

@Component({
  selector: 'app-elevenlabs',
  templateUrl: './elevenlabs.component.html',
  styleUrls: ['./elevenlabs.component.scss']
})
export class ElevenlabsComponent implements OnInit {
  public elevenlabsForm!: FormGroup;
  public selectedVoice: any = null;
  public voices: any[] = [];

  constructor(private formBuilder: FormBuilder, private apiService: ElevenLabsApiService) { }

  public ngOnInit(): void {
    this.initForm();

    this.loadData();
  }

  public onClickProccess() {
    console.log(this.elevenlabsForm.value);
  }

  private loadData() {
    this.apiService.getVoices<{ voices: any[] }>()
      .then(voices => {
        this.voices = voices.voices;
        this.selectedVoice = this.voices[0];
      })
      .catch(e => console.error(e));
  }

  private initForm() {
    this.elevenlabsForm = this.formBuilder.group({
      text: ['', Validators.required],
      similarityBoost: ['', Validators.required],
      stability: ['', Validators.required],
      style: ['', Validators.required],
      speakerBoost: ['', Validators.required]
    });
  }
}
