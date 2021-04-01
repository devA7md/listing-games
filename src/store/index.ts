import Vue from "vue";
import Vuex from "vuex";

import { IState } from "@/types/games.types";
import gamesModule from "@/store/games.module";

Vue.use(Vuex);

const initialState: IState = {
  categories: {},
};

export default new Vuex.Store({
  state: initialState,
  modules: {
    categories: gamesModule,
  },
});
