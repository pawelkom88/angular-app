import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let service: AuthService;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let usernameInputElement: HTMLInputElement;
  let passwordInputElement: HTMLInputElement;
  let loginButton: HTMLButtonElement;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            findUser: jest.fn(),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    service = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    usernameInputElement = debugElement.nativeElement.querySelector(
      'input[name="username"]'
    );
    passwordInputElement = debugElement.nativeElement.querySelector(
      'input[name="password"]'
    );

    loginButton = debugElement.nativeElement.querySelector(
      'button[type="submit"]'
    );
  });

  it('button should be disabled if inputs are empty', () => {
    const loginButton = debugElement.nativeElement.querySelector(
      'button[type="submit"]'
    );

    expect(loginButton.disabled).toBeTruthy();
  });

  it('should have two empty inputs', () => {
    const formName = component.loginForm.get('username');
    const formPassword = component.loginForm.get('password');
    expect(formName?.value).toBe('');
    expect(formPassword?.value).toBe('');
  });

  it('should bind the form controls to the input elements', () => {
    usernameInputElement.value = 'test@example';
    usernameInputElement.dispatchEvent(new Event('input'));
    passwordInputElement.value = 'Password123';
    passwordInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(usernameInputElement.value).toBe('test@example');
    expect(passwordInputElement.value).toBe('Password123');
  });

  it('should have username and password input elements in the DOM', () => {
    expect(usernameInputElement).toBeTruthy();
    expect(passwordInputElement).toBeTruthy();
  });

  it('should display error message if username is invalid', () => {
    jest
      .spyOn(service, "findUser")
      .mockReturnValue(
        throwError(() => new Error('Invalid username or password'))
      );
    component.loginUser();
    fixture.detectChanges();

    const errorMessageElement =
      fixture.debugElement.nativeElement.querySelector('strong');
    expect(errorMessageElement).toBeTruthy();
  });
});
