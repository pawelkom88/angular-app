import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { LoginComponent } from './login.component';
// import { RoutePathsConfig } from '@/app/app.routes';

// TODO: how to mock router and check if it redirect correctly

describe('LoginComponent', () => {
  let service: AuthService;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let usernameInputElement: HTMLInputElement;
  let passwordInputElement: HTMLInputElement;
  let loginButton: HTMLButtonElement;
  // let router: jest.Mocked<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AuthService,
          useValue: {
            findUser: jest.fn(),
          },
        },
        // {
        //   provide: Router,
        //   useValue: { navigate: jest.fn() },
        // },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    // router = TestBed.inject(Router) as jest.Mocked<Router>;
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

  it('should display error message if username is invalid', () => {
    jest
      .spyOn(service, 'findUser')
      .mockReturnValue(
        throwError(() => new Error('Invalid username or password'))
      );
    component.loginUser();
    fixture.detectChanges();

    const errorMessageElement = fixture.debugElement.nativeElement.querySelector('strong');
    expect(errorMessageElement).toBeTruthy();
  });

  it('should successfully login if username and password are valid', () => {
    const mockUser = {
      id: 2,
      username: 'pawel@test.com',
      password: 'Paw123!',
    };
    jest.spyOn(service, 'findUser').mockReturnValue(
      new Observable((observer) => {
        observer.next(mockUser);
        observer.complete();
      })
    );
    component.loginUser();
    fixture.detectChanges();

    expect(service.findUser).toHaveBeenCalledTimes(1);
    // expect(router.navigate).toHaveBeenCalledWith([RoutePathsConfig.games]);
  });
});
