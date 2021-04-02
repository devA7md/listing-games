export interface IGame {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export interface IGamesCategories {
  [id: string]: IGame[];
}

export interface IModifiedGame extends IGame {
  year: number;
  rating: number;
  price: number;
  views: number;
  comments: number;
}

export interface IState {
  categories: IGamesCategories;
  recommended: IModifiedGame[];
  popular: IModifiedGame[];
  featured: IGame | null;
  selectedGame: IGame | null;
}
