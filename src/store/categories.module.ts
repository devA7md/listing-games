import { ActionContext } from "vuex";

import { IGamesCategories, IState } from "@/types";
import {
  CATEGORIES_MUTATE_SET,
  CATEGORIES_ACTION_SET,
  CATEGORIES_GET,
} from "@/constants/store";

const categoriesModule = {
  state: {
    categories: {},
  },
  mutations: {
    [CATEGORIES_MUTATE_SET](state: IState, payload: IGamesCategories): void {
      state.categories = payload;
    },
  },
  actions: {
    [CATEGORIES_ACTION_SET](
      context: ActionContext<IGamesCategories, IState>,
      payload: IGamesCategories
    ): void {
      context.commit(CATEGORIES_MUTATE_SET, payload);
    },
  },
  getters: {
    [CATEGORIES_GET](state: IState): IGamesCategories {
      return state.categories;
    },
  },
};

export default categoriesModule;
