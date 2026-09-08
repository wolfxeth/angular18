import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AiSearchResponse } from './modals/AiSearch';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AiSearchService {
  private apiAsk = `${environment.apiBaseUrl}/movies/ask`;

  constructor(private http: HttpClient) {}

  ask(prompt: string): Observable<AiSearchResponse> {
    return this.http.post<AiSearchResponse>(this.apiAsk, { prompt });
  }
}
