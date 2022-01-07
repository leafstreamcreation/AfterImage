import { createRouter, createWebHashHistory } from "vue-router";
import Mantras from "../views/Mantras.vue";
import Bugs from "../views/Bugs.vue";
import Tasks from "../views/Tasks.vue";

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
    path: "/tasks",
    name: "Tasks",
    component: Tasks,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
