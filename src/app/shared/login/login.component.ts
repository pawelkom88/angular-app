import { RoutePathsConfig } from '@/app/app.routes';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { LogoComponent } from '../components/logo/logo.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorMessageComponent,
    LogoComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  loading = false;
  errorMessage = '';

  private authSubscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    const formControls = {
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    };

    this.loginForm = this.formBuilder.group(formControls);
  }

  loginUser() {
    const username = this.loginForm.value.username.trim();
    const password = this.loginForm.value.password.trim();

    this.errorMessage = '';

    this.loading = true;
    this.authSubscription = this.authService
      .findUser({
        username,
        password,
      })
      .subscribe({
        next: this.handleRedirectAfterLogin,
        error: (error) => {
          this.handleLogInError(error), this.cancelLoading;
        },
        complete: () => this.cancelLoading,
      });
  }

  private handleRedirectAfterLogin = () => {
    this.router.navigate([RoutePathsConfig.games]);
  };

  private handleLogInError = (error: Error) => {
    this.errorMessage = error.message;
  };

  private cancelLoading = () => {
    this.loading = false;
  };

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
