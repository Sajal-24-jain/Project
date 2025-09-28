import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  projects = [
    {
      title: 'Project One',
      description: 'Short description for project one.',
      images: ['assets/1.jpg', 'assets/1bro.jpg', 'assets/banner.jpg']
    },
    {
      title: 'Project Two',
      description: 'Short description for project two.',
      images: ['assets/p2-1.jpg', 'assets/p2-2.jpg']
    },
    {
      title: 'Project Three',
      description: 'Short description for project three.',
      images: ['assets/p3-1.jpg']
    }
  ];

  currentIndex = 0;

  nextProject() {
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
  }

  prevProject() {
    this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
  }
}
