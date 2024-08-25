import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Game, UserGames } from './types';

// TODO: fallback if there are no games
// loading state
// error state

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  errorMessage: string = '';
  game$: Observable<Game | undefined> = new Observable<Game | undefined>();
  allGames$: Observable<Game[]> = new Observable<Game[]>();
  userGames$: Observable<Game[]> = new Observable<Game[]>();
  delay: number = 1000;

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<UserGames[]>(`${environment.apiUrl}/userGames`).pipe(
      delay(500),
      map((games: UserGames[]) => {
        const allUserGames: Game[] = games.flatMap(
          (userGames) => userGames.games
        );

        this.userGames$ = this.allGames$;
        return allUserGames;
      }),

      catchError((error: Error) => {
        this.errorMessage = error.message;
        return of([]);
      })
    );
  }

  getGameById(gameId: number): Observable<Game | undefined> {
    return this.getGames().pipe(
      map((allGames) => allGames.find((game) => {
        return game.id === gameId
      })),
      catchError((error: Error) => {
        this.errorMessage = error.message;
        return of(undefined);
      })
    );
  }

  getGamesByUser() {}
}
