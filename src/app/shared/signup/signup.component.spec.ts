import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { AuthService } from '../../core/services/auth/auth.service';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
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

  it('email input should', () => {

  });
});
