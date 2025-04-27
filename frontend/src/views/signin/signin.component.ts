import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signin',
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SignInComponent implements OnInit {
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuthenticated) => {
        if (isAuthenticated && this.router.url.startsWith('/signin')) {
          this.router.navigate(['/home']);
        }
      });
  }

  login() {
    this.authService.login();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
