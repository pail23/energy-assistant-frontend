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
        name: 'forecast',
        path: '/forecast',
        component: () => import('@/views/Forecast.vue'),
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
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/Settings.vue'),
        props: true,
        children: [
          {
            path: 'devices',
            name: 'devicessettings',
            component: () => import(/* webpackChunkName: "devicessettings" */ '@/views/settings/Devices.vue'),
            props: true,
          },
          {
            path: 'forecast',
            name: 'forecastsettings',
            component: () => import(/* webpackChunkName: "forecastsettings" */ '@/views/settings/Forecast.vue'),
            props: true,
          },
          {
            path: 'core',
            name: 'coresettings',
            component: () => import(/* webpackChunkName: "coresettings" */ '@/views/settings/CoreConfigs.vue'),
            props: true,
          },
          {
            path: 'editdevice/:deviceId',
            name: 'editdevice',
            component: () => import(/* webpackChunkName: "devicessettings" */ '@/views/settings/EditDeviceConfig.vue'),
            props: true,
          },
          {
            path: '',
            redirect: '/settings/devices', // default child path
            name: 'settingsredirect',
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
