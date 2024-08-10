import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../components/nav/nav.component';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css',
})
export class GamesListComponent {
  constructor() {}
}
