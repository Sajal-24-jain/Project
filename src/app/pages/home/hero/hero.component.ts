// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-hero',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './hero.component.html',
//   styleUrls: ['./hero.component.scss']
// })
// export class HeroComponent {
//   headline = 'We build modern, scalable web apps';
//   subHeadline = 'Helping startups and businesses grow online with Angular, Node.js, and cloud solutions.';
//   heroImage = 'https://picsum.photos/500/400?blur=2';
// }


// import { Component, AfterViewInit, OnDestroy } from '@angular/core';

// @Component({
//   selector: 'app-hero',
//   templateUrl: './hero.component.html',
//   styleUrls: ['./hero.component.scss']
// })
// export class HeroComponent implements AfterViewInit, OnDestroy {
//   headline = 'ProjectOverflow';
//   subHeadline = 'Innovation without limits.';

//   private particlesContainer!: HTMLElement;
//   private mouseMoveHandler!: (e: MouseEvent) => void;

//   ngAfterViewInit(): void {
//     this.particlesContainer = document.getElementById('particles-container') as HTMLElement;

//     if (this.particlesContainer) {
//       const particleCount = 80;
//       for (let i = 0; i < particleCount; i++) {
//         this.createParticle();
//       }
//     }

//     this.mouseMoveHandler = this.handleMouseMove.bind(this);
//     document.addEventListener('mousemove', this.mouseMoveHandler);
//   }

//   ngOnDestroy(): void {
//     document.removeEventListener('mousemove', this.mouseMoveHandler);
//   }

//   private createParticle(): void {
//     const particle = document.createElement('div');
//     particle.className = 'particle';

//     const size = Math.random() * 3 + 1;
//     particle.style.width = `${size}px`;
//     particle.style.height = `${size}px`;

//     this.resetParticle(particle);
//     this.particlesContainer.appendChild(particle);

//     this.animateParticle(particle);
//   }

//   private resetParticle(particle: HTMLElement): { x: number; y: number } {
//     const posX = Math.random() * 100;
//     const posY = Math.random() * 100;

//     particle.style.left = `${posX}%`;
//     particle.style.top = `${posY}%`;
//     particle.style.opacity = '0';

//     return { x: posX, y: posY };
//   }

//   private animateParticle(particle: HTMLElement): void {
//     const pos = this.resetParticle(particle);
//     const duration = Math.random() * 10 + 10;
//     const delay = Math.random() * 5;

//     setTimeout(() => {
//       particle.style.transition = `all ${duration}s linear`;
//        void particle.offsetWidth;
//       particle.style.opacity = (Math.random() * 0.3 + 0.1).toString();

//       const moveX = pos.x + (Math.random() * 20 - 10);
//       const moveY = pos.y - Math.random() * 30;

//       particle.style.left = `${moveX}%`;
//       particle.style.top = `${moveY}%`;
//       particle.style.transform = `scale(${Math.random() * 1.5 + 0.5})`;

//       setTimeout(() => {
//         this.animateParticle(particle);
//       }, duration * 1000);
//     }, delay * 1000);
//   }

//   private handleMouseMove(e: MouseEvent): void {
//     const mouseX = (e.clientX / window.innerWidth) * 100;
//     const mouseY = (e.clientY / window.innerHeight) * 100;

//     const particle = document.createElement('div');
//     particle.className = 'particle';

//     const size = Math.random() * 4 + 2;
//     particle.style.width = `${size}px`;
//     particle.style.height = `${size}px`;

//     particle.style.left = `${mouseX}%`;
//     particle.style.top = `${mouseY}%`;
//     particle.style.opacity = '0.6';
//      particle.style.transform = 'scale(2)';

//     this.particlesContainer.appendChild(particle);

//     setTimeout(() => {
//       particle.style.transition = 'all 2s ease-out';
//       particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
//       particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
//       particle.style.opacity = '0';
//       particle.style.transform = 'scale(2)'; 

//       setTimeout(() => {
//         particle.remove();
//       }, 2000);
//     }, 10);

//     const spheres = document.querySelectorAll('.gradient-sphere');
//     const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
//     const moveY = (e.clientY / window.innerHeight - 0.5) * 5;

//     spheres.forEach(sphere => {
//       (sphere as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
//     });
//   }
// }



