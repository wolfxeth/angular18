import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { MoviesComponent } from './movies/movies.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UserListComponent },
  { path: 'movies', component: MoviesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }  // Default route
];
