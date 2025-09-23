import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {logo} from '../../../assets/logo.png'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
