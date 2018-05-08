import store from '@/store/index.js';

function userOnlyRoute(to, from, next) {
    const loggedInUser = store.getters.getLoggedInUser;
    if (loggedInUser) next()
    else next('/msg/login-required');
}

function adminOnlyRoute(to, from, next) {
    const loggedInUser = store.getters.getLoggedinUser;
    if (loggedInUser && !loggedInUser.isAdmin) next()
}

export default {
    userOnlyRoute,
    adminOnlyRoute
}