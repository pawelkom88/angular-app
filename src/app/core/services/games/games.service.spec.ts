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

  it('', () => {});
});
