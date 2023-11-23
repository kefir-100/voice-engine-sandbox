import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';
import { SandboxMainComponent } from './component/sandbox-main/sandbox-main.component';
import { ElevenlabsComponent } from './component/elevenlabs/elevenlabs.component';
import { PlayhtComponent } from './component/playht/playht.component';

const routes: Routes = [
  {
    path: '',
    component: SandboxMainComponent,
    children: [
      {
        path: 'elevenlabs',
        component: ElevenlabsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'playht',
        component: PlayhtComponent,
        canActivate: [AuthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandboxRoutingModule {}
