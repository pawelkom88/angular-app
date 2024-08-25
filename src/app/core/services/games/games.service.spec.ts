import { environment } from '@/environments/environment.development';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { GamesService } from './games.service';

describe('Games Service', () => {
  let service: GamesService;
  let httpMock: HttpTestingController;
  //   let router: jest.Mocked<Router>;
  //   let localStorageSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    });

    service = TestBed.inject(GamesService);
    httpMock = TestBed.inject(HttpTestingController);
    // router = TestBed.inject(Router) as jest.Mocked<Router>;
    // localStorageSpy = jest.spyOn(Storage.prototype, 'removeItem');
  });

  afterEach(() => {
    httpMock.verify();
    // localStorageSpy.mockClear();
  });

  // todo:
  // 1. test http get request for all games
  // 2. test http get request for single game
  // 3. test http get request for games by user id

  it.only('getGames method should fetch all games', () => {
    const mockGame = {
      userId: 1,
      games: [
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
        }
      ]
    } 
    
    service.getGames().subscribe((games) => {
      expect(games).toEqual([mockGame]);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}/userGames`);
    expect(request.request.method).toBe('GET');

    request.flush([mockGame]);
  });

  it("getGames should throw an error if it can't fetch games", () => {
    service.getGames().subscribe({
      error: (error) => expect(error).toBe('Error fetching games'),
    });
  });

  it('getGamesByUser method should fetch games by user id', () => {});
  // it('getGameById method should fetch games by game id', () => {});
});
