export interface IGamesCategories {
  [id: string]: any;
}

export interface IGame {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export interface IRecommendedGame extends IGame {
  rate: number;
}

export interface IState {
  categories: IGamesCategories;
  recommended: IRecommendedGame[];
  featured: IGame;
  selectedGame: IGame;
}
