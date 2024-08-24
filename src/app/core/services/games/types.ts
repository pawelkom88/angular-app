export type GameImage = {
  url: string;
  width: number;
  height: number;
  author: string;
};

export type UserGames = {
  id: number;
  games: Game[];
};

export type Game = {
  id: number;
  image: GameImage;
  title: string;
  description: string;
  price: number;
};
