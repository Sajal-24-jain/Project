// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-footer',
//   imports: [],
//   templateUrl: './footer.component.html',
//   styleUrl: './footer.component.scss'
// })
// export class FooterComponent {

// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  // Scroll to section
  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });

      el.classList.add('active-section');
      setTimeout(() => el.classList.remove('active-section'), 1000);
    }
  }
 }
