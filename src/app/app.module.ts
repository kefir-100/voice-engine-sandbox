import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { MenuComponent } from './layout/menu/menu.component';

import { AppRoutingModule } from './app.routing.module';

import { LoginModule } from './login/login.module';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoginModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
