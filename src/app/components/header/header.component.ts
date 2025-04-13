import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent {
  isDarkTheme = false;
  isMobileMenuOpen = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme');
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }
} 