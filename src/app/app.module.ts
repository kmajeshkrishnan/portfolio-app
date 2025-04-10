import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Project1Component } from './components/project1/project1.component';
import { ContactComponent } from './components/contact/contact.component';
import { routes } from './app.routes';
import { ChatModule } from './components/chat/chat.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppComponent,
    Project1Component,
    ContactComponent,
    ChatModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 