import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movies } from '../modals/Movies';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie!: Movies;  // Input movie data from parent component
  @Output() movieClicked = new EventEmitter<Movies>();  // Output event when movie is clicked

  defaultPoster: string = '404.png';  // Path to default poster image

  // Handle the error for image load failure
  setDefaultPoster(event: any): void {
    event.target.src = this.defaultPoster;  // Set to default image
  }

  // Emit movie clicked event
  onCardClick(): void {
    this.movieClicked.emit(this.movie);
  }
}
