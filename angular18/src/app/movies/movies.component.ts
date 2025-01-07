import { Component, OnInit } from '@angular/core';
import { Movies } from '../modals/Movies';
import { UserService } from '../user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  movies: Movies[] = [];  // Movies to display on the current page
  currentPage: number = 0;  // Current page (0-indexed)
  pageSize: number = 10;    // Number of movies per page
  totalMovies: number = 0;  // Total number of movies (for pagination controls)
  totalPages: number = 0;   // Total pages available
  constructor(private userservice:UserService) { }

  ngOnInit(): void {
    this.loadMovies(this.currentPage, this.pageSize); 
  }
  loadMovies(page: number, size: number): void {
    this.userservice.getMovies(page, size).subscribe({
      next: (data: any) => {
        this.movies = data.content;  // Get the movies for the current page
        this.totalMovies = data.totalElements;  // Total number of movies
        this.totalPages = data.totalPages;  // Total pages available
      },
      error: (err) => {
        console.error('Error fetching movies', err);
      },
    });
  }

   // Navigate to the next page
   nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadMovies(this.currentPage, this.pageSize);
    }
  }

  // Navigate to the previous page
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMovies(this.currentPage, this.pageSize);
    }
  }

  // Navigate to a specific page
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadMovies(this.currentPage, this.pageSize);
    }
  }



}
