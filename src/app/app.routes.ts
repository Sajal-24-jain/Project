import { Routes } from '@angular/router';
import { contactComponent} from './Contact/contact.component';

import { ShowProjesctComponent } from './show-projesct/show-projesct.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'maintenance', component: contactComponent },
  { path: '**', redirectTo: '' },
  { path: 'project/:id', component: ShowProjesctComponent }
];
