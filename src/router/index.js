import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some((record) => record.meta.requireAuth);
  
  //console.log(rutaProtegida);

  if (rutaProtegida && store.state.token === null) {
    // ruta protegida es true
    // token es nulo true, por ende redirigimos al inicio
    next({ name: "Login" });
  } else {
    // En caso contrario sigue...
    next();
  }
});

export default router;
