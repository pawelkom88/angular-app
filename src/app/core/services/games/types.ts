export type GameImage = {
  url: string;
  width: number;
  height: number;
  author: string;
};

export type Game = {
  id: number;
  image: GameImage;
  title: string;
  price: number;
};
