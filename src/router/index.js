import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue';
import useAuthStore from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'restaurants',
          component: () => import('../views/RestaurantsView.vue'),
          meta: {requiresAuth: true}
        },
        {
          path: '/restaurants/:id',
          name: 'single-restaurant',
          component: () => import('@/views/SingleRestaurantView.vue'),
          meta: {requiresAuth: true}
        },
        {
          path: '/deals',
          name: 'deals',
          component: () => import('@/views/DealsView.vue'),
          meta: {requiresAuth: true}
        },
        {
          path: '/cart',
          name: 'cart',
          component: () => import('@/views/CartView.vue'),
          meta: {requiresAuth: true}
        },
        {
          path: '/orders',
          name: 'orders',
          component: () => import('@/views/OrderListView.vue'),
          meta: {requiresAuth: true}
        },
       
      ],
    },
    {
      path: '/login',
      name: 'login', 
      component: () => import('@/views/AuthView.vue')
    }
    
  ]
})

router.beforeEach((to, _, next) => {
  const isAuthenticated = useAuthStore().isAuthenticated;
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
