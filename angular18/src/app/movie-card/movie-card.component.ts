import { Component, Input, Output, EventEmitter, input, computed, output } from '@angular/core';
import { Movies } from '../modals/Movies';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  //old way of defining input and output
  // @Input({required:true}) movie!: Movies;  // Input movie data from parent component
  // @Output() movieClicked = new EventEmitter<Movies>();  // Output event when movie is clicked

  movie=input.required<Movies>();

  movieClicked=output<Movies>();

  defaultPoster: string = '404.png';  // Path to default poster image

  //if you need to read any value coming from the parent component, you can use computed property
  // sample=computed(()=>this.movie().poster);  // Get the poster path of the movie

  // Handle the error for image load failure
  setDefaultPoster(event: any): void {
    event.target.src = this.defaultPoster;  // Set to default image
  }

  // Emit movie clicked event
  onCardClick(): void {
    this.movieClicked.emit(this.movie());//call movies as a function
  }
}
