import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutePathsConfig } from '../../../app.routes';
import { User, UserCredentials } from './auth.types';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000';
  user: UserCredentials | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login({ username, password }: UserCredentials): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
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

  logout(): void {
    localStorage.removeItem('userId');
    this.router.navigate([RoutePathsConfig.login]);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }
}
