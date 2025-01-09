import { Component, OnInit } from '@angular/core';
import { Movies } from '../modals/Movies';
import { UserService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';  // Import the MovieCardComponent

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  imports: [CommonModule, MovieCardComponent]  // Make sure MovieCardComponent is declared here
})
export class MoviesComponent implements OnInit {
  movies: Movies[] = [];  // Movies to display on the current page
  currentPage: number = 0;
  pageSize: number = 50;
  totalMovies: number = 0;
  totalPages: number = 0;
  selectedMovie: Movies | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadMovies(this.currentPage, this.pageSize);
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
    return movie._id;  // Assuming 'id' is a unique string property for each movie
  }
}
