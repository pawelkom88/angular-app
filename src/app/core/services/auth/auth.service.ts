import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Token, UserCredentials } from './auth.types';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login({ username, password }: UserCredentials): Observable<Token> {
    return this.http
      .post<Token>('/api/login', {
        username,
        password,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage: string;

          if (error.status === 404) {
            errorMessage = 'Server error';
          } else if(error.status === 401) {
            errorMessage = 'Invalid username or password';
          }
          // Use throwError to create an observable that emits the error.
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
