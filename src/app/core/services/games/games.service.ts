import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { Game, UserGames } from './types';

// TODO: fallback if there are no games
// loading state
// error state

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  game$: Observable<Game | undefined> = new Observable<Game | undefined>();
  allGames$: Observable<Game[]> = new Observable<Game[]>();
  userGames$: Observable<Game[]> = new Observable<Game[]>();
  delay: number = 1000;

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<UserGames[]>(`${environment.apiUrl}/userGames`).pipe(
      delay(2000),
      map((games: UserGames[]) => {
        const allUserGames: Game[] = games.flatMap(
          (userGames) => userGames.games
        );

        this.userGames$ = this.allGames$;
        return allUserGames;
      })
    );
  }

  getGameById(gameId: number): Observable<Game | undefined> {
    this.game$ = this.allGames$.pipe(
      delay(2000),
      map((allGames) => allGames.find((game) => game.id === gameId))
    );

    return this.game$;
  }

  getGamesByUser() {}
}
