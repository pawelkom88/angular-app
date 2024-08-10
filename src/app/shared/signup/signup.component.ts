import { RoutePath, RoutePathsConfig } from '@/app/app.routes';
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
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { SuccessMessageComponent } from '../components/success-message/success-message.component';
import { Labels, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from './constants';
import {
  getErrorMessage,
  getFormError,
  passwordMatchValidator,
} from './helpers';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorMessageComponent,
    SuccessMessageComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm: FormGroup = new FormGroup({});
  errorMessage = '';
  successMessage = '';
  loginLink = RoutePathsConfig.login;
  private authSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const formControls = {
      username: ['', [Validators.required, Validators.email]],
      password: ['', this.passwordValidators],
      confirmPassword: ['', this.passwordValidators],
    };

    this.signUpForm = this.formBuilder.group(formControls, {
      validators: passwordMatchValidator,
    });
  }

  private get passwordValidators(): any[] {
    return [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      Validators.pattern(PASSWORD_REGEX),
    ];
  }

  navigateToPathWithDelay(path: RoutePath, delay = 2000) {
    setTimeout(() => this.router.navigate([path]), delay);
  }

  signUpUser() {
    if (this.signUpForm.invalid) {
      this.checkForFormError();
      return;
    } else {
      this.errorMessage = '';
    }

    const { username, password } = this.signUpForm.value;

    this.authSubscription = this.authService
      .createUser({ username, password })
      .subscribe({
        next: this.handleSignUpSuccess,
        error: this.handleSignUpError,
      });
  }

  private checkForFormError() {
    const formError = getFormError(this.signUpForm);
    if (formError) {
      this.errorMessage = formError;
      return;
    }

    const controlNames = Object.keys(this.signUpForm.controls) as Labels[];
    for (const name of controlNames) {
      const errorMessage = getErrorMessage(this.signUpForm, name);
      if (errorMessage) {
        this.errorMessage = errorMessage;
        return;
      }
    }

    this.errorMessage = '';
  }

  private handleSignUpSuccess = () => {
    this.successMessage = 'User created successfully';
    this.navigateToPathWithDelay(RoutePathsConfig.login);
    this.signUpForm.reset();
  };

  private handleSignUpError = (error: Error) => {
    this.errorMessage = error.message;
  };

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
