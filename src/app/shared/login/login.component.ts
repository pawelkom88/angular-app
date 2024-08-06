import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoutePathsConfig } from '../../app.routes';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserCredentials } from '../../core/services/auth/auth.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  errorMessage = '';

  private authSubscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    if (this.authService.isUserLoggedIn()) {
      this.router.navigate([RoutePathsConfig.games]);
    }
  }

  loginUser() {
    const { username, password } = this.loginForm.value;
    this.errorMessage = '';

    this.authSubscription = this.authService
      .findUser({
        username,
        password,
      } as UserCredentials)
      .subscribe({
        next: () => this.router.navigate([RoutePathsConfig.games]),
        error: (error: Error) => {
          this.errorMessage = error.message;
        },
      });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
