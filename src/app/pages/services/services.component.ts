// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-services',
//   standalone: true,
//   imports: [],
//   templateUrl: './services.component.html',
//   styleUrls: ['./services.component.scss']
// })
// export class ServicesComponent {}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {
  words: string[] = ["Innovate", "Design", "Create", "Frame", "Define", "Solve"];
  currentWord: string = this.words[0];
  isFading: boolean = false;

  private wordIndex: number = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.isFading = true;

      setTimeout(() => {
        this.wordIndex = (this.wordIndex + 1) % this.words.length;
        this.currentWord = this.words[this.wordIndex];
        this.isFading = false;
      }, 600); // matches fade duration
    }, 2000); // change every 2s
  }



  
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  
}
