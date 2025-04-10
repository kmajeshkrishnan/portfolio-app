import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';
import { ChatModule } from '../chat/chat.module';

@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    CommonModule,
    RouterModule,
    ChatModule
  ],
  exports: [PortfolioComponent]
})
export class PortfolioModule { } 