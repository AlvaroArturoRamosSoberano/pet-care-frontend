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
      /* {
        path: "species/view/create",
        name: "view-species-create",
        component: () =>
          import("@/modules/cruds/species/components/Form.vue")
      },
      {
        path: "species/view/edit/:id",
        name: "view-species-edit",
        component: () =>
          import("@/modules/cruds/species/components/Form.vue")
      }, */
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