import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, Renderer2, NgZone } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particlesContainer', { static: true }) particlesContainerRef!: ElementRef<HTMLDivElement>;

  headline = 'ProjectOverflow';
  subHeadline = 'Innovation without limits.';

  private destroy$ = new Subject<void>();

  constructor(private renderer: Renderer2, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    const container = this.particlesContainerRef.nativeElement;

    // create initial floating particles
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      this.createParticle(container);
    }

    // listen to mousemove outside Angular to avoid heavy CD cycles, and throttle it
    this.ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(document, 'mousemove').pipe(
        throttleTime(50),
        takeUntil(this.destroy$)
      ).subscribe(e => this.onMouseMove(e));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createParticle(container: HTMLElement): void {
    const particle = this.renderer.createElement('div');
    this.renderer.addClass(particle, 'particle');

    const size = Math.random() * 3 + 1;
    this.renderer.setStyle(particle, 'width', `${size}px`);
    this.renderer.setStyle(particle, 'height', `${size}px`);

    this.resetParticle(particle);
    this.renderer.appendChild(container, particle);

    this.animateParticle(particle);
  }

  private resetParticle(particle: HTMLElement): { x: number; y: number } {
    // remove any transition before resetting to avoid jumps
    this.renderer.setStyle(particle, 'transition', 'none');

    const posX = Math.random() * 100;
    // start below or inside viewport so they float upward nicely
    // const posY = 100 + Math.random() * 20;
    const posY = Math.random() * 100;

    this.renderer.setStyle(particle, 'left', `${posX}%`);
    this.renderer.setStyle(particle, 'top', `${posY}%`);
    this.renderer.setStyle(particle, 'opacity', '0');
    this.renderer.setStyle(particle, 'transform', `scale(${Math.random() * 0.6 + 0.4})`);

    return { x: posX, y: posY };
  }

  private animateParticle(particle: HTMLElement): void {
    const start = this.resetParticle(particle);
    const duration = Math.random() * 10 + 10; // seconds
    const delay = Math.random() * 5; // seconds

    setTimeout(() => {
      // force reflow
      void (particle as HTMLElement).offsetWidth;

      // now animate upward
      this.renderer.setStyle(particle, 'transition', `all ${duration}s linear`);
      const moveX = start.x + (Math.random() * 20 - 10);
      const moveY = start.y - Math.random() * 30; // move well above
      this.renderer.setStyle(particle, 'left', `${moveX}%`);
      this.renderer.setStyle(particle, 'top', `${moveY}%`);
      this.renderer.setStyle(particle, 'opacity', `${Math.random() * 0.3 + 0.1}`);
      this.renderer.setStyle(particle, 'transform', `scale(${Math.random() * 1.5 + 0.6})`);

      // once animation completes, restart cycle
      setTimeout(() => {
        this.animateParticle(particle);
      }, duration * 1000);
    }, delay * 1000);
  }

  private onMouseMove(e: MouseEvent): void {
    const container = this.particlesContainerRef.nativeElement;

    const mouseX = (e.clientX / window.innerWidth) * 100;
    const mouseY = (e.clientY / window.innerHeight) * 100;

    // create a small burst particle at mouse
    const p = this.renderer.createElement('div');
    this.renderer.addClass(p, 'particle');
    const size = Math.random() * 3+2;
    this.renderer.setStyle(p, 'width', `${size}px`);
    this.renderer.setStyle(p, 'height', `${size}px`);
    this.renderer.setStyle(p, 'left', `${mouseX}%`);
    this.renderer.setStyle(p, 'top', `${mouseY}%`);
    this.renderer.setStyle(p, 'opacity', '0.6');
    this.renderer.setStyle(p, 'transform', `scale(${Math.random() * 1.6 + 0.8})`);
    this.renderer.appendChild(container, p);

    // animate outward + fade, then remove
    setTimeout(() => {
      this.renderer.setStyle(p, 'transition', 'all 900ms cubic-bezier(.2,.9,.2,1)');
      this.renderer.setStyle(p, 'left', `${mouseX + (Math.random() * 10 - 5)}%`);
      this.renderer.setStyle(p, 'top', `${mouseY + (Math.random() * 10 - 5)}%`);
      this.renderer.setStyle(p, 'opacity', '0');
      setTimeout(() => {
        if (p.parentNode === container) {
          this.renderer.removeChild(container, p);
        }
      }, 2000);
    }, 10);

    // move gradient spheres using CSS custom properties so we don't overwrite their animation
    const spheres = document.querySelectorAll('.gradient-sphere');
    const moveX = (e.clientX / window.innerWidth - 0.5) * 5; // px
    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
    spheres.forEach(s => {
      (s as HTMLElement).style.setProperty('--offset-x', `${moveX}px`);
      (s as HTMLElement).style.setProperty('--offset-y', `${moveY}px`);
    });
  }
}
