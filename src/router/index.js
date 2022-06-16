import { createRouter, createWebHistory } from "vue-router";

import TheLogin from "../components/layout/TheLogin.vue";
import TheMain from "../components/layout/TheMain.vue";
import TheContent from "../components/layout/TheContent.vue";
import TheLicense from "../components/layout/TheLicense.vue";
import store from "../router/store";
// import store from "./store";
const routes = [
  {
    path: "/main",
    component: TheMain,
    name: "main",
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "/license",
        component: TheLicense,
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: "/asset",
        component: TheContent,
      },
    ],
  },
  {
    path: "/",
    component: TheLogin,
    name: "Login",
    meta: { guest: true },
  },

];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach(async (to, from, next) => {

  if (to.matched.some((record) => record.meta.requiresAuth)){
      if (store.getters.isAuthentication) {
          next();
          return;
      }
      next("/");
  } else next();
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
      if (store.getters.isAuthentication) {
          next("/asset");
          return;
      }
      next();
  } else {
      next();
  }
});
export default router;
