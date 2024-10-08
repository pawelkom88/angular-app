import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RoutePathsConfig } from '@/app/app.routes';
import { AuthGuard } from './auth-guard.guard';
import { AuthService } from './auth.service';

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
          useValue: { isUserLoggedIn: jest.fn() },
        },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
  });

  it('should allow access when the user is authenticated', () => {
    jest.spyOn(authService, 'isUserLoggedIn').mockReturnValue(true);

    const result = guard.canActivate();

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and redirect to /login when the user is not authenticated', () => {
    (authService.isUserLoggedIn as jest.Mock).mockReturnValue(false);

    const result = guard.canActivate();

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith([RoutePathsConfig.login]);
  });
});
