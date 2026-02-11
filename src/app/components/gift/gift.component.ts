import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gift',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.scss']
})
export class GiftComponent implements OnInit {
  showContent = false;

  ngOnInit(): void {
    // Play drumroll sound
    this.playDrumroll();
    
    // Show content after animation completes (4 seconds to match audio)
    setTimeout(() => {
      this.showContent = true;
    }, 3000);
  }

  private playDrumroll(): void {
    const audio = new Audio('assets/tadaa.mp3');
    audio.volume = 0.7;
    audio.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  }
}
