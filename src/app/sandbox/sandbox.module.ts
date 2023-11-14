import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SandboxMainComponent } from './component/sandbox-main/sandbox-main.component';
import { ElevenlabsComponent } from './component/elevenlabs/elevenlabs.component';
import { PlayhtComponent } from './component/playht/playht.component';
import { SandboxRoutingModule } from './sandbox.routing';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';


import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatSliderModule} from '@angular/material/slider';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [SandboxMainComponent, ElevenlabsComponent, PlayhtComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SandboxRoutingModule,

    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,

    MatCheckboxModule,
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSliderModule
  ],
})
export class SandboxModule {}
