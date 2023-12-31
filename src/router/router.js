import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home-page",
    component: () => import("@/modules/homepage/pages/LandingPage.vue")
  },
  {
    path: "/admin",
    name: "admin-panel",
    component: () => import("@/modules/cruds/shared/pages/AdminView.vue"),
    children: [
      //Rutas Pets
      {
        path: "pets",
        name: "view-pets",
        component: () => import("@/modules/cruds/pets/components/Table.vue")
      },
      {
        path: "pets/view/create",
        name: "view-pets-create",
        component: () =>
          import("@/modules/cruds/pets/components/FormCreate.vue")
      },
      {
        path: "pets/form/edit/:id",
        name: "form-pets-edit",
        component: () => import("@/modules/cruds/pets/components/FormEdit.vue")
      },
      //Rutas especies
      {
        path: "species",
        name: "view-species",
        component: () => import("@/modules/cruds/species/components/Table.vue")
      },
      //Rutas Vaccines
      {
        path: "vaccines",
        name: "view-vaccines",
        component: () => import("@/modules/cruds/vaccines/components/Table.vue")
      },
      //Rutas Diseases
      {
        path: "diseases",
        name: "view-diseases",
        component: () => import("@/modules/cruds/diseases/components/Table.vue")
      },
      //Rutas Breeds
      {
        path: "breeds",
        name: "view-breeds",
        component: () => import("@/modules/cruds/breeds/components/Table.vue")
      },
      {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: import("@/modules/shared/pages/NoPagesFound.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
