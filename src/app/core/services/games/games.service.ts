import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from './types';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  allGames: Game[] = [];
  userGames: Game[] = [];
  delay: number = 1000;

  constructor(private http: HttpClient, private router: Router) {}

  getGames() {}

  getGamesByUser() {}
}
