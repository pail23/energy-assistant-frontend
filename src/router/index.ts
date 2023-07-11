// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  /* {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
  },*/
  {
    path: '',
    redirect: '/home',
    name: 'homeredirect',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    name: 'history',
    path: '/history',
    component: () => import('@/views/History.vue'),
  },
  {
    name: 'rawdata',
    path: '/rawdata',
    component: () => import('@/views/RawData.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
