import { RoutePathsConfig } from '@/app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User, UserCredentials } from './auth.types';
import { environment } from '@/environments/environment.development';
// NEED FIXING
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: jest.Mocked<Router>;
  let localStorageSpy: jest.SpyInstance;

  beforeEach(() => {
    const routerMock = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerMock },
      ],
    });

    service = TestBed.inject(AuthService); // Inject the AuthService
    httpMock = TestBed.inject(HttpTestingController); // Inject the HttpTestingController to control HTTP requests
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    localStorageSpy = jest.spyOn(Storage.prototype, 'removeItem');
  });

  // After each test, ensure no outstanding HTTP requests
  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
    localStorageSpy.mockClear();
  });

  // Test if the AuthService is created successfully
  it('the login method should authenticate a user with valid credentials and return the user.', () => {
    const userCredentials: UserCredentials = {
      username: 'paw@2132.io',
      password: 'Paw123!',
    };

    const mockUser: User = {
      id: 1,
      username: 'paw@2132.io',
      password: 'Paw123!',
    };

    service.findUser(userCredentials).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const request = httpMock.expectOne(environment.apiUrl + '/users');
    expect(request.request.method).toBe('GET');

    request.flush(mockUser);
  });

  it('the login method should throw an error if the credentials are invalid.', () => {
    const userCredentials = { username: 'paw@2132.io', password: 'Paw123!' };

    service.findUser(userCredentials).subscribe({
      error: (error) => expect(error).toBe('Invalid username or password'),
    });

    const request = httpMock.expectOne(environment.apiUrl + '/users');

    request.flush(
      { message: 'Invalid username or password' },
      { status: 401, statusText: 'Unauthorized' }
    );
  });

  it('the login method should throw an error if there is a network error', () => {
    const userCredentials = { username: 'paw@2132.io', password: 'Paw123!' };

    service.findUser(userCredentials).subscribe({
      error: (error) => expect(error).toBe('Server error'),
    });

    const request = httpMock.expectOne(environment.apiUrl + '/users');

    request.flush(
      { message: 'Server error' },
      { status: 404, statusText: 'Not Found' }
    );
  });

  it("the logout method should remove the user's authentication token from local storage and navigate to the login page.", () => {
    localStorage.setItem('userId', '1');

    service.logoutUser();

    expect(localStorageSpy).toHaveBeenCalledWith('userId');
    expect(router.navigate).toHaveBeenCalledWith([RoutePathsConfig.login]);
  });

  it('the signup method should create a new user n db.json and navigate to the login page.', () => {
    const userCredentials: UserCredentials = {
      username: 'pawel@2132.io',
      password: 'Paw123!',
    };

    const mockUser: User = {
      id: 2,
      username: 'pawel@2132.io',
      password: 'Paw123!',
    };

    service.createUser(userCredentials).subscribe((user) => {
      expect(mockUser).toContainEqual(user);
    });

    const request = httpMock.expectOne(environment.apiUrl + '/users');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(userCredentials);

    request.flush(mockUser);
  });
});
