import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css',
})
export class GamesListComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logoutUser();
  }
}
