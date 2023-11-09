import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { AppRoutingModule } from './app.routing.module';

import { LoginModule } from './login/login.module';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoginModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
