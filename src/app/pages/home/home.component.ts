import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { ServicesComponent } from './services/services.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AboutComponent } from './about/about.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { ContactComponent } from '../../Contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ServicesComponent, PortfolioComponent, AboutComponent, ReviewsComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
