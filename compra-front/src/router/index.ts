import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Home from '@/views/Home.vue';
import CreateProduct from '@/views/CreateProduct.vue';
import ListProduct from '@/views/ListProduct.vue';
import EditProduct from '@/views/EditProduct.vue';
import LogIn from '@/views/logIn.vue';
import SignUp from '@/views/signUp.vue';
import Profile from '@/views/Profile.vue';
import Products from '@/views/Products.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/crear-producto', component: CreateProduct, meta: { requiresAuth: true, requireAdmin: true } },
    { path: '/listar-productos', component: ListProduct, meta: { requiresAuth: true, requireAdmin: true } },
    { path: '/editar-producto/:id', component: EditProduct, meta: { requiresAuth: true, requireAdmin: true }},
    { path: '/login', component: LogIn},
    { path: '/signup', component: SignUp},
    { path: '/profile', component: Profile},
    { path: '/products', component: Products}
];


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Si vuelve atrás/adelante
    if (savedPosition) {
      return savedPosition;
    }

    // Scroll normal al cambiar de ruta
    return {
      top: 0,
      behavior: 'smooth'
    };
  },
});


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // to.matched.some revisa si la ruta a la que va el usuario tiene las etiquetas meta
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requireAdmin = to.matched.some(record => record.meta.requireAdmin);

  // 1. Si requiere login y no hay token -> al Login
  if (requiresAuth && !authStore.isLoggedIn) {
    return next( '/login');
  }

  // 2. Si requiere Admin y no es ADMIN -> al Home
  if (requireAdmin && authStore.usuario?.role !== 'ADMIN') {
    return next(  '/' );
  }
  next();
});

export default router;
