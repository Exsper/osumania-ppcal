import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import SayobotFastView from "../views/SayobotFastView.vue";
import LevelRequire from "../views/LevelRequire.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/sayo",
    name: "sayo",
    component: SayobotFastView,
  },
  {
    path: "/level",
    name: "level",
    component: LevelRequire,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
