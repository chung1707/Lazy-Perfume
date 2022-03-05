import {
  createRouter,
  createWebHistory
} from 'vue-router';

import Home from '../pages/client/home.vue';
const routes = [
  //client layouts
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'client' }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName:"Products"*/ '../pages/client/products.vue'),
    meta: { layout: 'client' }
  },
  //admin layouts
  {
    path: '/admin/dashbroad',
    name: 'Dashbroad',
    component: () => import(/* webpackChunkName:"Products"*/ '../pages/admin/dashbroad.vue'),
    meta: { layout: 'admin' }
  },
]


const router = createRouter({

  history: createWebHistory(),
  routes,
});

export default router;
