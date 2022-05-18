import {
  createRouter,
  createWebHistory
} from 'vue-router';
import guards from './guards';
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
    meta: { layout: 'client' },
    props: true
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import(/* webpackChunkName:"Product"*/ '../pages/client/product.vue'),
    meta: { layout: 'client' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName:"cart"*/ '../pages/client/cart.vue'),
    meta: { layout: 'client' },
    beforeEnter: guards.requireAuth, 
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import(/* webpackChunkName:"checkout"*/ '../pages/client/checkout.vue'),
    meta: { layout: 'client' },
    beforeEnter: guards.requireAuth, 
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName:"login"*/ '../pages/client/login.vue'),
    meta: { layout: 'client' }, 
    beforeEnter: guards.checkLoggedIn, 
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName:"register"*/ '../pages/client/register.vue'),
    meta: { layout: 'client' }, 
    beforeEnter: guards.checkLoggedIn, 
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName:"account"*/ '../pages/client/personal.vue'),
    meta: { layout: 'client' },
    beforeEnter: guards.requireAuth, 

  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import(/* webpackChunkName:"account"*/ '../pages/client/blog.vue'),
    meta: { layout: 'client' },
  },

  //admin layouts
  {
    path: '/admin/dashbroad',
    name: 'Dashbroad',
    component: () => import(/* webpackChunkName:"dashbroad"*/ '../pages/admin/dashbroad.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkManagerRole] 
  },
  {
    path: '/admin/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName:"profile"*/ '../pages/admin/profile.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkManagerRole] 
  },
  {
    path: '/admin/clientUsers',
    name: 'ClientUsers',
    component: () => import(/* webpackChunkName:"ClientUsers"*/ '../pages/admin/users/clientUsers.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkAdminRole] 
  },
  {
    path: '/admin/adminUsers',
    name: 'AdminUsers',
    component: () => import(/* webpackChunkName:"AdminUsers"*/ '../pages/admin/users/adminUsers.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkAdminRole] 
  },
  {
    path: '/admin/employeeUsers',
    name: 'EmployeeUsers',
    component: () => import(/* webpackChunkName:"EmployeeUsers"*/ '../pages/admin/users/employeeUsers.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkAdminRole] 
  },
  {
    path: '/admin/user_detai/:id',
    name: 'UserDetail',
    component: () => import(/* webpackChunkName:"UserDetail"*/ '../pages/admin/users/accountDetail.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkAdminRole] 
  },

  //order routes
  {
    path: '/admin/newOrders',
    name: 'NewOrders',
    component: () => import(/* webpackChunkName:"NewOrders"*/ '../pages/admin/orders/newOrders.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkManagerRole] 
  },
  {
    path: '/admin/processOrders',
    name: 'ProcessOrders',
    component: () => import(/* webpackChunkName:"ProcessOrders"*/ '../pages/admin/orders/processOrders.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkManagerRole] 
  },
  {
    path: '/admin/deliveredOrders',
    name: 'DeliveredOrders',
    component: () => import(/* webpackChunkName:"DeliveredOrders"*/ '../pages/admin/orders/deliveredOrders.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkManagerRole] 
  },
  {
    path: '/admin/canceledOrders',
    name: 'CanceledOrders',
    component: () => import(/* webpackChunkName:"CanceledOrders"*/ '../pages/admin/orders/canceledOrders.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkManagerRole] 
  },
  {
    path: '/admin/refundedOrders',
    name: 'RefundedOrders',
    component: () => import(/* webpackChunkName:"RefundedOrders"*/ '../pages/admin/orders/refundedOrders.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkManagerRole] 
  },
  {
    path: '/admin/orderDetail/:id',
    name: 'OrderDetail',
    component: () => import(/* webpackChunkName:"OrderDetail"*/ '../pages/admin/orders/orderDetail.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkManagerRole] 
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: () => import(/* webpackChunkName:"AdminProducts"*/ '../pages/admin/products/products.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkManagerRole] 
  },
  {
    path: '/admin/product/:id',
    name: 'AdminProductDetail',
    component: () => import(/* webpackChunkName:"AdminProductDetail"*/ '../pages/admin/products/productDetail.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkManagerRole] 
  },
  {
    path: '/admin/change/product/:id',
    name: 'AdminProductChange',
    component: () => import(/* webpackChunkName:"AdminProductChange"*/ '../pages/admin/products/productChange.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkManagerRole] 
  },
  {
    path: '/admin/import',
    name: 'Import',
    component: () => import(/* webpackChunkName:"Import"*/ '../pages/admin/products/import.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkManagerRole] 
  },
  // category routes 
  {
    path: '/admin/category',
    name: 'Category',
    component: () => import(/* webpackChunkName:"Category"*/ '../pages/admin/category/categories.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkAdminRole] 
  },
  // supplier routes
  {
    path: '/admin/supplier',
    name: 'Supplier',
    component: () => import(/* webpackChunkName:"supplier"*/ '../pages/admin/supplier/suppliers.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkAdminRole] 
  },
  {
    path: '/admin/post',
    name: 'Post',
    component: () => import(/* webpackChunkName:"post"*/ '../pages/admin/post/posts.vue'),
    meta: { layout: 'admin' },
    beforeEnter: [guards.requireAuth,guards.checkManagerRole] 
  },
  // error routes
  {
    path: '/:pathMatch(.*)',
    name: 'Error',
    component: () => import(/* webpackChunkName:"Error"*/ '../pages/errorPage.vue'),
    meta: { layout: 'client' },
  },
]

const router = createRouter({

  history: createWebHistory(),
  routes,
});
export default router;
