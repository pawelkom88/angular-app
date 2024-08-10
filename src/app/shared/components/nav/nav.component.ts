import { AuthService } from '@/app/core/services/auth/auth.service';
import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logoutUser();
  }
}
