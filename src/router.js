import Vue from "vue";
import Router from "vue-router";
import Actors from "./views/Actors.vue";
import Producers from "./views/Producers.vue";
import Movies from "./views/Movies.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/actors",
      name: "actors",
      component: Actors
    },
    {
      path: "/producers",
      name: "producers",
      component: Producers
    },
    {
      path: "/movies",
      name: "movies",
      component: Movies
    }
  ]
});
