import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SocialUser } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-service.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: SocialUser | null = null;
  authService = inject(AuthService);
  router = inject(Router);
  themeService = inject(ThemeService);

  menuOpen = false;
  scrolled = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 8;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  initials(): string {
    const user = this.authService.currentUserSig();
    const source = user?.username || user?.email || '?';
    return source
      .split(/[\s@.]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  }

  logoutcall() {
    this.authService.logoutcall().subscribe({
      next: () => {
        this.router.navigate(['/login']);
        console.log('Logged out');
      },
      error: (error) => {
        console.error('Logout failed:', error);
      },
    });
  }
}
