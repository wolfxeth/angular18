import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth-service.service';
// Ensure this service handles your authentication logic

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) { // Use a proper method to check authentication
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
