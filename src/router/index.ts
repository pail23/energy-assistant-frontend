// Composables
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
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
