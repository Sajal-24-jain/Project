


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

  constructor(private renderer: Renderer2, private ngZone: NgZone,private el: ElementRef) {}
 ngAfterViewInit() {
  const cursor = this.el.nativeElement.querySelector('.cursor-dot') as HTMLElement;
  const hero = this.el.nativeElement.querySelector('.hero') as HTMLElement;
  const container = this.particlesContainerRef.nativeElement;

  // Mouse move within hero
  const moveHandler = (e: MouseEvent) => {
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }

    // sparkle particle
    this.createCursorParticle(container, e.clientX, e.clientY);

    // move gradient spheres
    const spheres = document.querySelectorAll('.gradient-sphere');
    const moveX = (e.clientX / window.innerWidth - 0.5) * 5; 
    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
    spheres.forEach(s => {
      (s as HTMLElement).style.setProperty('--offset-x', `${moveX}px`);
      (s as HTMLElement).style.setProperty('--offset-y', `${moveY}px`);
    });
  };

  hero.addEventListener('mousemove', moveHandler);

  // Show/hide cursor
  hero.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
  });
  hero.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
  });

  // enlarge cursor on hover
  const btns = this.el.nativeElement.querySelectorAll('button, a') as NodeListOf<HTMLElement>;
  btns.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      cursor.style.width = '50px';
      cursor.style.height = '50px';
    });
    btn.addEventListener('mouseleave', () => {
      cursor.style.width = '30px';
      cursor.style.height = '30px';
    });
  });
}

// new method for cursor sparkle
private createCursorParticle(container: HTMLElement, x: number, y: number) {
  const p = this.renderer.createElement('div');
  this.renderer.addClass(p, 'particle');

  const size = Math.random() * 3 + 2; // default small size
  this.renderer.setStyle(p, 'width', `${size}px`);
  this.renderer.setStyle(p, 'height', `${size}px`);
  this.renderer.setStyle(p, 'left', `${(x / window.innerWidth) * 100}%`);
  this.renderer.setStyle(p, 'top', `${(y / window.innerHeight) * 100}%`);
  this.renderer.setStyle(p, 'opacity', '0.6');
  this.renderer.setStyle(p, 'transform', `scale(${Math.random() * 1.2 + 0.8})`);
  this.renderer.setStyle(p, 'position', 'absolute');
  this.renderer.setStyle(p, 'pointer-events', 'none');
  this.renderer.appendChild(container, p);

  // animate small movement around cursor and fade out
  setTimeout(() => {
    this.renderer.setStyle(p, 'transition', 'all 800ms ease-out');
    this.renderer.setStyle(
      p,
      'left',
      `${(x / window.innerWidth) * 100 + (Math.random() * 6 - 3)}%`
    );
    this.renderer.setStyle(
      p,
      'top',
      `${(y / window.innerHeight) * 100 + (Math.random() * 6 - 3)}%`
    );
    this.renderer.setStyle(p, 'opacity', '0');
    this.renderer.setStyle(p, 'transform', `scale(0.2)`);
    setTimeout(() => {
      if (p.parentNode === container) {
        this.renderer.removeChild(container, p);
      }
    }, 800);
  }, 10);
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
