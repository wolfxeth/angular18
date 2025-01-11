import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SocialUser } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-service.service';
import { from, Observable } from 'rxjs';
import { signOut } from '@angular/fire/auth';

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
