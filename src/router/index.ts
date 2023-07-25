// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  /* {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
  },*/
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
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
    component: () => import('@/views/Statistics.vue'),
  },
  {
    name: 'rawdata',
    path: '/rawdata',
    component: () => import('@/views/RawData.vue'),
  },
  {
    name: 'sessionlog',
    path: '/sessionlog',
    component: () => import('@/views/SessionLog.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
