import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../components/HomeView.vue";
// import AboutView from "../components/AboutView.vue";
import SayobotFastView from "../components/SayobotFastView.vue";

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
  /*
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  */
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
