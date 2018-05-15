const SOCKET_MUTATIONS = {
  SET_SOCKET: 'setSocket',
  SET_LISTENER: 'setListener',
  EMIT: 'emit'
};
const SOCKET_ACTIONS = {};
Object.freeze(SOCKET_MUTATIONS);
Object.freeze(SOCKET_ACTIONS);

export { SOCKET_MUTATIONS, SOCKET_ACTIONS };

export default {
  state: {
    socket: null
  },
  getters: {
    socket(state) {
      return state.socket;
    }
  },
  mutations: {
    [SOCKET_MUTATIONS.SET_SOCKET](state, { loggedInUserSocket }) {
      console.log(loggedInUserSocket);
      state.socket = loggedInUserSocket;
    },
    [SOCKET_MUTATIONS.SET_LISTENER](state, { eventName, callback }) {
      state.socket.on(eventName, callback);
    },
    [SOCKET_MUTATIONS.EMIT](state, { eventName, params }) {
      state.socket.emit(eventName, params);
    }
  }
};
