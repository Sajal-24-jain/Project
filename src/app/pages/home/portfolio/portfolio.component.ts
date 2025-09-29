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
      title: 'College Website',
      description: 'A dynamic college website with user authentication, registration, and profile management.',
      tech: ['Angular', 'Node.js', 'MongoDB'],
      image: 'assets/p1.png',
      github: 'https://github.com/your-repo',
      youtube: 'https://youtube.com/your-video'
    },
    {
      title: 'AR Cultural App',
      description: 'An AR app showcasing India’s cultural heritage through interactive experiences.',
      tech: ['Unity', 'ARCore', 'C#'],
      image: 'assets/p2.png',
      github: 'https://github.com/your-repo',
      youtube: 'https://youtube.com/your-video'
    },
    {
      title: 'Book Lending System',
      description: 'Flask-based book lending system with role-based login and fine calculation.',
      tech: ['Python', 'Flask', 'SQLite'],
      image: 'assets/3.png',
      github: 'https://github.com/your-repo',
      youtube: 'https://youtube.com/your-video'
    },
    {
      title: 'Hospital Management Portal',
      description: 'Angular-based Hospiatl management portal.',
      tech: ['Angular', 'NodeJs', 'MySQL'],
      image: 'assets/4.png',
      github: 'https://github.com/your-repo',
      youtube: 'https://youtube.com/your-video'
    }
  ];

  visibleCount = 2; // show only 2 initially

  get visibleProjects() {
    return this.projects.slice(0, this.visibleCount);
  }

  viewMore() {
    this.visibleCount = Math.min(this.visibleCount + 2, this.projects.length);
  }
}
