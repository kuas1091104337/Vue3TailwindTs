// import { createRouter, createWebHashHistory } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import GridTest from '../pages/GridTest.vue';

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/gridTest', name: 'gridTest', component: GridTest },
    {
      path: '/BaseJs1',
      name: 'BaseJs1',
      component: () => import('../pages/BaseJs1.vue'),
    },
    {
      path: '/BaseJs2',
      name: 'BaseJs2',
      component: () => import('../pages/BaseJs2.vue'),
    },
    {
      path: '/BaseJs3',
      name: 'BaseJs3',
      component: () => import('../pages/BaseJs3.vue'),
    },
    {
      path: '/BaseJs4',
      name: 'BaseJs4',
      component: () => import('../pages/BaseJs4.vue'),
    },
    {
      path: '/BaseJs5',
      name: 'BaseJs5',
      component: () => import('../pages/BaseJs5.vue'),
    },
    {
      path: '/BaseJs6',
      name: 'BaseJs6',
      component: () => import('../pages/BaseJs6.vue'),
    },
    {
      path: '/BaseJs7',
      name: 'BaseJs7',
      component: () => import('../pages/BaseJs7.vue'),
    },
    {
      path: '/varTs',
      name: 'varTs',
      component: () => import('../pages/VarTs.vue'),
    },
    {
      path: '/varTs2',
      name: 'varTs2',
      component: () => import('../pages/VarTs2.vue'),
    },
    {
      path: '/BaseVue0',
      name: 'BaseVue0',
      component: () => import('../pages/BaseVue0.vue'),
    },
    {
      path: '/BaseVue1',
      name: 'BaseVue1',
      component: () => import('../pages/BaseVue1.vue'),
    },
    {
      path: '/BaseVue2',
      name: 'BaseVue2',
      component: () => import('../pages/BaseVue2.vue'),
    },
    {
      path: '/JSH',
      name: 'JSH',
      component: () => import('../pages/JSH.vue'),
    },
    {
      path: '/IntersectionObserver',
      name: 'IntersectionObserver',
      component: () => import('../pages/IntersectionObserver.vue'),
    },
    // {
    //   path: '/xxxxx',
    //   name: 'xxxxx',
    //   // route level code-splitting 路由級別代碼分割
    //   // this generates a separate chunk (Xxxxx.[hash].js) for this route
    //   // 他為此路由產生一個單獨的區塊（Xxxxx.[hash].js）
    //   // which is lazy-loaded when the route is visited.
    //   // 當訪問路線時，它是延遲加載的。
    //   component: () => import('../pages/Xxxxx.vue'),
    // },
  ],
});

export default router;
