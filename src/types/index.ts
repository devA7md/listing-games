export interface IGamesCategories {
  [id: string]: any;
}

export interface IGame {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export interface IState {
  categories: IGamesCategories;
  selectedGame: IGame;
}
