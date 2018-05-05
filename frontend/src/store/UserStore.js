import UserService from '../services/UserService.js';

const MUTATIONS = {
  SET_LOGGED_IN_USER: 'setLoggedInUser'
};
const ACTIONS = {
  ADD_USER: 'addUser',
  CHECK_LOGIN: 'checkLogin'
};
Object.freeze(MUTATIONS);
Object.freeze(ACTIONS);

export { MUTATIONS, ACTIONS };

export default {
  state: {
    loggedInUser: null
  },
  mutations: {
    [MUTATIONS.SET_LOGGED_IN_USER](state, { addedUser }) {
      state.loggedInUser = addedUser;
    }
  },
  actions: {
    [ACTIONS.ADD_USER](store, { userData }) {
      return UserService.add(userData).then(addedUser => {
        store.commit({ type: MUTATIONS.SET_LOGGED_IN_USER, addedUser });
        return addedUser;
      });
    },
    [ACTIONS.CHECK_LOGIN](store, { loginData }) {
      return UserService.checkLogin(loginData)
      .then(validUser => {
        store.commit({ type: MUTATIONS.SET_LOGGED_IN_USER, loggedInUser });
        return loggedInUser;
      })
      .catch()
    }
  }
};
