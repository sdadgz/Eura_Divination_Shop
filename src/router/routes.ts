import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {path: '', redirect: () => '/home'},
            {path: 'home', component: () => import('pages/main/Main.vue')},
            {path: 'upload', component: () => import('pages/main/Upload.vue')},
            {path: 'about', component: () => import('pages/main/About.vue')},
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
