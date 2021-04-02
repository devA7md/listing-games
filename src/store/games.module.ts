import { ActionContext } from "vuex";

import {
  IGame,
  IGamesCategories,
  IModifiedGame,
  IState,
} from "@/types/games.types";
import {
  MUTATE_CATEGORIES,
  SET_CATEGORIES,
  GET_CATEGORIES,
  MUTATE_SELECTED_GAME,
  SET_SELECTED_GAME,
  GET_SELECTED_GAME,
  MUTATE_RECOMMENDED,
  SET_RECOMMENDED,
  GET_RECOMMENDED,
  MUTATE_FEATURED_GAME,
  SET_FEATURED_GAME,
  GET_FEATURED_GAME,
  GET_POPULAR,
  SET_POPULAR,
  MUTATE_POPULAR,
} from "@/constants/store";

const gamesModule = {
  state: {
    categories: {},
    recommended: [],
    popular: [],
    featured: null,
    selectedGame: null,
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
  },
  actions: {
    [SET_CATEGORIES](
      context: ActionContext<IGamesCategories, IState>,
      payload: IGamesCategories
    ): void {
      context.commit(MUTATE_CATEGORIES, payload);
    },
    [SET_SELECTED_GAME](
      context: ActionContext<IGamesCategories, IState>,
      payload: IGame
    ): void {
      context.commit(MUTATE_SELECTED_GAME, payload);
    },
    [SET_RECOMMENDED](
      context: ActionContext<IGamesCategories, IState>,
      payload: IModifiedGame[]
    ): void {
      context.commit(MUTATE_RECOMMENDED, payload);
    },
    [SET_POPULAR](
      context: ActionContext<IGamesCategories, IState>,
      payload: IModifiedGame[]
    ): void {
      context.commit(MUTATE_POPULAR, payload);
    },
    [SET_FEATURED_GAME](
      context: ActionContext<IGamesCategories, IState>,
      payload: IGame
    ): void {
      context.commit(MUTATE_FEATURED_GAME, payload);
    },
  },
  getters: {
    [GET_CATEGORIES](state: IState): IGamesCategories {
      return state.categories;
    },
    [GET_SELECTED_GAME](state: IState): IGame | null {
      return state.selectedGame;
    },
    [GET_RECOMMENDED](state: IState): IModifiedGame[] {
      return state.recommended;
    },
    [GET_POPULAR](state: IState): IModifiedGame[] {
      return state.popular;
    },
    [GET_FEATURED_GAME](state: IState): IGame | null {
      return state.featured;
    },
  },
};

export default gamesModule;
