import { Routes } from '@angular/router';
import { ContactComponent} from './pages/Contact/contact.component';



export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'maintenance', component: ContactComponent },
  { path: '**', redirectTo: '' },
];
