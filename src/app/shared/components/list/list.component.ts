import { GamesService } from '@/app/core/services/games/games.service';
import { Game } from '@/app/core/services/games/types';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  // is it correct initialization ??
  games$: Observable<Game[]>;

  constructor(private readonly gamesService: GamesService) {
    // Assign the observable directly instead of ngOnInit ?
    this.games$ = this.gamesService.getGames();
  }

  trackByGameId(_: number, game: Game) {
    return game.id;
  }
}
