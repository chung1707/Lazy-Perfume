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
    meta: {
      layout: 'client'
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import( /* webpackChunkName:"Products"*/ '../pages/client/products.vue'),
    meta: {
      layout: 'client'
    },
    props: true
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import( /* webpackChunkName:"Product"*/ '../pages/client/product.vue'),
    meta: {
      layout: 'client'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import( /* webpackChunkName:"cart"*/ '../pages/client/cart.vue'),
    meta: {
      layout: 'client'
    },
    beforeEnter: guards.requireAuth,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import( /* webpackChunkName:"checkout"*/ '../pages/client/checkout.vue'),
    meta: {
      layout: 'client'
    },
    beforeEnter: guards.requireAuth,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName:"login"*/ '../pages/client/login.vue'),
    meta: {
      layout: 'client'
    },
    beforeEnter: guards.checkLoggedIn,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( /* webpackChunkName:"register"*/ '../pages/client/register.vue'),
    meta: {
      layout: 'client'
    },
    beforeEnter: guards.checkLoggedIn,
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import( /* webpackChunkName:"account"*/ '../pages/client/personal.vue'),
    meta: {
      layout: 'client'
    },
    beforeEnter: guards.requireAuth,

  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import( /* webpackChunkName:"account"*/ '../pages/client/blog.vue'),
    meta: {
      layout: 'client'
    },
  },
  {
    path: '/post/:id',
    name: 'ClientPostDetail',
    component: () => import( /* webpackChunkName:"account"*/ '../pages/client/postDetail.vue'),
    meta: {
      layout: 'client'
    },
  },

  //admin layouts
  {
    path: '/admin/dashbroad',
    name: 'Dashbroad',
    component: () => import( /* webpackChunkName:"dashbroad"*/ '../pages/admin/dashbroad.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },
  {
    path: '/admin/profile',
    name: 'Profile',
    component: () => import( /* webpackChunkName:"profile"*/ '../pages/admin/profile.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },
  {
    path: '/admin/clientUsers',
    name: 'ClientUsers',
    component: () => import( /* webpackChunkName:"ClientUsers"*/ '../pages/admin/users/clientUsers.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/adminUsers',
    name: 'AdminUsers',
    component: () => import( /* webpackChunkName:"AdminUsers"*/ '../pages/admin/users/adminUsers.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/employeeUsers',
    name: 'EmployeeUsers',
    component: () => import( /* webpackChunkName:"EmployeeUsers"*/ '../pages/admin/users/employeeUsers.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/user_detai/:id',
    name: 'UserDetail',
    component: () => import( /* webpackChunkName:"UserDetail"*/ '../pages/admin/users/accountDetail.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },

  //order routes
  {
    path: '/admin/newOrders',
    name: 'NewOrders',
    component: () => import( /* webpackChunkName:"NewOrders"*/ '../pages/admin/orders/newOrders.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },
  {
    path: '/admin/processOrders',
    name: 'ProcessOrders',
    component: () => import( /* webpackChunkName:"ProcessOrders"*/ '../pages/admin/orders/processOrders.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },
  {
    path: '/admin/deliveredOrders',
    name: 'DeliveredOrders',
    component: () => import( /* webpackChunkName:"DeliveredOrders"*/ '../pages/admin/orders/deliveredOrders.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },
  {
    path: '/admin/canceledOrders',
    name: 'CanceledOrders',
    component: () => import( /* webpackChunkName:"CanceledOrders"*/ '../pages/admin/orders/canceledOrders.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },
  {
    path: '/admin/refundedOrders',
    name: 'RefundedOrders',
    component: () => import( /* webpackChunkName:"RefundedOrders"*/ '../pages/admin/orders/refundedOrders.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },
  {
    path: '/admin/orderDetail/:id',
    name: 'OrderDetail',
    component: () => import( /* webpackChunkName:"OrderDetail"*/ '../pages/admin/orders/orderDetail.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: () => import( /* webpackChunkName:"AdminProducts"*/ '../pages/admin/products/products.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },
  {
    path: '/admin/product/:id',
    name: 'AdminProductDetail',
    component: () => import( /* webpackChunkName:"AdminProductDetail"*/ '../pages/admin/products/productDetail.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },
  {
    path: '/admin/change/product/:id',
    name: 'AdminProductChange',
    component: () => import( /* webpackChunkName:"AdminProductChange"*/ '../pages/admin/products/productChange.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },

  {
    path: '/admin/import',
    name: 'Import',
    component: () => import( /* webpackChunkName:"Import"*/ '../pages/admin/products/import.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },
  {
    path: '/admin/importHistory',
    name: 'ImportHistory',
    component: () => import( /* webpackChunkName:"policy"*/ '../pages/admin/products/importBills.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/billDetail/:id',
    name: 'BillDetail',
    component: () => import( /* webpackChunkName:"policy"*/ '../pages/admin/products/billDetail.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  // category routes 
  {
    path: '/admin/category',
    name: 'Category',
    component: () => import( /* webpackChunkName:"Category"*/ '../pages/admin/category/categories.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/category/:id',
    name: 'CategoryDetail',
    component: () => import( /* webpackChunkName:"Category"*/ '../pages/admin/category/categoryDetail.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/add_category',
    name: 'AddCategory',
    component: () => import( /* webpackChunkName:"Category"*/ '../pages/admin/category/addCategory.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  // supplier routes
  {
    path: '/admin/supplier',
    name: 'Supplier',
    component: () => import( /* webpackChunkName:"supplier"*/ '../pages/admin/supplier/suppliers.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/supplier/:id',
    name: 'SupplierDetail',
    component: () => import( /* webpackChunkName:"Category"*/ '../pages/admin/supplier/supplierDetail.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/add_supplier',
    name: 'AddSupplier',
    component: () => import( /* webpackChunkName:"Category"*/ '../pages/admin/supplier/addSupplier.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/newPost',
    name: 'Post',
    component: () => import( /* webpackChunkName:"post"*/ '../pages/admin/post/newPosts.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },
  {
    path: '/admin/approved_post',
    name: 'ApprovedPost',
    component: () => import( /* webpackChunkName:"post"*/ '../pages/admin/post/posts.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/post/:id',
    name: 'PostDetail',
    component: () => import( /* webpackChunkName:"post"*/ '../pages/admin/post/postDetail.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },
  {
    path: '/admin/addPost',
    name: 'AddPost',
    component: () => import( /* webpackChunkName:"post"*/ '../pages/admin/post/addPost.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkManagerRole]
  },
  {
    path: '/admin/discount',
    name: 'Discount',
    component: () => import( /* webpackChunkName:"discount"*/ '../pages/admin/policy_discount/discount.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/discount/:id',
    name: 'DiscountDetail',
    component: () => import( /* webpackChunkName:"discount"*/ '../pages/admin/policy_discount/discountDetail.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/addDiscount',
    name: 'AddDiscount',
    component: () => import( /* webpackChunkName:"discount"*/ '../pages/admin/policy_discount/addDiscount.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/policy',
    name: 'Policy',
    component: () => import( /* webpackChunkName:"policy"*/ '../pages/admin/policy_discount/policy.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  // statistic routes 
  {
    path: '/admin/statistic/sales',
    name: 'SalesStatistic',
    component: () => import( /* webpackChunkName:"policy"*/ '../pages/admin/statistic/sales.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/statistic/products',
    name: 'ProducsStatistic',
    component: () => import( /* webpackChunkName:"policy"*/ '../pages/admin/statistic/products.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/addPolicy',
    name: 'AddPolicy',
    component: () => import( /* webpackChunkName:"policy"*/ '../pages/admin/policy_discount/addPolicy.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/policy/:id',
    name: 'PolicyDetail',
    component: () => import( /* webpackChunkName:"policy"*/ '../pages/admin/policy_discount/policyDetail.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/banner',
    name: 'AdminBanner',
    component: () => import( /* webpackChunkName:"banner"*/ '../pages/admin/banner/banners.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/banner/:id',
    name: 'BannerDetail',
    component: () => import( /* webpackChunkName:"banner"*/ '../pages/admin/banner/editBanner.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },
  {
    path: '/admin/addbanner/',
    name: 'AddBanner',
    component: () => import( /* webpackChunkName:"banner"*/ '../pages/admin/banner/addBanner.vue'),
    meta: {
      layout: 'admin'
    },
    beforeEnter: [guards.requireAuth, guards.checkAdminRole]
  },

  // error routes
  {
    path: '/:pathMatch(.*)',
    name: 'Error',
    component: () => import( /* webpackChunkName:"Error"*/ '../pages/errorPage.vue'),
    meta: {
      layout: 'client'
    },
  },
]

const router = createRouter({

  history: createWebHistory(),
  routes,
});
export default router;
