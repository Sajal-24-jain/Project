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
      title: 'E-commerce Website', 
      description: 'A modern shopping platform with payment integration.', 
      image: 'https://picsum.photos/400/300?random=1' 
    },
    { 
      title: 'Business Dashboard', 
      description: 'Analytics dashboard for tracking KPIs in real-time.', 
      image: 'https://picsum.photos/400/300?random=2' 
    },
    { 
      title: 'Landing Page', 
      description: 'Marketing site designed to maximize conversions.', 
      image: 'https://picsum.photos/400/300?random=3' 
    }
  ];

  viewProject(project: any) {
    window.open(project.link, '_blank'); // Opens in new tab
  }
}
