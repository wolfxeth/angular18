import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { sign } from 'crypto';
import { from, Observable } from 'rxjs';
import { UserInterface } from './modals/UserInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private user: SocialUser | null = null;

  firebaseAuth=inject(Auth);
  $user = user(this.firebaseAuth);
  currentUserSig = signal< UserInterface |null|undefined>(undefined);


  register(email: string, username:string,password: string): Observable<void>{
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).
    then(reponse=>updateProfile(reponse.user, {displayName: username}));
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((response) => {
        // Update the signal immediately
        this.currentUserSig.set({
          email: response.user.email!,
          username: response.user.displayName!,
        });
      })
      .catch((error) => {
        console.error('Login failed:', error);
        throw error; // Rethrow for error handling in the component
      });
    return from(promise);
  }
  

  logoutcall() :Observable<void>{
      const promise = signOut(this.firebaseAuth);
      return from(promise);
    } 

  isLoggedIn(): boolean {
    return this.currentUserSig() !== null;
  }

  
}
