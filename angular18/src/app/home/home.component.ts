import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[CommonModule]
})
export class HomeComponent implements OnInit{
  isSecondCardVisible = false;
  isThirdCardVisible = false;
  firstCardText: string = 'Hey, this is Akshay'; // Full text to display
  displayedText: string = ''; // Text displayed dynamically
  typingSpeed: number = 100; // Speed of typing effect in milliseconds


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
  
  toggleSecondCard() {
    this.isSecondCardVisible = !this.isSecondCardVisible;

    // Hide the third card when the second card is hidden
    if (!this.isSecondCardVisible) {
      this.isThirdCardVisible = false;
    }
  }

  toggleThirdCard() {
    if (this.isSecondCardVisible) {
      this.isThirdCardVisible = !this.isThirdCardVisible;
    }
  }
}
