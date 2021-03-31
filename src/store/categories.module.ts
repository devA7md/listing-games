import { ActionContext } from "vuex";

import { IGame, IGamesCategories, IState } from "@/types";
import {
  MUTATE_CATEGORIES,
  SET_CATEGORIES,
  GET_CATEGORIES,
  MUTATE_SELECTED_GAME,
  SET_SELECTED_GAME,
  GET_SELECTED_GAME,
} from "@/constants/store";

const categoriesModule = {
  state: {
    categories: {},
    selectedGame: null,
  },
  mutations: {
    [MUTATE_CATEGORIES](state: IState, payload: IGamesCategories): void {
      state.categories = payload;
    },
    [MUTATE_SELECTED_GAME](state: IState, payload: IGame): void {
      state.selectedGame = payload;
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
  },
  getters: {
    [GET_CATEGORIES](state: IState): IGamesCategories {
      return state.categories;
    },
    [GET_SELECTED_GAME](state: IState): IGame {
      return state.selectedGame;
    },
  },
};

export default categoriesModule;
