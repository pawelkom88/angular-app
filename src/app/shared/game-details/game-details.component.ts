import { RoutePath, RoutePathsConfig } from '@/app/app.routes';
import { GamesService } from '@/app/core/services/games/games.service';
import { Game } from '@/app/core/services/games/types';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css',
})

export class GameDetailsComponent {
  errorMessage: string = '';
  game$: Observable<Game | undefined> = new Observable<Game>();
  gameListPath: RoutePath = RoutePathsConfig.games;

  constructor(
    private gamesService: GamesService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const gameId: number = +this.route.snapshot.params['id'];
    this.game$ = this.gamesService.getGameById(gameId).pipe(
      catchError((error: Error) => {
        this.errorMessage = error.message;
        return of(undefined);
      })
    );
  }
} 
