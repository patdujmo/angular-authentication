import { Routes } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];
