import Vue from "vue";
import Vuex from "vuex";

import { IState } from "@/types";
import categoriesModule from "@/store/categories.module";

Vue.use(Vuex);

const initialState: IState = {
  categories: {},
};

export default new Vuex.Store({
  state: initialState,
  modules: {
    categories: categoriesModule,
  },
});
