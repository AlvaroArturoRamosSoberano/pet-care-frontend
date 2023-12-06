import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import(/* webpackChunkName: "MainPage" */'@/modules/homepage/pages/LandingPage.vue')
  },
  {
    path: "/table",
    name: "table-route",
    component: () => import(/* webpackChunkName: "Table" */'@/modules/cruds/pets/components/Table.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component:  import(/* webpackChunkName: "NoPageFound" */'@/modules/shared/pages/NoPagesFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
