import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Feature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

interface TechStackItem {
  icon: string;
  mark: string;
  name: string;
  role: string;
  description: string;
  gradient: string;
}

interface AiCapability {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule]
})
export class HomeComponent implements OnInit{
  firstCardText: string = 'Hey, this is Akshay'; // Full text to display
  displayedText: string = ''; // Text displayed dynamically
  typingSpeed: number = 80; // Speed of typing effect in milliseconds

  features: Feature[] = [
    {
      icon: 'movie_filter',
      title: 'Smart Movie Discovery',
      description: 'Search, filter and browse a real dataset with instant suggestions and smooth animations.',
      gradient: 'linear-gradient(135deg, #ff5cad, #7c5cff)'
    },
    {
      icon: 'groups',
      title: 'User Directory',
      description: 'A searchable, animated directory of every registered user with quick-copy contact details.',
      gradient: 'linear-gradient(135deg, #34d399, #7c5cff)'
    },
    {
      icon: 'security',
      title: 'Protected Sessions',
      description: 'Every page beyond login is guarded — refresh, revisit or share a link and access stays secure.',
      gradient: 'linear-gradient(135deg, #22d3ee, #34d399)'
    }
  ];

  aiCapabilities: AiCapability[] = [
    {
      icon: 'psychology',
      title: 'Understands plain English',
      description: '"Top rated romantic movies from 2013" gets turned into a real, structured database query — no forms, no filters to click.'
    },
    {
      icon: 'auto_awesome_motion',
      title: 'Semantic "movies like X"',
      description: 'Plot embeddings + cosine similarity find movies that feel alike, not just ones sharing a genre tag.'
    },
    {
      icon: 'travel_explore',
      title: 'Live catalog fallback',
      description: 'Requests for newer releases automatically reach out to TMDB in real time when the local dataset can\'t answer.'
    }
  ];

  techStack: TechStackItem[] = [
    {
      icon: 'web',
      mark: 'Ng',
      name: 'Angular 19',
      role: 'Frontend',
      description: 'Standalone components, signals and a fully custom design system power this entire UI.',
      gradient: 'linear-gradient(135deg, #dd0031, #7c5cff)'
    },
    {
      icon: 'dns',
      mark: 'Sb',
      name: 'Spring Boot',
      role: 'Backend API',
      description: 'A Java REST API deployed on Google Cloud Run handles auth, movies, users and the AI orchestration.',
      gradient: 'linear-gradient(135deg, #6db33f, #22d3ee)'
    },
    {
      icon: 'storage',
      mark: 'Mo',
      name: 'MongoDB Atlas',
      role: 'Database',
      description: 'The `sample_mflix` dataset stores movies and users, queried through dynamic, AI-generated filters.',
      gradient: 'linear-gradient(135deg, #00ed64, #00684a)'
    },
    {
      icon: 'local_fire_department',
      mark: 'Fb',
      name: 'Firebase Auth',
      role: 'Authentication',
      description: 'Secures every protected route with email/password sign-in and session management.',
      gradient: 'linear-gradient(135deg, #ffca28, #ff5cad)'
    },
    {
      icon: 'cloud_queue',
      mark: 'Gc',
      name: 'Google Cloud Run',
      role: 'Hosting',
      description: 'Serverless, autoscaling container hosting for the Spring Boot backend.',
      gradient: 'linear-gradient(135deg, #4285f4, #34a853)'
    },
    {
      icon: 'auto_awesome',
      mark: 'Ge',
      name: 'Gemini API',
      role: 'AI / LLM',
      description: 'Turns free-text prompts into structured queries and generates plot embeddings for semantic search.',
      gradient: 'linear-gradient(135deg, #7c5cff, #22d3ee)'
    },
    {
      icon: 'live_tv',
      mark: 'Tm',
      name: 'TMDB API',
      role: 'Live movie data',
      description: 'Fills the gap for new releases the local dataset does not have yet.',
      gradient: 'linear-gradient(135deg, #01b4e4, #90cea1)'
    }
  ];

  ngOnInit(): void {
    this.typeText();
  }

  typeText(): void {
    let index = 0;
    const interval = setInterval(() => {
      if (index < this.firstCardText.length) {
        this.displayedText += this.firstCardText[index];
        index++;
      } else {
        clearInterval(interval); // Stop typing when all text is displayed
      }
    }, this.typingSpeed);
  }
}
