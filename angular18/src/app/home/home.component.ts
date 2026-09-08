import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Feature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
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
      icon: 'bolt',
      title: 'Modern Angular',
      description: 'Standalone components, signals and the latest Angular 19 features power the experience end to end.',
      gradient: 'linear-gradient(135deg, #7c5cff, #22d3ee)'
    },
    {
      icon: 'movie_filter',
      title: 'Live Movie Catalog',
      description: 'Search, filter and browse a real dataset with instant suggestions and smooth animations.',
      gradient: 'linear-gradient(135deg, #ff5cad, #7c5cff)'
    },
    {
      icon: 'security',
      title: 'Secure Auth',
      description: 'Firebase-backed authentication guards every protected route across the app.',
      gradient: 'linear-gradient(135deg, #22d3ee, #34d399)'
    },
    {
      icon: 'cloud',
      title: 'Cloud Native Backend',
      description: 'A Spring Boot API deployed on Cloud Run serves data behind the scenes.',
      gradient: 'linear-gradient(135deg, #34d399, #7c5cff)'
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
