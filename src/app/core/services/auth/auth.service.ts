import { RoutePathsConfig } from '@/app/app.routes';
import { environment } from '@/environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User, UserCredentials } from './auth.types';

// TODO: introduce delay so loading indicator can be shown
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: UserCredentials | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  findUser({ username, password }: UserCredentials): Observable<User> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      delay(2000),
      map((users: User[]) => {
        const user = users.find(
          (user) => user.username === username && user.password === password
        );

        if (user) {
          localStorage.setItem('userId', JSON.stringify(user.id));
          this.user = user;

          return user;
        } else {
          throw new Error('Invalid username or password');
        }
      }),

      catchError((error: HttpErrorResponse | Error) => {
        if (error instanceof HttpErrorResponse) {
          return throwError(
            () =>
              new Error('An error occurred while logging in. Please try again.')
          );
        }
        return throwError(() => error);
      })
    );
  }

  createUser({ username, password }: UserCredentials): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}/users`, { username, password })
      .pipe(
        map((user: User) => {
          this.user = user;
          return user;
        }),
        catchError((error: HttpErrorResponse | Error) => {
          if (error instanceof HttpErrorResponse) {
            return throwError(
              () =>
                new Error(
                  'An error occurred while creating an account. Please try again.'
                )
            );
          }
          return throwError(() => error);
        })
      );
  }

  logoutUser(): void {
    localStorage.removeItem('userId');
    this.router.navigate([RoutePathsConfig.login]);
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }
}
