import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from '../../app.routes';
import { AuthService } from '../../core/services/auth/auth.service';
import { User } from '../../core/services/auth/auth.types';
import { SignupComponent } from './signup.component';
import { PASSWORD_MIN_LENGTH } from './constants';
import { fillInputField } from '../utils/helpers';

describe('SignupComponent', () => {
  let service: AuthService;
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let debugElement: DebugElement;
  let usernameInputElement: HTMLInputElement;
  let passwordInputElement: HTMLInputElement;
  let confirmPasswordInputElement: HTMLInputElement;
  let signupButton: HTMLButtonElement;
  let successMessageElement: HTMLElement;
  let errorMessageElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
        {
          provide: AuthService,
          useValue: { createUser: jest.fn() },
        },
      ],
    }).compileComponents();

    service = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    usernameInputElement = debugElement.nativeElement.querySelector(
      'input[name="username"]'
    );
    passwordInputElement = debugElement.nativeElement.querySelector(
      'input[name="password"]'
    );

    confirmPasswordInputElement = debugElement.nativeElement.querySelector(
      'input[name="confirm-password"]'
    );

    signupButton = debugElement.nativeElement.querySelector(
      'button[type="submit"]'
    );
  });

  it('form should be successfully submitted if all fields are valid', () => {
    const mockUser: User = {
      id: 2,
      username: 'pawel@test.com',
      password: 'Paw123!',
    };

    fillInputField(usernameInputElement, 'pawel@test.com');
    fillInputField(passwordInputElement, 'Paw123!');
    fillInputField(confirmPasswordInputElement, 'Paw123!');
    fixture.detectChanges();
    signupButton.click();
    expect(component.signUpForm.valid).toBeTruthy();

    jest.spyOn(service, 'createUser').mockReturnValue(
      new Observable((subscriber) => {
        subscriber.next(mockUser);
      })
    );

    component.signUpUser();
    fixture.detectChanges();

    successMessageElement = debugElement.nativeElement.querySelector('.success-message');

    expect(successMessageElement).toBeTruthy();
  });

  it('form should show correct error message if form is not valid', () => {
    signupButton.click();
    fixture.detectChanges();

    errorMessageElement = debugElement.nativeElement.querySelector('.error-message');
    expect(errorMessageElement.textContent).toEqual('Please fill in the form.');
  });

  it('form should show correct error message if email is not valid', () => {
    fillInputField(usernameInputElement, 'test');
    component.signUpForm.markAllAsTouched();
    signupButton.click();
    fixture.detectChanges();

    errorMessageElement = debugElement.nativeElement.querySelector('.error-message');
    expect(errorMessageElement.textContent).toEqual('Please enter a valid email address.');
  });

  it('form should show correct error message if password is in wrong format', () => {
    component.signUpForm.markAllAsTouched();
    fillInputField(usernameInputElement, 'test@example');
    fillInputField(passwordInputElement, 'pass');
    fillInputField(confirmPasswordInputElement, 'pass');
    signupButton.click();
    fixture.detectChanges();

    errorMessageElement = debugElement.nativeElement.querySelector('.error-message');
    expect(errorMessageElement.textContent).toContain(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`);
  });
});

