import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ShowProjesctComponent } from './show-projesct/show-projesct.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
  { path: 'project/:id', component: ShowProjesctComponent }
];
