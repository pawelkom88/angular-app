import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RoutePathsConfig } from '../../../app.routes';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate([RoutePathsConfig.login]);
      return false;
    }
  }
}
