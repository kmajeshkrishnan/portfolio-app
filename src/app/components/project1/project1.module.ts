import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Project1Component } from './project1.component';

@NgModule({
  declarations: [
    Project1Component
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    Project1Component
  ]
})
export class Project1Module { } 