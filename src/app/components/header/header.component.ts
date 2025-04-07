import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <a routerLink="/" class="logo">Portfolio</a>
        <nav class="nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/about" routerLinkActive="active">About</a>
          <a routerLink="/portfolio" routerLinkActive="active">Portfolio</a>
          <a routerLink="/resume" routerLinkActive="active">Resume</a>
          <a routerLink="/contact" routerLinkActive="active">Contact</a>
        </nav>
        <button class="theme-toggle" (click)="toggleTheme()">
          {{ isDarkTheme ? '☀️' : '🌙' }}
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: var(--background);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--text-primary);
      text-decoration: none;
    }

    .nav {
      display: flex;
      gap: 2rem;
    }

    .nav a {
      color: var(--text-primary);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .nav a:hover {
      color: var(--accent);
    }

    .nav a.active {
      color: var(--accent);
      font-weight: 500;
    }

    .theme-toggle {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: background-color 0.3s ease;
    }

    .theme-toggle:hover {
      background-color: var(--card-background);
    }

    @media (max-width: 768px) {
      .nav {
        display: none;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  isDarkTheme = true;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
} 