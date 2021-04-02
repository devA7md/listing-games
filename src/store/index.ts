import Vue from "vue";
import Vuex from "vuex";

import { IState } from "@/types/games.types";
import gamesModule from "@/store/games.module";

Vue.use(Vuex);

const initialState: IState = {
  categories: {},
  recommended: [],
  popular: [],
  featured: null,
  selectedGame: null,
};

export default new Vuex.Store({
  state: initialState,
  modules: {
    categories: gamesModule,
  },
});
