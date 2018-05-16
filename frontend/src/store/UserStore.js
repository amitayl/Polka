const USER_MUTATIONS = {
  SET_LOGGED_IN_USER: 'setLoggedInUser',
  PUSH_PRODUCT_ID: 'pushProductId'
};
const USER_ACTIONS = {
  ADD_USER: 'addUser',
  CHECK_LOGIN: 'checkLogin',
  LOGOUT: 'logout',
  LOGIN_SESSION_USER: 'loginSessionUser'
};
Object.freeze(USER_MUTATIONS);
Object.freeze(USER_ACTIONS);

export { USER_MUTATIONS, USER_ACTIONS };

import UserService from '../services/UserService.js';
import StorageService from '../services/StorageService.js';

export default {
  state: {
    loggedInUser: null,
    selectedUser: null
  },
  getters: {
    getLoggedInUser(state) {
      return state.loggedInUser;
    },

    getSelectedUser(state) {
      return state.selectedUser;
    }
  },
  mutations: {
    [USER_MUTATIONS.SET_LOGGED_IN_USER](state, { user }) {
      state.loggedInUser = user;
    },
    [USER_MUTATIONS.PUSH_PRODUCT_ID](state, { productId }) {
      state.loggedInUser.productIds.push(productId);
    }
  },
  actions: {
    [USER_ACTIONS.ADD_USER](store, { userData }) {
      return UserService.add(userData).then(addedUser => {
        store.commit({
          type: USER_MUTATIONS.SET_LOGGED_IN_USER,
          user: addedUser
        });
        return addedUser;
      });
    },
    [USER_ACTIONS.CHECK_LOGIN](store, { loginData }) {
      return UserService.checkLogin(loginData).then(loggedInUser => {
        if (!loggedInUser) throw Error;
        else {
          store.commit({
            type: USER_MUTATIONS.SET_LOGGED_IN_USER,
            user: loggedInUser
          });
        }
      });
    },
    [USER_ACTIONS.LOGOUT](store) {
      return UserService.logout().then(() => {
        store.commit({ type: USER_MUTATIONS.SET_LOGGED_IN_USER, user: null });
      });
    },
    [USER_ACTIONS.LOGIN_SESSION_USER](store) {
      let loggedInUser = null;
      let userCredentials = StorageService.session.load('userCredentials');

      return new Promise((resolve, reject) => {
        if (userCredentials) {
          store
            .dispatch({
              type: USER_ACTIONS.CHECK_LOGIN,
              loginData: userCredentials
            })
            .then(() => {
              resolve();
            });
        }
      });
    }
  }
};
