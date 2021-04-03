import { Subscription } from "rxjs";
import { IGame, IGamesCategories, IModifiedGame } from "@/types/games.types";

export interface IBaseData {
  loading: boolean;
  error: string | null;
}

export interface IGameData extends IBaseData {
  game: IGame | null;
}

export interface ICategoryPreviewData extends IBaseData {
  games: IGame[];
}

export interface ICategoriesData extends IBaseData {
  // categories: IGamesCategories[];
  // responsiveOptions: Record<string, unknown>[];
  categories: any;
  responsiveOptions: any;
}

export interface ISearchGameData {
  value: string | null;
  filtered: IGame[];
  games: IGame[];
  error: string | null;
}

export interface IModifiedData extends IBaseData {
  games$: Subscription | null;
  games: IModifiedGame[];
}

export type IPopularData = IModifiedData;
export type IRecommendedData = IModifiedData;
