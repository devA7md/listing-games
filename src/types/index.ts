export interface IGamesCategories {
  [id: string]: any;
}

export interface IState {
  categories: IGamesCategories;
}

export interface IGame {
  userId: string;
  id: string;
  title: string;
  body: string;
}
