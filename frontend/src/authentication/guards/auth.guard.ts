import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      if(state.url.startsWith('/signin')) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}