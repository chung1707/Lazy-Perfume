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
  {
    path: '/product',
    name: 'Product',
    component: () => import(/* webpackChunkName:"Product"*/ '../pages/client/product.vue'),
    meta: { layout: 'client' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName:"cart"*/ '../pages/client/cart.vue'),
    meta: { layout: 'client' }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import(/* webpackChunkName:"checkout"*/ '../pages/client/checkout.vue'),
    meta: { layout: 'client' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName:"login"*/ '../pages/client/login.vue'),
    meta: { layout: 'client' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName:"register"*/ '../pages/client/register.vue'),
    meta: { layout: 'client' }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName:"account"*/ '../pages/client/personal.vue'),
    meta: { layout: 'client' }
  },

  //admin layouts
  {
    path: '/admin/dashbroad',
    name: 'Dashbroad',
    component: () => import(/* webpackChunkName:"dashbroad"*/ '../pages/admin/dashbroad.vue'),
    meta: { layout: 'admin' }
  },
]


const router = createRouter({

  history: createWebHistory(),
  routes,
});

export default router;
