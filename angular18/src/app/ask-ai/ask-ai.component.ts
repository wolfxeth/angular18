import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiSearchService } from '../ai-search.service';
import { AiMovieResult, AiSearchResponse } from '../modals/AiSearch';

@Component({
  selector: 'app-ask-ai',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ask-ai.component.html',
  styleUrl: './ask-ai.component.css',
})
export class AskAiComponent {
  prompt = '';
  loading = false;
  errorMessage: string | null = null;
  response: AiSearchResponse | null = null;

  examplePrompts = [
    'Top rated romantic movies from 2016',
    'Movies like Inception',
    'Latest action movies',
  ];

  constructor(private aiSearchService: AiSearchService) {}

  useExample(example: string): void {
    this.prompt = example;
    this.ask();
  }

  ask(): void {
    const trimmed = this.prompt.trim();
    if (!trimmed || this.loading) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.response = null;

    this.aiSearchService.ask(trimmed).subscribe({
      next: (res) => {
        this.response = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.error || 'Something went wrong while talking to the AI. Please try again.';
        this.loading = false;
      },
    });
  }

  setDefaultPoster(event: Event): void {
    (event.target as HTMLImageElement).src = '404.png';
  }

  trackByResult(index: number, result: AiMovieResult): string {
    return result.id;
  }
}
