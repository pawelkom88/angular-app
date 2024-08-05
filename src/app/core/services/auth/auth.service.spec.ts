import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService); // Inject the AuthService
    httpMock = TestBed.inject(HttpTestingController); // Inject the HttpTestingController to control HTTP requests
  });

  // After each test, ensure no outstanding HTTP requests
  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  // Test if the AuthService is created successfully
  it('the login method should authenticate a user with valid credentials and return a token.', () => {
    const userCredentials = { username: 'paw@2132.io', password: 'Paw123!' };
    const mockToken = { token: 'token' };

    service.login(userCredentials).subscribe((token) => {
      expect(token).toEqual(mockToken);
    });

    const request = httpMock.expectOne('/api/login');
    expect(request.request.method).toBe('POST');

    request.flush(mockToken);
  });

  it('the login method should throw an error if the credentials are invalid.', () => {
    const userCredentials = { username: 'paw@2132.io', password: 'Paw123!' };

    service.login(userCredentials).subscribe({
      error: (error) => expect(error).toBe('Invalid username or password'),
    });

    const request = httpMock.expectOne('/api/login');

    request.flush({message: "Invalid username or password"}, { status: 401, statusText: 'Unauthorized' });
  });
  it('the login method should throw an error if there is a network error', () => {
    const userCredentials = { username: 'paw@2132.io', password: 'Paw123!' };

    service.login(userCredentials).subscribe({
      error: (error) => expect(error).toBe('Server error'),
    });

    const request = httpMock.expectOne('/api/login');

    request.flush({message: "Server error"}, { status: 404, statusText: 'Not Found' });
  });
});
