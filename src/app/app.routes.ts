import { Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance/maintenance.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: '**', redirectTo: '' }
];
