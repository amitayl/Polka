import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import UserProfile from './views/UserProfile.vue';
import ProductUpload from './views/ProductUpload.vue';
import ProductDetails from './views/ProductDetails.vue';
// import Bid from './views/Bid.vue'
import BrowseProducts from './views/BrowseProducts.vue';
import Transaction from './views/Transaction.vue';
import Admin from './views/Admin.vue';
const PATHS = {
  home: '/',
  login: 'login',
  register: 'register'
};
Object.freeze;
export { PATHS };
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    //     {
    //       path: '/',
    //       component: Landing
    //   },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile/:userId',
      name: 'profile',
      component: UserProfile
    },
    {
      path: '/product',
      component: ProductDetails
    },

    {
      path: '/prodile',
      component: UserProfile
    },

    {
      path: '/product/upload',
      component: ProductUpload
    },

    // {
    //     path: '/bid/upload',
    //     component: Bid,
    // },
    {
      path: '/browseProducts',
      component: BrowseProducts
    },
    {
      path: '/transaction',
      component: Transaction
    },
    {
      path: '/admin',
      component: Admin
      // beforeEnter: adminOnlyRoute
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

// function userOnlyRoute(to, from, next) {
//     const user = MyStore.getters.loggedinUser;
//     console.log('Navigation Guard!', user);
//     next(user != null);
// }
// function adminOnlyRoute(to, from, next) {
//     var user = MyStore.getters.loggedinUser;
//     if (!user) return next(false);
//     var res = (user !== null && user.isAdmin === true)
//     console.log('Navigation Guard!',  user, res);
//     next(res);
// }
