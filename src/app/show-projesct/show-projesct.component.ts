import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-projesct',
  imports: [],
  templateUrl: './show-projesct.component.html',
  styleUrl: './show-projesct.component.scss'
})
export class ShowProjesctComponent {
   project: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.project = nav?.extras.state;
  }
}
