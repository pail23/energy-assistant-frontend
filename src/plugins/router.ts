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
                component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
                props: true,
            },
            {
                name: 'history',
                path: '/history',
                component: () => import('@/views/Statistics.vue'),
                props: true,
            },
            {
                name: 'rawdata',
                path: '/rawdata',
                component: () => import('@/views/RawData.vue'),
                props: true,
            },
            {
                name: 'sessionlog',
                path: '/sessionlog',
                component: () => import('@/views/SessionLog.vue'),
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