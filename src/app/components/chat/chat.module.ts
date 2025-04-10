import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MarkdownModule.forRoot()
  ],
  exports: [ChatComponent]
})
export class ChatModule { } 