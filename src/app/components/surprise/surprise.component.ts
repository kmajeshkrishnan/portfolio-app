import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-surprise',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './surprise.component.html',
  styleUrls: ['./surprise.component.scss']
})
export class SurpriseComponent implements OnInit, OnDestroy {
  countdownText = '';
  showMainContent = false;
  anchorText = '';
  finaleMode = false;
  accepted = false;
  showCelebration = false;

  yesButtonStyles: Record<string, string> = {};
  yesButtonAbsolute = false;
  poofVisible = false;
  poofStyles: Record<string, string> = {};

  noButtonText = 'NO';
  noButtonColor = '#a9a9a9';
  noButtonStyles: Record<string, string> = {};
  noButtonHidden = false;
  noButtonNote = '';
  noButtonDisguised = false;
  noButtonBehind = false;
  noClickMessage = '';

  finalHeadline = "You've made me the happiest person! Happy Valentine's Day, Sarah! ❤️";
  personalMessage = "Here's to us, movie nights, bad puns, and all the little moments in between.";
  giftLink = '/gift';

  celebrationItems = this.createCelebrationItems();

  private backgroundMusic?: HTMLAudioElement;
  private celebrationMusic?: HTMLAudioElement;
  private countdownIntervalId: number | undefined;
  private warningTimeoutId: number | undefined;
  private finaleTimeoutId: number | undefined;
  private poofTimeoutId: number | undefined;
  private chaseStartTime = 0;
  private warningIndex = 0;
  private noHoverCount = 0;
  private noHoverLockedUntil = 0;
  private noResetTimeoutId: number | undefined;
  private userInteracted = false;
  private pendingMusicStart = false;

  private readonly handleFirstInteraction = () => {
    this.userInteracted = true;

    if (this.showMainContent || this.pendingMusicStart) {
      this.startBackgroundMusic();
      this.pendingMusicStart = false;
    }
  };

private readonly warningLines = [
  'Warning: Emotional availability may require a system reboot.',
  'He will mansplain the thermodynamics of your morning coffee.',
  'Do you accept prolonged bathroom disappearances as part of the package deal?',
  'His memory has a 15-minute cache time. What did we just talk about?',
  'He will analyze the relationship like debugging code. It\'s not romantic. :(',
  'Emotional range: 0-1. Binary only. No floating point feelings.',
  'Will cite Wikipedia articles during arguments. As a form of affection. "According to this source, I care about you."',
  'His love language is explaining how things work. Constantly.',
  'Will try to fix your feelings with technical solutions. "Have you tried turning it off and on again?"',
  'Warning: May attempt to optimize your life without being asked.',
  'Final warning: He will over-engineer every gift - Like this one. 😉'
];

  @ViewChild('contentBox', { static: false })
  private contentBoxRef?: ElementRef<HTMLDivElement>;

  @ViewChild('yesButton', { static: false })
  private yesButtonRef?: ElementRef<HTMLButtonElement>;

  ngOnInit(): void {
    this.updateCountdown();
    this.countdownIntervalId = window.setInterval(() => this.updateCountdown(), 1000);
    window.addEventListener('pointerdown', this.handleFirstInteraction, { once: true });
  }

