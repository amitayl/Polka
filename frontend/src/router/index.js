// vue & router
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// views
import Home from '@/views/Home.vue';
import Login from '@/views/LoginRegister.vue';
import UserProfile from '@/views/UserProfile.vue';
// import PublicProfile from './views/PublicProfile.vue';
import ProductUpload from '@/views/ProductUpload.vue';
import ProductDetails from '@/views/ProductDetails.vue';
import Bid from '@/views/Bid.vue';
import BrowseProducts from '@/views/BrowseProducts.vue';
import Transaction from '@/views/Transaction.vue';
import Admin from '@/views/Admin.vue';
import DecideTrade from '@/views/DecideTrade.vue';

// msg views
import LoginRequired from '@/views/msgs/LoginRequired.vue'

// nav guards
import navGuards from './navGuards.js' 


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   component: UserProfile
    // },
    {
      path: '/profile/:_id',
      name: 'profile',
      component: UserProfile
    },
    {
      path: '/product/:_id',
      component: ProductDetails
    },
    {
      path: '/upload',
      component: ProductUpload,
      beforeEnter: navGuards.userOnlyRoute
    },
    {
      path: '/bid/:biddedProductId',
      component: Bid,
      beforeEnter: navGuards.userOnlyRoute
    },
    {
      path: '/browseProducts',
      component: BrowseProducts
    },
    {
      path: '/decideTrade/:_id',
      component: DecideTrade
    },
    {
      path: '/transaction/',
      component: Transaction
    },
    {
      path: '/admin',
      component: Admin,
      beforeEnter: navGuards.adminOnlyRoute
    },
    {
      path: '/msg/login-required',
      component: LoginRequired
  }
  ]
});

// inside routes

// {
//     path: '/user/:userId/edit',
//     component: UserProfile,
// },

// {
//     path: '/product/:productId/edit',
//     component: Product,
// },
// {
//     path: '/bid/:bidId/edit',
//     component: Bid,
// },