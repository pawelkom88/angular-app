import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';
import { AuthService } from './auth.service';
import { RoutePathsConfig } from '../../../app.routes';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
        {
          provide: AuthService,
          useValue: { isLoggedIn: jest.fn() },
        },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
  });

  it('should allow access when the user is authenticated', () => {
    (authService.isLoggedIn as jest.Mock).mockReturnValue(true);

    const result = guard.canActivate();

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and redirect to /login when the user is not authenticated', () => {
    (authService.isLoggedIn as jest.Mock).mockReturnValue(false);

    const result = guard.canActivate();

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith([RoutePathsConfig.login]);
  });
});
