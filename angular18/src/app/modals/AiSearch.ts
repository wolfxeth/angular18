export type MovieSource = 'catalog' | 'tmdb-live';

export interface AiMovieResult {
  id: string;
  title: string;
  poster: string | null;
  year: string | null;
  rating: number | null;
  genres: string[] | null;
  source: MovieSource;
  similarityScore: number | null;
}

export interface ParsedMovieQuery {
  intent: 'FILTER' | 'SIMILAR' | 'LATEST';
  genres: string[] | null;
  yearFrom: number | null;
  yearTo: number | null;
  minRating: number | null;
  limit: number | null;
  referenceTitle: string | null;
  sortBy: string | null;
  summary: string;
}

export interface AiSearchResponse {
  summary: string;
  understood: ParsedMovieQuery;
  results: AiMovieResult[];
}
