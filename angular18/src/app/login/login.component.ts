import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
})
export class LoginComponent {
  errorMessage: string | null = null; // Property to hold error message
  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('email')?.value as string;
    const password = this.loginForm.get('password')?.value as string;

    // Authenticate with an API or Google Firebase Auth
    this.authService.login(email, password).subscribe({
      next: () => {
        this.errorMessage = null; // Clear any previous error
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password';
        console.error('Login failed:', error);
      },
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
