
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
  isMenuOpen = false;
  isHero = true;
  isMaintenance = true;
  currentLogo = 'assets/logoo3.png'; // default logo
  isDarkTheme: boolean = false;
  activeLink: string = '';

constructor(private router: Router) {
  // Detect route changes
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.handleRouteChange(event.urlAfterRedirects);
    });
}
private handleRouteChange(url: string) {
  if (url === '/' || url.startsWith('/#')) {
    // Home page → depends on scroll
    this.onWindowScroll();
  } else {
    // Other routes → fixed logo / navbar
    this.isHero = false;
    this.currentLogo = 'assets/1bro.png';
  }
}

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
            this.scrollToSection(sectionId);
            this.activeLink = sectionId;
            subscription.unsubscribe(); // clean up
          });
      });
    } else {
      // Already on home page, just scroll
      this.scrollToSection(sectionId);
      this.activeLink = sectionId;
    }
  }

  toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}
 @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  // Optional: prevent clicks inside the navbar from closing it
  @HostListener('click', ['$event'])
  insideNavbar(event: Event) {
    event.stopPropagation();
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
  if (this.router.url !== '/' && !this.router.url.startsWith('/#')) {
    return; // ignore scroll if not on home
  }

  const hero = document.getElementById('hero');
  if (hero) {
    const heroBottom = hero.getBoundingClientRect().bottom;
    this.isHero = heroBottom > 0;
    this.currentLogo = this.isHero ? 'assets/logoo3.png' : 'assets/1bro.png';
  }

  // Detect active section
  const sections = ['home', 'services', 'portfolio', 'about', 'contact'];
  let current = '';
  for (let section of sections) {
    const el = document.getElementById(section);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        current = section;
        break;
      }
    }
  }
  this.activeLink = current;
}
}
