import { Routes } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { SignInComponent } from '../views/signin/signin.component';
import { AuthGuard } from '../authentication/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
