import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, Renderer2, NgZone } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  imports: [RouterLink]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particlesContainer', { static: true }) particlesContainerRef!: ElementRef<HTMLDivElement>;

  headline = 'ProjectOverflow';
  subHeadline = 'Innovation without limits.';

  private destroy$ = new Subject<void>();

  constructor(private renderer: Renderer2, private ngZone: NgZone, private el: ElementRef, private route: ActivatedRoute) {}

  ngAfterViewInit() {
    this.initMouseEffects();
    this.handleFragmentScroll();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Handle scrolling to fragment section on load
   */
  private handleFragmentScroll() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const el = document.getElementById(fragment);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 50); // small delay to ensure DOM is ready
        }
      }
    });
  }

  /**
   * Initialize cursor and particle effects
   */
  private initMouseEffects() {
    const cursor = this.el.nativeElement.querySelector('.cursor-dot') as HTMLElement;
    const hero = this.el.nativeElement.querySelector('.hero') as HTMLElement;
    const container = this.particlesContainerRef.nativeElement;

    // Mouse move globally for cursor following
    const moveHandler = (e: MouseEvent) => {
      if (cursor && cursor.style.display !== 'none') {
        cursor.style.left = `${e.clientX - 15}px`;
        cursor.style.top = `${e.clientY - 15}px`;
      }
      // Only create particles and update spheres when over hero
      if (hero.contains(e.target as Node)) {
        this.createCursorParticle(container, e.clientX, e.clientY);

        const spheres = document.querySelectorAll('.gradient-sphere');
        const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
        spheres.forEach(s => {
          (s as HTMLElement).style.setProperty('--offset-x', `${moveX}px`);
          (s as HTMLElement).style.setProperty('--offset-y', `${moveY}px`);
        });
      }
    };

    document.addEventListener('mousemove', moveHandler);
    hero.addEventListener('mouseenter', () => { 
      if (cursor) cursor.style.display = 'block'; 
    });
    hero.addEventListener('mouseleave', () => { 
      if (cursor) cursor.style.display = 'none'; 
    });

    const btns = this.el.nativeElement.querySelectorAll('button, a') as NodeListOf<HTMLElement>;
    btns.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        if (cursor) {
          cursor.style.width = '50px';
          cursor.style.height = '50px';
        }
      });
      btn.addEventListener('mouseleave', () => {
        if (cursor) {
          cursor.style.width = '30px';
          cursor.style.height = '30px';
        }
      });
    });
  }

  /**
   * Create a small cursor particle
   */
  private createCursorParticle(container: HTMLElement, x: number, y: number) {
    const p = this.renderer.createElement('div');
    this.renderer.addClass(p, 'particle');

    const size = Math.random() * 3 + 2;
    this.renderer.setStyle(p, 'width', `${size}px`);
    this.renderer.setStyle(p, 'height', `${size}px`);
    this.renderer.setStyle(p, 'left', `${(x / window.innerWidth) * 100}%`);
    this.renderer.setStyle(p, 'top', `${(y / window.innerHeight) * 100}%`);
    this.renderer.setStyle(p, 'opacity', '0.6');
    this.renderer.setStyle(p, 'transform', `scale(${Math.random() * 1.2 + 0.8})`);
    this.renderer.setStyle(p, 'position', 'absolute');
    this.renderer.setStyle(p, 'pointer-events', 'none');
    this.renderer.appendChild(container, p);

    setTimeout(() => {
      this.renderer.setStyle(p, 'transition', 'all 800ms ease-out');
      this.renderer.setStyle(p, 'left', `${(x / window.innerWidth) * 100 + (Math.random() * 6 - 3)}%`);
      this.renderer.setStyle(p, 'top', `${(y / window.innerHeight) * 100 + (Math.random() * 6 - 3)}%`);
      this.renderer.setStyle(p, 'opacity', '0');
      this.renderer.setStyle(p, 'transform', `scale(0.2)`);
      setTimeout(() => {
        if (p.parentNode === container) {
          this.renderer.removeChild(container, p);
        }
      }, 800);
    }, 10);
  }

  // Other particle methods (animateParticle, resetParticle) remain unchanged
}
