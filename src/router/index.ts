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
    name: "Game-details",
    component: () => import("../views/Game-details.vue"),
  },
  {
    path: "/category/:id",
    name: "Category",
    component: () => import("../views/Category-preview.vue"),
  },
  {
    path: "*",
    name: "Not-found",
    component: () => import("../views/Not-found.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
