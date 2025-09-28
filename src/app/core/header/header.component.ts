import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isHero = true;
  isMaintenance = true;
  currentLogo = 'assets/logoo3.png'; // default logo
  isDarkTheme: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  /**
   * Navigate to home page (if needed) and scroll to section
   * @param sectionId - ID of the target section
   */
  goToHome(sectionId: string) {
    if (this.router.url !== '/') {
      // Navigate to home first
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        // Wait for navigation to complete
        const subscription = this.router.events
          .pipe(filter(event => event instanceof NavigationEnd))
          .subscribe(() => {
            this.scrollToSection('hero');
            subscription.unsubscribe(); // clean up
          });
      });
    } else {
      // Already on home page, just scroll
      this.scrollToSection(sectionId);
    }
  }

  
  /**
   * Scroll to a section by ID
   * @param sectionId - ID of the target section
   */
  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.add('active-section');
      this.currentLogo = this.isHero ? 'assets/logoo3.png' : 'assets/1bro.png';

      setTimeout(() => el.classList.remove('active-section'), 1000);
    }
  }

  /**
   * Toggle light/dark theme
   */
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

  /**
   * Scroll listener to detect hero section and change logo
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const hero = document.getElementById('hero');
    const maintenance = document.getElementById('maintenance');
    if (hero) {
      const heroBottom = hero.getBoundingClientRect().bottom;
      this.isHero = heroBottom > 0;
      this.currentLogo = this.isHero ? 'assets/logoo3.png' : 'assets/1bro.png';
    }
     if (maintenance) {
      const heroBottom = maintenance.getBoundingClientRect().bottom;
      this.isHero = heroBottom > 0;
      this.currentLogo = this.isMaintenance ? 'assets/logoo3.png' : 'assets/1bro.png';
    }
  }
}
