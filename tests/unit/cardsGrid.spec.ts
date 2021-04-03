import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

import CardsGrid from "@/components/CardsGrid.vue";
import { MUTATE_SELECTED_GAME } from "@/constants/store";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("CardSGrid", () => {
  const props = {
    title: "title",
    games: [],
    error: null,
    loading: false,
  };
  let mutations: any;
  let store: any;
  let router: any;

  beforeEach(() => {
    mutations = {
      [MUTATE_SELECTED_GAME]: jest.fn(),
    };
    store = new Vuex.Store({
      mutations,
    });
    router = new VueRouter();
  });

  it("can render component", () => {
    const wrapper = mount(CardsGrid, { propsData: props });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("can check passed title prop", () => {
    const wrapper = mount(CardsGrid, {
      propsData: props,
    });
    const titleWrapper = wrapper.find("h2");
    expect(titleWrapper.text()).toBe(props.title);
  });

  it("can check passed loading prop", () => {
    const wrapper = mount(CardsGrid, {
      propsData: { ...props, loading: true },
    });
    const loadingWrapper = wrapper.find("[data-testid=loading]");
    expect(loadingWrapper.exists()).toBeTruthy();
  });

  it("can check passed error prop", () => {
    const error = "error message";
    const wrapper = mount(CardsGrid, {
      propsData: { ...props, error },
    });
    const errorWrapper = wrapper.find("[data-testid=error]");
    expect(errorWrapper.exists()).toBeTruthy();
    expect(errorWrapper.text()).toBe(error);
  });

  it("can check passed games prop", () => {
    const title = "card title";
    const body = "card body";
    const wrapper = mount(CardsGrid, {
      propsData: { ...props, games: [{ title, body }] },
    });
    const cardWrapper = wrapper.find("[data-testid=card]");
    const cardTitleWrapper = wrapper.find("[data-testid=card-title]");
    const cardBodyWrapper = wrapper.find("[data-testid=card-body]");
    expect(cardWrapper.exists()).toBeTruthy();
    expect(cardTitleWrapper.text()).toBe(title);
    expect(cardBodyWrapper.text()).toBe(body);
  });

  it("can check card click", () => {
    const wrapper = mount(CardsGrid, {
      localVue,
      store,
      router,
      propsData: { ...props, games: [{}] },
    });
    const cardWrapper = wrapper.find("[data-testid=card]");
    cardWrapper.trigger("click");
    expect(mutations[MUTATE_SELECTED_GAME]).toHaveBeenCalled();
  });
});
