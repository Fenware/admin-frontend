import { createStore } from "vuex";

// Modulos
import auth from './modules/auth';  
import usersPending from './modules/usersPending';
import subjects from './modules/subjects';
import orientations from './modules/orientations';
import groups from './modules/groups';

export default createStore({
  // Declarando modulos para poder usarlos
  modules:{
    auth,
    usersPending,
    subjects,
    orientations,
    groups
  },
  state: {
    API_URL: process.env.VUE_APP_ROOT_API,
    token: null,
    headers: {
      Authorization: "",
      "Content-Type": "application/json",
    },
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setHeaderToken(state, payload) {
      state.headers.Authorization = payload;
    },
  },
  actions: {
    
  }
});
