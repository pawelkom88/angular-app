import { RoutePath, RoutePathsConfig } from '@/app/app.routes';
import { UserCredentials } from '@/app/core/services/auth/auth.types';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm: FormGroup = new FormGroup({});
  errorMessage = '';
  successMessage = '';

  private authSubscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', checkPasswordValidation()],
      confirmPassword: ['', checkPasswordValidation()],
    });
  }

  navigateToPathWithDelay(path: RoutePath, delay = 2000) {
    setTimeout(() => {
      this.router.navigate([path]);
    }, delay);
  }

  signUpUser() {
    const { username, password } = this.signUpForm.value;

    this.authSubscription = this.authService
      .createUser({
        username,
        password,
      } as UserCredentials)
      .subscribe({
        next: () => {
          this.successMessage = 'User created successfully';
          this.navigateToPathWithDelay(RoutePathsConfig.login);
          this.signUpForm.reset();
        },
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

// move to helpers - does not work
function checkPasswordValidation() {
  return [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'
    ),
  ];
}
