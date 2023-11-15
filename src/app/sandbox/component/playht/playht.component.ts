import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-playht',
  templateUrl: './playht.component.html',
  styleUrls: ['./playht.component.scss']
})
export class PlayhtComponent implements OnInit, OnDestroy {
  public playhtForm!: FormGroup;

  private onErrorSubscription = new Subscription();

  constructor(private formBuilder: FormBuilder) { }

  
  public ngOnInit(): void {
    this.initForm();
    // this.initSubscriptions();
    // this.loadData();
  }

  public ngOnDestroy(): void {
    this.onErrorSubscription.unsubscribe();
  }
  
  private initForm() {
    this.playhtForm = this.formBuilder.group({
      text: ['', Validators.required],
      similarityBoost: ['0.1', Validators.required],
      stability: ['0.1', Validators.required],
      style: ['0.1', Validators.required],
      speakerBoost: ['']
    });
  }
}
