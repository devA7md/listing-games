import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { from, of } from "rxjs";

import Home from "../views/Home.vue";
import { catchError, filter, pluck } from "rxjs/operators";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: " Home",
    },
  },
  {
    path: "/game/:id",
    name: "GameDetails",
    meta: {
      title: " Game details",
    },
    component: () => import("../views/GameDetails.vue"),
  },
  {
    path: "/category/:id",
    name: "Category",
    meta: {
      title: " Category",
    },
    component: () => import("../views/CategoryPreview.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    meta: {
      title: " 404 not found",
    },
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, fromRoute, next) => {
  from(to.matched)
    .pipe(
      filter((route) => route.meta.title),
      pluck("meta", "title"),
      catchError(() => of("Game Listing"))
    )
    .subscribe((title: string) => {
      document.title = title;
    });
  next();
});

export default router;
