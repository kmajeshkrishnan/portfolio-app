import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(true);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme === 'dark');
    } else {
      // Default to dark theme
      this.setTheme(true);
    }
  }

  toggleTheme() {
    this.setTheme(!this.isDarkTheme.value);
  }

  private setTheme(isDark: boolean) {
    this.isDarkTheme.next(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }
} 