  private startBackgroundMusic(): void {
    if (this.backgroundMusic) {
      return;
    }
    
    this.backgroundMusic = new Audio('assets/bg-music.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3;
    this.backgroundMusic.play().catch(error => {
      console.log('Background music playback failed:', error);
    });
  }

  private stopBackgroundMusic(): void {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }

  private playCelebrationMusic(): void {
    this.celebrationMusic = new Audio('assets/wow.mp3');
    this.celebrationMusic.volume = 0.5;
    this.celebrationMusic.play().catch(error => {
      console.log('Celebration music playback failed:', error);
    });
  }

  ngOnDestroy(): void {
    if (this.countdownIntervalId !== undefined) {
      clearInterval(this.countdownIntervalId);
    }
    if (this.warningTimeoutId !== undefined) {
      clearTimeout(this.warningTimeoutId);
    }
    if (this.finaleTimeoutId !== undefined) {
      clearTimeout(this.finaleTimeoutId);
    }
    if (this.poofTimeoutId !== undefined) {
      clearTimeout(this.poofTimeoutId);
    }
    if (this.noResetTimeoutId !== undefined) {
      clearTimeout(this.noResetTimeoutId);
    }
    window.removeEventListener('pointerdown', this.handleFirstInteraction);
    this.stopBackgroundMusic();
    if (this.celebrationMusic) {
      this.celebrationMusic.pause();
    }
  }

  onYesClick(event: MouseEvent): void {
    if (this.accepted) {
      return;
    }

    if (this.finaleMode) {
      this.acceptYes();
      return;
    }

    if (!this.chaseStartTime) {
      this.startChase(event);
      return;
    }

    this.moveYesButton(event);
    this.advanceWarningLine();
  }

  onNoMouseOver(): void {
    if (this.noButtonHidden) {
      return;
    }

    if (Date.now() < this.noHoverLockedUntil) {
      return;
    }

    this.noHoverCount += 1;
    this.noButtonNote = '';
    this.noButtonDisguised = false;

    switch (this.noHoverCount % 5) {
      case 1:
        this.noButtonText = 'Maybe?';
        this.noButtonColor = '#ffd700';
        break;
      case 2:
        this.noButtonText = 'Wait, really? 😉';
        this.noButtonColor = '#ff9aa2';
        break;
      case 3:
        this.noButtonText = 'Too slow!';
        this.noButtonColor = '#ffb347';
        this.noButtonStyles = {
          transform: `translate(${this.randomOffset()}px, ${this.randomOffset()}px)`
        };
        this.playSound('dodge');
        break;
      case 4:
        this.noButtonDisguised = true;
        this.noButtonText = 'YES';
        this.noButtonColor = '#ff6f61';
        window.setTimeout(() => {
          this.noButtonDisguised = false;
          this.noButtonText = 'NO';
          this.noButtonColor = '#a9a9a9';
          this.noButtonNote = ';)';
        }, 1000);
        break;
      default:
        this.noButtonText = "This isn't a real option.";
        this.noButtonColor = '#a9a9a9';
        break;
    }

    this.lockNoHover();
  }

  onNoMouseLeave(): void {
    if (this.noButtonHidden || this.noButtonDisguised) {
      return;
    }

    if (Date.now() >= this.noHoverLockedUntil) {
      this.resetNoButton();
    }
  }

  onNoClick(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.noButtonHidden) {
      return;
    }

    // this.noClickMessage = 'Nice try! But my heart has already decided for you. ❤️';
    // this.noButtonHidden = true;
  }

