import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// Firebase and AngularFire imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';



const firebaseConfig = {
  apiKey: "AIzaSyBhEXbWZVy1TA0bjx5emQgSfDURmfmMSEU",
  authDomain: "cloud-run-73ca3.firebaseapp.com",
  projectId: "cloud-run-73ca3",
  storageBucket: "cloud-run-73ca3.firebasestorage.app",
  messagingSenderId: "1042438173697",
  appId: "1:1042438173697:web:1c47765cec5277e3297c00"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // Replaces HttpClientModule
    provideClientHydration(withEventReplay()), provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
    
  ],
};
