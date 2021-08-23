import { createStore } from "vuex";



// Modulos
import auth from './modules/auth';  
/* import usersPending from './modules/usersPending'; */

export default createStore({
  modules:{
    auth
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
