import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SandboxMainComponent } from './component/sandbox-main/sandbox-main.component';
import { ElevenlabsComponent } from './component/elevenlabs/elevenlabs.component';
import { PlayhtComponent } from './component/playht/playht.component';
import { SandboxRoutingModule } from './sandbox.routing';

@NgModule({
  declarations: [SandboxMainComponent, ElevenlabsComponent, PlayhtComponent],
  imports: [CommonModule, FormsModule, SandboxRoutingModule],
})
export class SandboxModule {}
