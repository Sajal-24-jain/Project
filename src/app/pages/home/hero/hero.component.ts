import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  headline = 'We build modern, scalable web apps';
  subHeadline = 'Helping startups and businesses grow online with Angular, Node.js, and cloud solutions.';
  heroImage = 'https://picsum.photos/500/400?blur=2';
}
