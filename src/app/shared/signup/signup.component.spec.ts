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

  it('should bind the form controls to the input elements', () => {
    usernameInputElement.value = 'test@example';
    usernameInputElement.dispatchEvent(new Event('input'));
    passwordInputElement.value = 'Password123';
    passwordInputElement.dispatchEvent(new Event('input'));
    confirmPasswordInputElement.value = 'Password123';
    confirmPasswordInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(usernameInputElement.value).toBe('test@example');
    expect(passwordInputElement.value).toBe('Password123');
    expect(confirmPasswordInputElement.value).toBe('Password123');
  });

  it('form should be successfully submitted if all fields are valid', () => {
    const mockUser: User = {
      id: 2,
      username: 'pawel@2132.io',
      password: 'Paw123!',
    };

    usernameInputElement.value = 'test@example';
    usernameInputElement.dispatchEvent(new Event('input'));
    passwordInputElement.value = 'Password123!';
    passwordInputElement.dispatchEvent(new Event('input'));
    confirmPasswordInputElement.value = 'Password123!';
    confirmPasswordInputElement.dispatchEvent(new Event('input'));
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
    // check for this scenario
    successMessageElement =  debugElement.nativeElement.querySelector('.success-message');

    expect(successMessageElement).toBeTruthy();
  });
});
