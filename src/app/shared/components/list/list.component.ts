import { Game } from '@/app/core/services/games/types';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  games: Game[] = [
    {
      id: 0,
      title: 'dummy title',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, itaque!',
      image: {
        url: 'https://picsum.photos/200/300',
        author: 'Pawel',
        width: 200,
        height: 300,
      },
      price: 0,
    },
  ];

  trackByGameId(_: number, game: Game) {
    return game.id;
  }
  // http call here - tets first
}
