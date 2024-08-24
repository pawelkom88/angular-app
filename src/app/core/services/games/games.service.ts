import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Game, UserGames } from './types';

// TODO: fallback if there are no games
// loading state
// error state

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  allGames: Game[] = [];
  userGames: UserGames[] = [];
  delay: number = 1000;

  constructor(private http: HttpClient, private router: Router) {}

  getGames(): Observable<Game[]> {
    return this.http.get<UserGames[]>(`${environment.apiUrl}/userGames`).pipe(
      map((games: UserGames[]) => {
        const allUserGames: Game[] = games.flatMap(
          (userGames) => userGames.games
        );

        this.allGames = allUserGames;
        return allUserGames;
      })
    );
  }

  getGamesByUser() {}
}
