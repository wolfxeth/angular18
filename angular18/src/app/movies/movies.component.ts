import { Component, OnInit } from '@angular/core';
import { Movies } from '../modals/Movies';
import { UserService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component'; // Import the MovieCardComponent
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  imports: [CommonModule, MovieCardComponent, MatSnackBarModule, FormsModule], // Make sure MovieCardComponent is declared here
})
export class MoviesComponent implements OnInit {
  movies: Movies[] = []; // Movies to display on the current page
  currentPage: number = 0;
  pageSize: number = 50;
  totalMovies: number = 0;
  totalPages: number = 0;
  selectedMovie: Movies | null = null;
  selectedYear: number = new Date().getFullYear(); // Default to the current year
  years: number[] = [];
  loading: boolean = false;
  searchQuery: string = '';
  suggestions: Movies[] = [];
  debounceTimer: any;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadMovies(this.currentPage, this.pageSize);

    this.populateYears();
    //this.getTopRatedMoviesByYear(this.selectedYear);
  }

  onSearchInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    if (query.length < 3) {
      this.suggestions = [];
      return;
    }

    // Debounce API calls
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      this.fetchSuggestions(query);
    }, 300);
  }

  fetchSuggestions(query: string): void {
    this.userService.searchMovies(query).subscribe({
      next: (movies: Movies[]) => {
        this.suggestions = movies;
      },
      error: (err) => {
        console.error('Error fetching movie suggestions', err);
        this.suggestions = [];
      },
    });
  }

  selectMovie(movie: Movies): void {
    this.selectedMovie = movie;
    this.suggestions = [];
  }

  // Fetch top-rated movies by selected year
  getTopRatedMoviesByYear(year: number): void {
    this.loading = true; // Set loading to true when starting the request

    this.userService.getTopRatedMoviesByYear(year).subscribe({
      next: (data: Movies[]) => {
        this.loading = false; // Set loading to false once data is received

        if (data && data.length > 0) {
          this.movies = data;
        } else {
          this.movies = []; // Clear the list if no data is returned
        }
      },
      error: (err) => {
        this.loading = false; // Set loading to false on error
        console.error(`Error fetching top-rated movies for year ${year}:`, err);
      },
    });
  }

  notifyUser(message: string): void {
    // Example: Using a toast or a snackbar to display the message
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  // Populate years dropdown
  populateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1970; year--) {
      this.years.push(year);
    }
  }

  // Handle year change from dropdown
  onYearChange(event: Event): void {
    const year = (event.target as HTMLSelectElement).value;
    this.selectedYear = parseInt(year, 10);
    this.getTopRatedMoviesByYear(this.selectedYear);
  }

  loadMovies(page: number, size: number): void {
    this.userService.getMovies(page, size).subscribe({
      next: (data: any) => {
        this.movies = data.content;
        this.totalMovies = data.totalElements;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        console.error('Error fetching movies', err);
      },
    });
  }

  // Movie details handler (to show details when a card is clicked)
  showMovieDetails(movie: Movies): void {
    this.selectedMovie = movie;
  }
  // Close movie details modal
  closeMovieDetails(): void {
    this.selectedMovie = null;
  }

  // Pagination methods
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadMovies(this.currentPage, this.pageSize);
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMovies(this.currentPage, this.pageSize);
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadMovies(this.currentPage, this.pageSize);
    }
  }

  // Track movie by its unique id (for better performance in *ngFor)
  trackByMovieId(index: number, movie: Movies): string {
    return movie._id; // Assuming 'id' is a unique string property for each movie
  }
}
