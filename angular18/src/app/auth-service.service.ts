import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user, onAuthStateChanged } from '@angular/fire/auth';
import { from, Observable, tap } from 'rxjs';
import { UserInterface } from './modals/UserInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  $user = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  constructor() {
    // Sync currentUserSig with Firebase auth state
    onAuthStateChanged(this.firebaseAuth, (user) => {
      if (user) {
        // Update signal with Firebase user info
        this.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        // Set signal to null if no user is logged in
        this.currentUserSig.set(null);
      }
    });
  }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => updateProfile(response.user, { displayName: username }));
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => {
        // Update signal immediately after successful login
        this.currentUserSig.set({
          email: response.user.email!,
          username: response.user.displayName!,
        });
      })
      .catch(error => {
        console.error('Login failed:', error);
        throw error;  // Rethrow for error handling in the component
      });
    return from(promise);
  }

  logoutcall(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise).pipe(
      // Reset signal to null on logout
      tap(() => this.currentUserSig.set(null))
    );
  }

  // Check if the user is logged in based on the current Firebase user
  isLoggedIn(): boolean {
    return this.firebaseAuth.currentUser !== null;
  }
}
