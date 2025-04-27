import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
