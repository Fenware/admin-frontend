import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Subjects from "../views/Subjects.vue";
import Orientations from "../views/Orientations.vue";
import Groups from "../views/Groups.vue";
import Users from "../views/Users.vue";
import User from "../views/User.vue";
import Consultations from "../views/Consultations.vue";

const routes = [
  {
    path: "/",
    redirect: "/inicio",
  },
  {
    path: "/inicio",
    name: "Home",
    component: Home,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/materias",
    name: "Subjects",
    component: Subjects,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/orientaciones",
    name: "Orientations",
    component: Orientations,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/grupos",
    name: "Groups",
    component: Groups,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/usuarios",
    name: "Users",
    component: Users,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/usuario/:nickname",
    name: "User",
    component: User,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/usuario/:nickname/consultas",
    name: "UserConsultations",
    component: Consultations,
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    //Acá hay que poner una vista 404
    next("/inicio");
  } else {
    const routeProtected = to.matched.some((record) => record.meta.requireAuth);
    /* let redirectedFrom = to.redirectedFrom; */
    /* console.log(redirectedFrom);
    console.log(to); */
    // Verificando la session en cada ruta
    store.dispatch("syncToken");
    if (routeProtected) {
      store.dispatch("checkSession").then(() => {
        if (store.state.token !== null) {
          next();
        }
      });
    } else if (to.fullPath == "/login") {
      if (store.state.token !== null) {
        next({ name: "Home" });
      } else {
        next();
      }
    }
  }
});

export default router;
