import { Routes } from '@angular/router';
import { ContactComponent} from './Contact/contact.component';

import { ShowProjesctComponent } from './show-projesct/show-projesct.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'maintenance', component: ContactComponent },
  { path: '**', redirectTo: '' },
  { path: 'project/:id', component: ShowProjesctComponent }
];
