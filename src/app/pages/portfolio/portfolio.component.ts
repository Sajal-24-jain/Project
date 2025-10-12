import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
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
      description: 'Angular-based Hospital management portal.',
      tech: ['Angular', 'NodeJs', 'MySQL'],
      image: 'assets/4.png',
      github: 'https://github.com/your-repo',
      youtube: 'https://youtube.com/your-video'
    }
  ];

  visibleCount = 4;
  isSmallScreen = false;

  ngOnInit() {
    this.updateVisibleCount(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateVisibleCount(event.target.innerWidth);
  }

  updateVisibleCount(width: number) {
    if (width <= 500) {
      this.visibleCount = 2;
      this.isSmallScreen = true;
    } else {
      this.visibleCount = 4;
      this.isSmallScreen = false;
    }
  }

  get visibleProjects() {
    return this.projects.slice(0, this.visibleCount);
  }

  viewMore() {
    this.visibleCount = Math.min(this.visibleCount + 2, this.projects.length);
  }
}
