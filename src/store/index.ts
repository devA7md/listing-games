import Vue from "vue";
import Vuex from "vuex";

import gamesModule from "@/store/games.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    games: gamesModule,
  },
});
