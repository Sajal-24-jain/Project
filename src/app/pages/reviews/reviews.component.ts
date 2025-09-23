// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// interface Review {
//   name: string;
//   message: string;
//   rating: number;
// }

// @Component({
//   selector: 'app-reviews',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './reviews.component.html',
//   styleUrls: ['./reviews.component.scss']
// })
// export class ReviewsComponent implements OnInit, OnDestroy {
//   reviews: Review[] = [
//     { name: 'Ranjeeth Rathod', message: 'Amazing service! Very professional and helpful.', rating: 5 },
//     { name: 'Deepak Durai Raj', message: 'Great experience overall, would definitely recommend.', rating: 4 },
//     { name: 'Ramesh Babu', message: 'Satisfactory service but room for improvement.', rating: 3 },
//     { name: 'Priya Sharma', message: 'Absolutely loved working with the team!', rating: 5 },
//     { name: 'Vikram Singh', message: 'Support was great, highly recommend them.', rating: 4 },
//     { name: 'Sneha Patel', message: 'Fast and reliable service. Will hire again!', rating: 5 }
//   ];

//   newReview: Review = { name: '', message: '', rating: 0 };
//   currentIndex = 0;
//   itemsPerSlide = 3;
//   autoSlideInterval: any;

//   ngOnInit(): void {
//     // start auto slider (every 5 seconds)
//     this.autoSlideInterval = setInterval(() => {
//       this.nextSlide();
//     }, 5000);
//   }

//   ngOnDestroy(): void {
//     if (this.autoSlideInterval) {
//       clearInterval(this.autoSlideInterval);
//     }
//   }

//   submitReview() {
//     if (this.newReview.name && this.newReview.message && this.newReview.rating > 0) {
//       this.reviews.unshift({ ...this.newReview });
//       this.newReview = { name: '', message: '', rating: 0 };
//       this.currentIndex = 0; // show newest review first
//     }
//   }

//   setRating(rating: number) {
//     this.newReview.rating = rating;
//   }

//   getStars(rating: number): string[] {
//     return Array(rating).fill('★').concat(Array(5 - rating).fill('☆'));
//   }

//   nextSlide() {
//     if (this.currentIndex + this.itemsPerSlide < this.reviews.length) {
//       this.currentIndex += this.itemsPerSlide;
//     } else {
//       this.currentIndex = 0; // restart from beginning
//     }
//   }

//   prevSlide() {
//     if (this.currentIndex - this.itemsPerSlide >= 0) {
//       this.currentIndex -= this.itemsPerSlide;
//     } else {
//       this.currentIndex = Math.max(this.reviews.length - this.itemsPerSlide, 0);
//     }
//   }

//   get visibleReviews(): Review[] {
//     return this.reviews.slice(this.currentIndex, this.currentIndex + this.itemsPerSlide);
//   }
// }


import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  reviews = [
    {
      message: `It has been a very positive experience so far and the IKF team have delivered 
      great results within 9 months. The team has a great attitude and gets the work done with 
      regular follow-ups. With their efforts, we are seeing an increased traffic on our website...`,
      name: 'Akash Achwal',
      company: 'Crest Test Systems',
      image: 'https://i.pravatar.cc/80?img=12'
    },
    {
      message: `IKF helped us achieve higher ranking in Google search results 
      and boosted our LinkedIn & Facebook engagement significantly.`,
      name: 'Sneha Sharma',
      company: 'Tech Innovators',
      image: 'https://i.pravatar.cc/80?img=15'
    },
    {
    message: `Thanks to IKF, our brand visibility has grown tremendously 
      and we’re generating more quality leads.`,
    name: 'Priya Nair',
    company: 'Global Enterprises',
    image: 'https://i.pravatar.cc/80?img=17'
  },
  {
    message: `The digital marketing strategies implemented by IKF gave 
      us an edge over competitors in a short time.`,
    name: 'Amit Kulkarni',
    company: 'Bright Future Pvt. Ltd.',
    image: 'https://i.pravatar.cc/80?img=18'
  },
  {
    message: `Professional, reliable, and creative – IKF transformed our 
      online presence with impactful campaigns.`,
    name: 'Neha Gupta',
    company: 'Visionary Tech',
    image: 'https://i.pravatar.cc/80?img=19'
  },
   {
    message: `The website revamp exceeded expectations – clean, fast, and user-friendly.`,
    name: 'Shivani Deshmukh',
    company: 'AlphaCorp',
    image: 'https://i.pravatar.cc/80?img=21'
  },
  {
    message: `Great communication and excellent support throughout our project.`,
    name: 'Vikram Singh',
    company: 'CloudMatrix',
    image: 'https://i.pravatar.cc/80?img=22'
  },
  {
    message: `We saw an immediate boost in engagement after their social media strategy.`,
    name: 'Ananya Reddy',
    company: 'GreenTech',
    image: 'https://i.pravatar.cc/80?img=23'
  },
  ];

  currentIndex = 0;

  nextReview() {
    this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
  }

  prevReview() {
    this.currentIndex =
      (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
  }
}
