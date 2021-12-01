import { createRouter, createWebHashHistory } from "vue-router";
import Mantras from "../views/Mantras.vue";
import Bugs from "../views/Bugs.vue";
import Intentions from "../views/Intentions.vue";

const routes = [
  {
    path: "/",
    name: "Mantras",
    component: Mantras,
  },
  {
    path: "/bugs",
    name: "Bugs",
    component: Bugs,
  },
  {
    path: "/intentions",
    name: "Intentions",
    component: Intentions,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
