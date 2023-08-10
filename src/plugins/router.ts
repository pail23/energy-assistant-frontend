import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
    {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '',
                // redirect: '/home', // revert once we finish the new home screen
                redirect: '/home',
                name: 'homeredirect',
            },
            {
                path: '/home',
                name: 'home',
                component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
                props: true,
            },
            {
                path: '/search',
                name: 'search',
                component: () => import(/* webpackChunkName: "search" */ '@/views/Search.vue'),
                props: true,
            },
            {
                path: '/settings',
                name: 'settings',
                component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
                props: true,
            }           
        ]
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;