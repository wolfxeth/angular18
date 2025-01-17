import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './modals/User';
import { Movies } from './modals/Movies';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl =
    'https://cloudruntest-springboot-755498942514.us-central1.run.app/api/users';
  private apiMovies =
    'https://cloudruntest-springboot-755498942514.us-central1.run.app/api/movies';
  //private apiMovies = 'http://localhost:8080/api/movies';
  //private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getMovies(page: number, size: number): Observable<any> {
    // Add pagination parameters to the request
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // Return the response as an Observable of type any, which includes paginated movies
    return this.http.get<any>(this.apiMovies, { params });
  }

  getTopRatedMoviesByYear(year: number): Observable<any> {
    // Add pagination parameters to the request
    const params = new HttpParams().set('year', year.toString());
    return this.http.get<any>(this.apiMovies + '/trending', { params });
  }

  searchMovies(query: string): Observable<Movies[]> {
    const searchUrl = `${this.apiMovies}/search?query=${query}`;
    return this.http.get<Movies[]>(searchUrl);
  }
}
