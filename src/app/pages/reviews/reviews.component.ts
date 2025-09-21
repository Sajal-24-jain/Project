import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Review {
  name: string;
  message: string;
  rating: number;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  reviews: Review[] = [
    { name: 'Ranjeeth Rathod', message: 'Amazing service! Very professional and helpful.', rating: 5 },
    { name: 'Deepak Durai Raj', message: 'Great experience overall, would definitely recommend.', rating: 4 },
    { name: 'Ramesh Babu', message: 'Satisfactory service but room for improvement.', rating: 3 },
    { name: 'Priya Sharma', message: 'Absolutely loved working with the team!', rating: 5 },
    { name: 'Vikram Singh', message: 'Support was great, highly recommend them.', rating: 4 },
    { name: 'Sneha Patel', message: 'Fast and reliable service. Will hire again!', rating: 5 }
  ];

  newReview: Review = { name: '', message: '', rating: 0 };
  currentIndex = 0;
  itemsPerSlide = 3;
  autoSlideInterval: any;

  ngOnInit(): void {
    // start auto slider (every 5 seconds)
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  submitReview() {
    if (this.newReview.name && this.newReview.message && this.newReview.rating > 0) {
      this.reviews.unshift({ ...this.newReview });
      this.newReview = { name: '', message: '', rating: 0 };
      this.currentIndex = 0; // show newest review first
    }
  }

  setRating(rating: number) {
    this.newReview.rating = rating;
  }

  getStars(rating: number): string[] {
    return Array(rating).fill('★').concat(Array(5 - rating).fill('☆'));
  }

  nextSlide() {
    if (this.currentIndex + this.itemsPerSlide < this.reviews.length) {
      this.currentIndex += this.itemsPerSlide;
    } else {
      this.currentIndex = 0; // restart from beginning
    }
  }

  prevSlide() {
    if (this.currentIndex - this.itemsPerSlide >= 0) {
      this.currentIndex -= this.itemsPerSlide;
    } else {
      this.currentIndex = Math.max(this.reviews.length - this.itemsPerSlide, 0);
    }
  }

  get visibleReviews(): Review[] {
    return this.reviews.slice(this.currentIndex, this.currentIndex + this.itemsPerSlide);
  }
}