  private updateCountdown(): void {
    const countdownDate = new Date('2026-02-14T00:00:00+01:00').getTime();
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance <= 0) {
      this.showMainContent = true;
      this.countdownText = '';
      this.requestBackgroundMusic();

      if (this.countdownIntervalId !== undefined) {
        clearInterval(this.countdownIntervalId);
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  private requestBackgroundMusic(): void {
    if (this.userInteracted) {
      this.startBackgroundMusic();
      return;
    }

    this.pendingMusicStart = true;
  }

  private startChase(event: MouseEvent): void {
    this.chaseStartTime = Date.now();
    this.anchorText = 'Are you sure?';
    this.moveYesButton(event);
    this.finaleTimeoutId = window.setTimeout(() => this.enterFinale(), 60000);
  }

  private moveYesButton(event: MouseEvent): void {
    this.createPoof();
    const contentBox = this.contentBoxRef?.nativeElement;
    const yesButton = this.yesButtonRef?.nativeElement;

    if (!contentBox || !yesButton) {
      return;
    }

    const boxRect = contentBox.getBoundingClientRect();
    const buttonRect = yesButton.getBoundingClientRect();
    const maxLeft = Math.max(0, boxRect.width - buttonRect.width - 16);
    const maxTop = Math.max(0, boxRect.height - buttonRect.height - 16);

    const left = this.randomInRange(8, maxLeft);
    const top = this.randomInRange(8, maxTop);

    this.yesButtonAbsolute = true;
    this.yesButtonStyles = {
      left: `${left}px`,
      top: `${top}px`
    };

    this.playSound('jump');
  }

  private createPoof(): void {
    const contentBox = this.contentBoxRef?.nativeElement;
    const yesButton = this.yesButtonRef?.nativeElement;

    if (!contentBox || !yesButton) {
      return;
    }

    const boxRect = contentBox.getBoundingClientRect();
    const buttonRect = yesButton.getBoundingClientRect();

    const left = buttonRect.left - boxRect.left + buttonRect.width / 2;
    const top = buttonRect.top - boxRect.top + buttonRect.height / 2;

    this.poofStyles = {
      left: `${left}px`,
      top: `${top}px`
    };

    this.poofVisible = true;

    if (this.poofTimeoutId !== undefined) {
      clearTimeout(this.poofTimeoutId);
    }

    this.poofTimeoutId = window.setTimeout(() => {
      this.poofVisible = false;
    }, 450);
  }

  private advanceWarningLine(): void {
    if (this.finaleMode || this.accepted) {
      return;
    }

    if (this.warningIndex >= this.warningLines.length) {
      this.enterFinale();
      return;
    }

    this.anchorText = this.warningLines[this.warningIndex];
    this.warningIndex += 1;
  }

  private enterFinale(): void {
    if (this.finaleMode) {
      return;
    }

    this.finaleMode = true;
    this.yesButtonAbsolute = false;
    this.yesButtonStyles = {};
    this.anchorText = 'Okay, okay! I promise to always be your pookie. For real this time?';

    if (this.warningTimeoutId !== undefined) {
      clearTimeout(this.warningTimeoutId);
    }
  }

  private acceptYes(): void {
    this.accepted = true;
    this.showCelebration = true;
    this.stopBackgroundMusic();
    this.playCelebrationMusic();
    this.playSound('accept');
  }

  private createCelebrationItems(): Array<{ symbol: string; style: Record<string, string> }> {
    const symbols = ['💖', '💘', '✨', '🎉', '💫'];
    return Array.from({ length: 24 }, () => ({
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      style: {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 1.5}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
        fontSize: `${18 + Math.random() * 16}px`
      }
    }));
  }

  private randomOffset(): number {
    return Math.random() > 0.5 ? 120 : -120;
  }

  private lockNoHover(): void {
    this.noHoverLockedUntil = Date.now() + 3000;

    if (this.noResetTimeoutId !== undefined) {
      clearTimeout(this.noResetTimeoutId);
    }

    this.noResetTimeoutId = window.setTimeout(() => {
      this.resetNoButton();
    }, 3000);
  }

  private resetNoButton(): void {
    if (this.noButtonHidden) {
      return;
    }

    this.noButtonText = 'NO';
    this.noButtonColor = '#a9a9a9';
    this.noButtonStyles = {};
    this.noButtonNote = '';
    this.noButtonDisguised = false;
  }

  private randomInRange(min: number, max: number): number {
    if (max <= min) {
      return min;
    }
    return min + Math.random() * (max - min);
  }

  private playSound(type: 'jump' | 'dodge' | 'accept'): void {
    if (typeof window === 'undefined' || !('AudioContext' in window || 'webkitAudioContext' in window)) {
      return;
    }

    const AudioContextRef = (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
      .AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextRef) {
      return;
    }

    const context = new AudioContextRef();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    const now = context.currentTime;
    const settings = {
      jump: { frequency: 520, duration: 0.08 },
      dodge: { frequency: 380, duration: 0.1 },
      accept: { frequency: 660, duration: 0.25 }
    };

    const { frequency, duration } = settings[type];

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, now);
    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(now);
    oscillator.stop(now + duration);

    oscillator.onended = () => {
      context.close();
    };
  }
}
