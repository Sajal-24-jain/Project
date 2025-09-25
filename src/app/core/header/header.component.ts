import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

// export class HeaderComponent {
//   isHero = true; // true when over hero section

//   scrollToSection(sectionId: string) {
//   const el = document.getElementById(sectionId);
//   if (el) {
//     el.scrollIntoView({ behavior: 'smooth', block: 'start' });

//     // Add active-section class to trigger overlay animation
//     el.classList.add('active-section');

//     // Remove the class after 1s so you can click again
//     setTimeout(() => el.classList.remove('active-section'), 1000);
//   }
// }
// // Inside your component.ts
// isDarkTheme: boolean = false;

// toggleTheme() {
//   this.isDarkTheme = !this.isDarkTheme;

//   if (this.isDarkTheme) {
//     document.body.classList.add('dark-theme');
//     document.body.classList.remove('light-theme');
//   } else {
//     document.body.classList.add('light-theme');
//     document.body.classList.remove('dark-theme');
//   }
// }


//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     const hero = document.getElementById('hero');
//     if (hero) {
//       const heroBottom = hero.getBoundingClientRect().bottom;
//       this.isHero = heroBottom > 0; // true if still in hero section
//     }
//   }
// }

export class HeaderComponent {
  isHero = true;
  currentLogo = 'assets/logoo3.png'; // default logo

  // Scroll to section
  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });

      el.classList.add('active-section');
      setTimeout(() => el.classList.remove('active-section'), 1000);
    }
  }

  // Theme
  isDarkTheme: boolean = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  // Scroll listener
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const hero = document.getElementById('hero');
    if (hero) {
      const heroBottom = hero.getBoundingClientRect().bottom;
      this.isHero = heroBottom > 0;

      // change logo based on section
      this.currentLogo = this.isHero
        ? 'assets/logoo3.png'
        : 'assets/1bro.png';
    }
  }
}
