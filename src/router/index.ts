import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/game/:id",
    name: "GameDetails",
    component: () => import("../views/GameDetails.vue"),
  },
  {
    path: "/category/:id",
    name: "Category",
    component: () => import("../views/CategoryPreview.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
