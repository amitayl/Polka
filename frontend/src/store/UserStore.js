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
    loggedInUser: {
      _id: '',
      name: '',
      email: '',
      products: [{ id: 1, img: '' }, { id: 2, img: '' }]
    },
    selectedUser: {
      _id: '2',
      name: 'yosi',
      img: '../imgs/selectedUser.jpg',
      desc: ' Hello , I am a nice person who likes to travel',
      email: 'yosi@gmail.com',
      products: [{ id: 4, img: '' }, { id: 5, img: '' }]
    }
  },
  getters: {
    getCurrUser(state) {
      console.log('yoyo');
      return state.loggedInUser;
    },

    getUserSelected(state) {
      return state.selectedUser;
    }
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
    }
  }
};
