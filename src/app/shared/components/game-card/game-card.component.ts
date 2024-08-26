import { RoutePath, RoutePathsConfig } from '@/app/app.routes';
import { Game } from '@/app/core/services/games/types';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
})
export class GameCardComponent {
  gameListPath: RoutePath = RoutePathsConfig.games;
  @Input() game = {} as Game;
}
