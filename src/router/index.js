import { createRouter, createWebHistory } from "vue-router";

import TheLogin from "../components/layout/TheLogin.vue";
import TheMain from "../components/layout/TheMain.vue";
import TheContent from "../components/layout/TheContent.vue";
import TheLicense from "../components/layout/TheLicense.vue";
import axios from "axios";
// import store from "./store";
const routes = [
  {
    path: "/trangchu",
    component: TheMain,
    name: "trangchu",
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
  },

];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

axios.defaults.withCredentials = true;
router.beforeEach(async (to, from, next) => {
  // const { isAuthentication } = store.getters;
  // next-line: check if route ("to" object) needs authenticated
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    await axios
      .get("http://localhost:5062/api/v1/Users")
      .then(function (res) {
        console.log(res);
        next();
      })
      .catch(async function () {
        next({ path: "/" });
      });
  } else next();
});
// router.beforeEach(async (to, from, next) => {
//   const { isAuthentication } = store.getters;
//   // next-line: check if route ("to" object) needs authenticated
//   if (to.matched.some((record) => record.meta.requiresAuth) && isAuthentication == false) {
//     next('/');
//   } else if (isAuthentication == true) {
//     switch (to.name) {
//       case 'Login'  :
//         next({ path: '/' });
//         break;
//       case 'trangchu':
//         next();
//         break;
//       default:
//         next();
//         break;
//     }
//   } else next();
// });
export default router;
