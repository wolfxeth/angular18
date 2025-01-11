import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { MoviesComponent } from './movies/movies.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard'; // Import the AuthGuard
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  // Login route
  { path: 'login', component: LoginComponent },

  // Protected routes
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },


  // Default route
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Wildcard route (fallback to login if path doesn't match)
  { path: '**', redirectTo: '/login' },
];
