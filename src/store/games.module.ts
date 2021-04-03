import {
  IGame,
  IGamesCategories,
  IModifiedGame,
  IState,
} from "@/types/games.types";
import {
  MUTATE_CATEGORIES,
  MUTATE_FEATURED_GAME,
  MUTATE_POPULAR,
  MUTATE_RECOMMENDED,
  MUTATE_SEARCHED_GAMES,
  MUTATE_SELECTED_GAME,
} from "@/constants/store";

const gamesModule = {
  state: {
    categories: {},
    recommended: [],
    popular: [],
    featured: null,
    selectedGame: null,
    searchedGames: [],
  },
  mutations: {
    [MUTATE_CATEGORIES](state: IState, payload: IGamesCategories): void {
      state.categories = payload;
    },
    [MUTATE_SELECTED_GAME](state: IState, payload: IGame): void {
      state.selectedGame = payload;
    },
    [MUTATE_RECOMMENDED](state: IState, payload: IModifiedGame[]): void {
      state.recommended = payload;
    },
    [MUTATE_POPULAR](state: IState, payload: IModifiedGame[]): void {
      state.popular = payload;
    },
    [MUTATE_FEATURED_GAME](state: IState, payload: IGame): void {
      state.featured = payload;
    },
    [MUTATE_SEARCHED_GAMES](state: IState, payload: IGame[]): void {
      state.searchedGames = payload;
    },
  },
};

export default gamesModule;
