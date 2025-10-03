import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {
  words: string[] = ["Innovate", "Design", "Create", "Frame", "Define", "Solve"];
  currentWord: string = this.words[0];
  isFading: boolean = false;
  viewMore = false;
  isMobile = false;

  serviceCards = [
    {
      icon: 'fas fa-code',
      title: 'Web Development',
      desc: 'Build to view on any device.'
    },
    {
      icon: 'fas fa-pencil-ruler',
      title: 'Web Design',
      desc: 'Get a visual influential design / tool.'
    },
    {
      icon: 'fas fa-search',
      title: 'SEO',
      desc: 'The first page or do not exist (Do or Die).'
    },
    {
      icon: 'fas fa-shopping-cart',
      title: 'Ecommerce',
      desc: 'Make it easy for your customers.'
    },
    {
      icon: 'fas fa-layer-group',
      title: 'UI/UX Design',
      desc: 'Let your user love your interface.'
    }
  ];
  visibleCount = 1;

  private wordIndex = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 500;
    this.visibleCount = this.isMobile ? 1 : this.serviceCards.length;
    window.addEventListener('resize', this.handleResize);
    this.intervalId = setInterval(() => {
      this.isFading = true;
      setTimeout(() => {
        this.wordIndex = (this.wordIndex + 1) % this.words.length;
        this.currentWord = this.words[this.wordIndex];
        this.isFading = false;
      }, 600);
    }, 2000);
  }

  handleResize = () => {
    this.isMobile = window.innerWidth <= 500;
    this.visibleCount = this.isMobile ? 1 : this.serviceCards.length;
  };

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    window.removeEventListener('resize', this.handleResize);
  }
}