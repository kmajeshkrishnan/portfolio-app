import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent]
})
export class AppComponent implements OnDestroy {
  title = 'portfolio-app';
  hideChrome = false;
  private readonly destroyed$ = new Subject<void>();

  constructor(private router: Router) {
    this.updateChromeVisibility(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd), takeUntil(this.destroyed$))
      .subscribe((event) => {
        this.updateChromeVisibility((event as NavigationEnd).urlAfterRedirects);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private updateChromeVisibility(url: string): void {
    this.hideChrome = url.startsWith('/surprise') || url.startsWith('/gift');
  }
} 